from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Event, Order, QRCode

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['name', 'organizer', 'date', 'venue', 'created_at']
    search_fields = ['name', 'organizer']
    list_filter = ['date', 'venue']
    prepopulated_fields = {'event_slug': ('name',)}  # Automatically fills slug based on the name

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'event', 'user', 'status', 'created_at']
    search_fields = ['user__username', 'event__name']
    list_filter = ['status', 'created_at']

@admin.register(QRCode)
class QRCodeAdmin(admin.ModelAdmin):
    list_display = ['order', 'attendee_name', 'verified', 'created_at']
    search_fields = ['attendee_name', 'phone_number']
    list_filter = ['verified', 'created_at']
