from datetime import timezone
from django.db import models

# Create your models here.
from django.contrib.auth.models import User
import uuid
import qrcode
from django.core.files.base import ContentFile
from io import BytesIO


class Event(models.Model):
        
        organizer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events')
        name = models.CharField(max_length=255)
        description = models.TextField()
        date = models.DateField()
        venue = models.CharField(max_length=255)
        event_slug = models.SlugField(max_length=255, unique=True)
        created_at = models.DateTimeField(auto_now_add=True)

        def __str__(self):
                return self.name
        

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='orders')
    quantity = models.PositiveIntegerField()
    remaining_quantity = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=20, choices=[('PENDING', 'Pending'), ('PAID', 'Paid')], default='PENDING')
    payment_reference = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.event.name} - {self.status}"
    
class QRCode(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='qrcodes')
    qr_code_data = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    qr_code_image = models.ImageField(upload_to='qrcodes/')
    created_at = models.DateTimeField(auto_now_add=True)
    verified = models.BooleanField(default=False)
    verified_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"QR Code for {self.order.event.name} - {self.qr_code_data}"

    def mark_as_used(self):
        if not self.verified:
            self.verified = True
            self.verified_at = timezone.now()
            self.order.remaining_quantity = max(0, self.order.remaining_quantity - 1)
            self.order.save()
            self.save()

    


def save(self, *args, **kwargs):
    if not self.pk:  # When creating a new order
        self.remaining_quantity = self.quantity
    super(Order, self).save(*args, **kwargs)




def generate_qr_code(qr_code_data):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(qr_code_data)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    return ContentFile(buffer.getvalue())


