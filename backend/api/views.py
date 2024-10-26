from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Event, Order, QRCode
from .serializers import EventSerializer, OrderSerializer, QRCodeSerializer, UserSerializer
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


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



# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def scan_qr_code(request, qr_code_data):
#     try:
#         qr_code = QRCode.objects.get(qr_code_data=qr_code_data)

#         # Verify the event ID matches
#         if qr_code.order.event_id != request.data.get('event_id'):
#             return Response({"message": "This QR code is not valid for the selected event."}, status=status.HTTP_400_BAD_REQUEST)

#         if qr_code.verified:
#             return Response({"message": "This QR code has already been used."}, status=status.HTTP_400_BAD_REQUEST)

#         qr_code.mark_as_used()
        
#         return Response({
#             "message": "QR code verified successfully.",
#             "remaining_quantity": qr_code.order.remaining_quantity
#         }, status=status.HTTP_200_OK)
#     except QRCode.DoesNotExist:
#         return Response({"message": "Invalid QR code."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def scan_qr_code(request):
    qr_code_data = request.data.get('qr_code_data')  # Get QR code data from the request

    try:
        # Attempt to find the QR code in the database
        qr_code = QRCode.objects.get(qr_code_data=qr_code_data)
        
        # Check if the code has already been verified
        if qr_code.verified:
            return Response(
                {"message": "This QR code has already been used."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if the QR code is associated with the logged-in user
        if qr_code.order.user != request.user:
            return Response(
                {"message": "You are not authorized to use this QR code."},
                status=status.HTTP_403_FORBIDDEN
            )

        # Mark the QR code as used
        qr_code.mark_as_used()
        
        # Prepare the response with additional details
        response_data = {
            "message": "QR code verified successfully.",
            "event_name": qr_code.order.event.name,
            "order_number": qr_code.order.id,
            "attendee_name": request.user.username,
            "remaining_quantity": qr_code.order.remaining_quantity
        }
        
        return Response(response_data, status=status.HTTP_200_OK)
    
    except QRCode.DoesNotExist:
        return Response(
            {"message": "Invalid QR code."},
            status=status.HTTP_404_NOT_FOUND
        )


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
    
@api_view(['GET'])
def event_with_orders(request, id):
    try:
        order = Order.objects.get(id=id)
        order_serializer = OrderSerializer(order)

        # Include the user's username and event's name in the response
        user_data = {
            'id': order.user.id,
            'username': order.user.username,
        }
        event_data = {
            'id': order.event.id,
            'name': order.event.name,
            'description': order.event.description,
            'date': order.event.date,
        }

        return Response({
            'order': order_serializer.data,
            'user': user_data,
            'event': event_data,
        }, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)