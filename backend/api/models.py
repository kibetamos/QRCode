from io import BytesIO
from django.db import models
from django.contrib.auth.models import User
import qrcode
from django.core.files import File

# Create your models here.
class Event(models.Model):
        
        organizer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events')
        name = models.CharField(max_length=255)
        description = models.TextField()
        #date of the event
        date = models.DateField()
        venue = models.CharField(max_length=255)
        event_slug = models.SlugField(max_length=255, unique=True)
        created_at = models.DateTimeField(auto_now_add=True)
        image = models.ImageField(upload_to='event_images/', blank=True, null=True)
        template_type = models.CharField(max_length=100, default='default')  # Can be 'default', 'premium', etc.
        enable_phone_check = models.BooleanField(default=False)  # For phase 4


        def __str__(self):
                return self.name
        

class QRCode(models.Model):
    qr_code_data = models.CharField(max_length=255, unique=True)
    verified = models.BooleanField(default=False)
    order = models.ForeignKey('Order', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='qr_codes/', blank=True, null=True)


    attendee_name = models.CharField(max_length=255, blank=True, null=True)  # Optional attendee name
    phone_number = models.CharField(max_length=15, blank=True, null=True)  # Optional phone number for verification
    # created_at = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)



    def mark_as_used(self):
        if not self.verified:
            self.verified = True
            self.save()
            # Decrement the remaining quantity of the order
            self.order.remaining_quantity -= 1
            self.order.save()
            # Check if all QR codes have been used, and mark the order as COMPLETED if so
            self.order.check_status()

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey('Event', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    remaining_quantity = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    # status = models.CharField(max_length=20, choices=[('PENDING', 'Pending'), ('COMPLETED', 'Completed')])
    status = models.CharField(
        max_length=20, 
        choices=[('PENDING', 'Pending'), ('COMPLETED', 'Completed')],
        default='PENDING'  
    )


    def save(self, *args, **kwargs):
        # On saving the order, generate the required number of QR codes.
        if not self.pk:  # Only generate on the first save (creation)
            self.remaining_quantity = self.quantity
            super().save(*args, **kwargs)
            self.generate_qr_codes()
        else:
            super().save(*args, **kwargs)

    def check_status(self):
        # Automatically mark the order as COMPLETED if all QR codes have been used
        if self.remaining_quantity == 0:
            self.status = 'COMPLETED'
            self.save()

    def generate_qr_codes(self):
        for i in range(self.quantity):
            qr_code_data = f"{self.event.id}-{self.user.id}-{self.id}-{i}"
            qr_image = self.create_qr_image(qr_code_data)

            qr_code = QRCode.objects.create(
                qr_code_data=qr_code_data,
                order=self,
                image=qr_image
            )

    def create_qr_image(self, data):
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=10,
            border=4,
        )
        qr.add_data(data)
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")
        buffer = BytesIO()
        img.save(buffer, format="PNG")
        file_name = f"qr_{self.id}_{data}.png"
        return File(buffer, name=file_name)