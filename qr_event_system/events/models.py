from django.db import models

# Create your models here.
from django.contrib.auth.models import user
import uuid


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
    


