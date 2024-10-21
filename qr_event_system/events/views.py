from django.shortcuts import render
from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Event, Order, QRCode
from .serializers import EventSerializer, OrderSerializer, QRCodeSerializer
# Create your views here.
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Event, Order, QRCode
from .serializers import EventSerializer, OrderSerializer, QRCodeSerializer
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class QRCodeViewSet(viewsets.ModelViewSet):
    queryset = QRCode.objects.all()
    serializer_class = QRCodeSerializer
    permission_classes = [IsAuthenticated]


@api_view(['GET'])
def event_detail_by_slug(request, user_handle, event_slug):
    event = get_object_or_404(Event, organizer__username=user_handle, event_slug=event_slug)
    serializer = EventSerializer(event)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def scan_qr_code(request, qr_code_data):
    try:
        qr_code = QRCode.objects.get(qr_code_data=qr_code_data)

        # Verify the event ID matches
        if qr_code.order.event_id != request.data.get('event_id'):
            return Response({"message": "This QR code is not valid for the selected event."}, status=status.HTTP_400_BAD_REQUEST)

        if qr_code.verified:
            return Response({"message": "This QR code has already been used."}, status=status.HTTP_400_BAD_REQUEST)

        qr_code.mark_as_used()
        
        return Response({
            "message": "QR code verified successfully.",
            "remaining_quantity": qr_code.order.remaining_quantity
        }, status=status.HTTP_200_OK)
    except QRCode.DoesNotExist:
        return Response({"message": "Invalid QR code."}, status=status.HTTP_404_NOT_FOUND)



# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def scan_qr_code(request, qr_code_data):
#     try:
#         qr_code = QRCode.objects.get(qr_code_data=qr_code_data)
        
#         if qr_code.verified:
#             return Response({"message": "QR code has already been used."}, status=status.HTTP_400_BAD_REQUEST)
        
#         # Mark the QR code as used
#         qr_code.mark_as_used()
        
#         return Response({
#             "message": "QR code verified successfully.",
#             "remaining_quantity": qr_code.order.remaining_quantity
#         }, status=status.HTTP_200_OK)
#     except QRCode.DoesNotExist:
#         return Response({"message": "Invalid QR code."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verify_qr_code(request, qr_code_data):
    try:
        qr_code = QRCode.objects.get(qr_code_data=qr_code_data)
        
        if qr_code.verified:
            return Response({"message": "This QR code has already been used."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Mark the QR code as used
        qr_code.mark_as_used()
        
        return Response({
            "message": "QR code verified successfully.",
            "remaining_quantity": qr_code.order.remaining_quantity
        }, status=status.HTTP_200_OK)
    except QRCode.DoesNotExist:
        return Response({"message": "Invalid QR code."}, status=status.HTTP_404_NOT_FOUND)
    

# @api_view(['GET'])
# def event_detail_by_slug(request, user_handle, event_slug):
#     try:
#         # Get the user by the user_handle (username)
#         user = get_object_or_404(user, username=user_handle)
        
#         # Get the event for the given user and slug
#         event = get_object_or_404(Event, organizer=user, slug=event_slug)
        
#         # Prepare the response with event details
#         event_data = {
#             "name": event.name,
#             "description": event.description,
#             "date": event.date,
#             "venue": event.venue,
#             "image_url": event.image.url if event.image else None,
#             "template_type": event.template_type,
#         }
#         return Response(event_data, status=200)
    
#     except Event.DoesNotExist:
#         return Response({"error": "Event not found."}, status=404)