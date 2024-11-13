from io import BytesIO
from django.db import models
from django.contrib.auth.models import User
from django.core.files import File
from .utils import create_qr_image
import qrcode
from decimal import Decimal

# Utility function to create a QR code image
def create_qr_image(data):
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
    file_name = f"qr_{data}.png"
    return File(buffer, name=file_name)

# Models
class Event(models.Model):
    organizer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events')
    name = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()
    venue = models.CharField(max_length=255)
    event_slug = models.SlugField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='event_images/', blank=True, null=True)
    template_type = models.CharField(max_length=100, default='default')
    enable_phone_check = models.BooleanField(default=False)

    def __str__(self):
        return self.name

# from decimal import Decimal
# from django.db import models

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey('Event', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    remaining_quantity = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20, 
        choices=[('PENDING', 'Pending'), ('COMPLETED', 'Completed')],
        default='PENDING'
    )
    base_price = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('10.00'))  # Default price is $10
    price = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))  # Amount paid by the user


    def get_display_price(self):
        return "{0:.2f}".format(self.price / 100)
    
    
    def total_price(self):
        """Calculate the total price based on quantity and base price."""
        return self.base_price * self.quantity

    def generate_qr_codes(self):
        for i in range(self.quantity):
            qr_code_data = f"{self.event.name}-{self.event.organizer}-{self.event.date}-{self.id}-{i}"
            qr_image = create_qr_image(qr_code_data)
            QRCode.objects.create(
                qr_code_data=qr_code_data,
                order=self,
                image=qr_image
            )

    def save(self, *args, **kwargs):
        if self.pk:  # Updating existing order
            current_order = Order.objects.get(pk=self.pk)
            if self.remaining_quantity > current_order.quantity:
                raise ValueError("Remaining quantity cannot exceed the total quantity.")
            if self.remaining_quantity < 0:
                raise ValueError("Remaining quantity cannot be negative.")
        else:  # Creating new order
            self.remaining_quantity = self.quantity
            self.price = self.total_price()  # Automatically set the paid amount
            super().save(*args, **kwargs)  # First save the order
            self.generate_qr_codes()  # Then generate QR codes
            return

        super().save(*args, **kwargs)

    def mark_order_as_completed_if_eligible(self):
        """Automatically mark the order as COMPLETED if all QR codes have been used."""
        if self.remaining_quantity <= 0:
            self.status = 'COMPLETED'
            self.save()

    def update_status(self):
        """Update order status if all QR codes are verified."""
        if not self.qrcodes.filter(verified=False).exists():
            self.status = 'COMPLETED'
            self.save()


class QRCode(models.Model):
    qr_code_data = models.CharField(max_length=255, unique=True)
    verified = models.BooleanField(default=False)
    order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='qrcodes')
    image = models.ImageField(upload_to='qr_codes/', blank=True, null=True)
    attendee_name = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def mark_as_used(self):
        if not self.verified:
            self.verified = True
            self.save()
            self.order.check_status()  # Ensure the order status is updated

