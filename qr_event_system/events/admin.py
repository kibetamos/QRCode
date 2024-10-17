from django.contrib import admin
from .models import Event, Order, QRCode

# Register your models here.
admin.site.register(Event)
admin.site.register(Order)
admin.site.register(QRCode)