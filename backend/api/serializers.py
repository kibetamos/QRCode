import datetime
from rest_framework import serializers
from .models import Event, Order, QRCode
from django.contrib.auth.models import User
from django.utils import timezone


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)  # Debug: log validated data
        user = User.objects.create_user(**validated_data)
        return user


class EventSerializer(serializers.ModelSerializer):
    orders = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Event
        fields = [
            'id', 'organizer', 'name', 'description',
            'date', 'venue', 'event_slug', 'created_at',
            'template_type', 'enable_phone_check', 'image', 'orders'
        ]
    
    def validate_event_slug(self, value):
        """
        Check that the event slug is unique.
        """
        if Event.objects.filter(event_slug=value).exists():
            raise serializers.ValidationError("This event slug already exists.")
        return value

    def validate_date(self, value):
        """
        Ensure that the event date is not in the past.
        """
        if value < timezone.now().date():
            raise serializers.ValidationError("The event date cannot be in the past.")
        return value

    def get_image(self, obj):
        """
        Return the full URL to the image if available.
        """
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.image.url)
        return None


class OrderSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    event_name = serializers.CharField(source='event.name', read_only=True)
    event_date = serializers.DateField(source='event.date', read_only=True)
    qr_codes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
        extra_kwargs = {
            'created_at': {'read_only': True},
            'user': {'read_only': True}
        }



class QRCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = QRCode
        fields = ['qr_code_data', 'verified', 'order', 'attendee_name', 'phone_number', 'created_at']


# class OrderSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Order
#         fields = ['user', 'event', 'quantity', 'remaining_quantity', 'status']