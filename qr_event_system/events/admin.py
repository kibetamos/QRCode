from django.contrib import admin
from .models import Event, Order, QRCode

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['name', 'organizer', 'event_slug']
    search_fields = ['name', 'organizer__username']
    list_filter = ['organizer', 'created_at']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['user', 'event', 'quantity', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['user__username', 'event__name']

@admin.register(QRCode)
class QRCodeAdmin(admin.ModelAdmin):
    list_display = ['qr_code_data', 'order', 'verified', 'created_at']
    list_filter = ['verified', 'created_at']
    search_fields = ['qr_code_data', 'order__user__username']
