from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from .views import CreateOrderView, EventViewSet, OrderDetailView, OrderQRCodeListView, OrderViewSet, QRCodeViewSet
from .views import event_detail_by_slug, scan_qr_code, verify_qr_code

# Set up the default router
router = DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'qrcodes', QRCodeViewSet)

# Define the URL patterns
urlpatterns = [
    path('@<str:user_handle>/<str:event_slug>/', event_detail_by_slug, name='event-detail'),
    # path('api/can/<str:qr_code_data>/', scan_qr_code, name='scan-qr-code'),
    path('api/scan/<str:qr_code_data>/', scan_qr_code, name='scan-qr-code'),
    path('api/verify/<str:qr_code_data>/', verify_qr_code, name='verify-qr-code'),  # Add this line for the verify endpoint
    # path('verify-qr/<str:qr_code_data>/', verify_qr_code, name='verify-qr-code'),
    path('api/orders/<int:id>/', views.event_with_orders, name='event_with_orders'),
    path('orders/<int:order_id>/qrcodes/', OrderQRCodeListView.as_view(), name='order_qr_codes'),


    path('api/events/<int:event_id>/orders/', CreateOrderView.as_view(), name='create-order'),
    path('api/verify-qr/<str:qr_code_data>/', views.verify_qr_code, name='verify_qr_code'),

    ]
# Include router URLs
urlpatterns += router.urls
