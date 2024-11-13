import json
from django.views import View
import stripe
from django.conf import settings
import logging
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
from django.http import JsonResponse, HttpResponse


stripe.api_key = settings.STRIPE_SECRET_KEY

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
def scan_qr_code(request, qr_code_data):
    try:
        # Retrieve the QR code from the database using the provided data
        qr_code = QRCode.objects.get(data=qr_code_data)

        # Check if the QR code is already verified
        if qr_code.verified:
            return Response({"error": "This QR code has already been verified."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if there's remaining quantity
        if qr_code.quantity <= 0:
            return Response({"error": "No remaining quantity for this QR code."}, status=status.HTTP_400_BAD_REQUEST)

        # Mark QR code as verified
        qr_code.verified = True
        
        # Decrement the remaining quantity
        qr_code.quantity -= 1
        
        # Save changes to the database
        qr_code.save()
        
        return Response({"message": "QR code scanned successfully!", "attendee_name": qr_code.attendee_name, "remaining_quantity": qr_code.quantity}, status=status.HTTP_200_OK)
    
    except QRCode.DoesNotExist:
        return Response({"error": "QR code not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# def scan_qr_code(request):
#     try:
#         # Retrieve the QR code data from the request body
#         qr_code_data = request.data.get('qr_code_data')
#         data = json.loads(qr_code_data)  # Parse the JSON string

#         # Extract necessary fields
#         organizer = data.get('organizer')
#         event_name = data.get('event')
#         date = data.get('date')

#         # Use the event name and date as the unique identifier or look it up in the database
#         qr_code = QRCode.objects.get(data=event_name + date)  # Adjust the lookup logic as needed

#         # Check if the QR code is already verified
#         if qr_code.verified:
#             return Response({"error": "This QR code has already been verified."}, status=status.HTTP_400_BAD_REQUEST)

#         # Check if there's remaining quantity
#         if qr_code.quantity <= 0:
#             return Response({"error": "No remaining quantity for this QR code."}, status=status.HTTP_400_BAD_REQUEST)

#         # Mark QR code as verified
#         qr_code.verified = True
        
#         # Decrement the remaining quantity
#         qr_code.quantity -= 1
        
#         # Save changes to the database
#         qr_code.save()
        
#         # Return success message with attendee name
#         return Response({"message": "QR code scanned successfully!", "attendee_name": qr_code.attendee_name, "remaining_quantity": qr_code.quantity}, status=status.HTTP_200_OK)

#     except json.JSONDecodeError:
#         return Response({"error": "Invalid QR code data format."}, status=status.HTTP_400_BAD_REQUEST)
#     except QRCode.DoesNotExist:
#         return Response({"error": "QR code not found."}, status=status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# @api_view(['POST'])
# def scan_qr_code(request, qr_code_data):
#     try:
#         # Retrieve the QR code from the database
#         qr_code = QRCode.objects.get(data=qr_code_data)
        
#         # Check if the QR code is already verified
#         if qr_code.verified:
#             return Response({"error": "This QR code has already been verified."}, status=status.HTTP_400_BAD_REQUEST)

#         # Check if there's remaining quantity
#         if qr_code.quantity <= 0:
#             return Response({"error": "No remaining quantity for this QR code."}, status=status.HTTP_400_BAD_REQUEST)

#         # Mark QR code as verified
#         qr_code.verified = True
        
#         # Decrement the remaining quantity
#         qr_code.quantity -= 1
        
#         # Save changes to the database
#         qr_code.save()
        
#         # Return success message with attendee name
#         return Response({"message": "QR code scanned successfully!", "attendee_name": qr_code.attendee_name, "remaining_quantity": qr_code.quantity}, status=status.HTTP_200_OK)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def verify_qr_code(request, qr_code_data):
#     try:
#         qr_code = QRCode.objects.get(qr_code_data=qr_code_data)
        
#         if qr_code.verified:
#             return Response({"message": "This QR code has already been used."}, status=status.HTTP_400_BAD_REQUEST)
        
#         # Mark the QR code as used
#         qr_code.mark_as_used()
        
#         return Response({
#             "message": "QR code verified successfully.",
#             "remaining_quantity": qr_code.order.remaining_quantity
#         }, status=status.HTTP_200_OK)
#     except QRCode.DoesNotExist:
#         return Response({"message": "Invalid QR code."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def verify_qr_code(request, qr_code_data):
    try:
        # Implement your verification logic based on qr_code_data
        # For example:
        qr_code = QRCode.objects.get(data=qr_code_data)

        if qr_code.verified:
            return Response({"error": "This QR code has already been verified."}, status=status.HTTP_400_BAD_REQUEST)

        if qr_code.quantity <= 0:
            return Response({"error": "No remaining quantity for this QR code."}, status=status.HTTP_400_BAD_REQUEST)

        # Mark QR code as verified
        qr_code.verified = True
        qr_code.quantity -= 1
        qr_code.save()

        return Response({"message": "QR code verified successfully!", "remaining_quantity": qr_code.quantity}, status=status.HTTP_200_OK)

    except QRCode.DoesNotExist:
        return Response({"error": "QR code not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


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
    

# View to retrieve order details
class OrderDetailView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderQRCodeListView(generics.ListAPIView):
    """
    Retrieve the first QR code for a specific order.
    """
    serializer_class = QRCodeSerializer

    def get_queryset(self):
        # Get the order ID from the URL
        order_id = self.kwargs['order_id']
        # Return the first QR code related to the specific order
        return QRCode.objects.filter(order_id=order_id)[:1] 
    




@api_view(['POST'])
def create_qr_code(request):
    try:
        # Extracting data from the request
        data = request.data
        organizer = data.get('organizer')
        event_name = data.get('event')
        date = data.get('date')

        # Construct QR code data string
        qr_code_data = f"{organizer}-{event_name}-{date}"

        # Save QR code data to the database
        qr_code = QRCode.objects.create(data=qr_code_data, verified=False, quantity=1)

        return Response({"message": "QR code created successfully!", "qr_code_data": qr_code_data}, status=201)

    except Exception as e:
        return Response({"error": str(e)}, status=400)
    

@api_view(['POST'])
def verify_qr_code(request, qr_code_data):
    try:
        qr_code = QRCode.objects.get(qr_code_data=qr_code_data)
        if qr_code.verified:
            return Response({"message": "QR code already used"}, status=status.HTTP_400_BAD_REQUEST)
        qr_code.mark_as_used()  # Verifies QR code and updates Order status
        return Response({"message": "QR code verified"}, status=status.HTTP_200_OK)
    except QRCode.DoesNotExist:
        return Response({"error": "QR code not found"}, status=status.HTTP_404_NOT_FOUND)
    

class EventDetailView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


@api_view(['GET'])
def views_details(request, id):
    try:
        # Fetch the event by ID
        event = Event.objects.get(id=id)
    except Event.DoesNotExist:
        # Return a 404 response if the event does not exist
        return Response({"detail": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

    # Serialize the event data
    serializer = EventSerializer(event)
    # Return the serialized data in the response
    return Response(serializer.data)



@api_view(['GET'])
def about_event(request, id):
    try:
        event = Event.objects.get(id=id)  # Fetch the event by ID
        serializer = EventSerializer(event)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
    


    ##create order
# @api_view(['POST'])
# def create_order(request, id):
#     try:
#         event = Event.objects.get(id=id)  # Fetch the event by ID
#         serializer = EventSerializer(event)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     except Event.DoesNotExist:
#         return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
    


#     ##create order
# @api_view(['POST'])
# @api_view(['POST'])
# def create_order(request, event_id):
#     if request.method == 'POST':
#         event = Event.objects.get(id=event_id)  # Get the event based on the event_id
#         user_id = event.organizer  # Set user to the event organizer
#         quantity = request.data.get('quantity')  # Get quantity

#         # Create an order instance
#         order = Order(
#             user_id=user_id,  # Use the event organizer as the user
#             event=event,      # Use the event object
#             quantity=quantity, 
#             remaining_quantity=quantity,  # Set remaining quantity initially equal to quantity
#             status='PENDING'  # Set initial status
#         )
#         try:
#             order.save()  # Save the order to the database
#             return Response({"message": "Order created successfully!", "order_id": order.id}, status=status.HTTP_201_CREATED)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

# class CreateOrderView(generics.CreateAPIView):
#     queryset = Order.objects.all()
#     serializer_class = OrderSerializer

class CreateOrderView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # Log or print serializer errors
        print(serializer.errors)  # Temporarily print for debugging
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    

# def payment_view(request, order_id):
#     order = Order.objects.get(id=order_id)

#     if request.method == 'POST':
#         # Simulate payment processing
#         order.paid_amount = order.total_price()  # Update the paid amount after payment
#         order.save()
#         return redirect('order_success', order_id=order.id)

#     return render(request, 'payment.html', {'order': order})



class CreateCheckoutSessionView(generics.CreateAPIView):
    def post(self, request, *args, **kwargs):  # Use `id` here as parameter
        # try:
        #     order = Order.objects.get(id=id)  # Fetch the order with `id`
        # except Order.DoesNotExist:
        #     return JsonResponse({"error": "Order not found"}, status=404)

        # Proceed with checkout session creation if order is found
        YOUR_DOMAIN = "http://127.0.0.1:8000"
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'unit_amount': int(Order.total_price() * 100),  # Convert to cents
                    'product_data': {'name': Order.event.name},
                },
                'quantity': Order.quantity,
            }],
            mode='payment',
            success_url=YOUR_DOMAIN + '/success/',
            cancel_url=YOUR_DOMAIN + '/cancel/',
        )

        return JsonResponse({'id': checkout_session.id})