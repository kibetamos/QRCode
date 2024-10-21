from rest_framework import serializers
from .models import Event, Order, QRCode

# class EventSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Event
#         fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['organizer', 'name', 'description', 'date', 'venue', 'event_slug', 'created_at', 'template_type', 'enable_phone_check', 'image']


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

# class QRCodeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = QRCode
#         fields = '__all__'


class QRCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = QRCode
        fields = ['qr_code_data', 'verified', 'order', 'attendee_name', 'phone_number', 'created_at']
