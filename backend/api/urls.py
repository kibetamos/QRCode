from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from .views import EventViewSet, OrderViewSet, QRCodeViewSet
from .views import event_detail_by_slug, scan_qr_code, verify_qr_code

# Set up the default router
router = DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'qrcodes', QRCodeViewSet)

# Define the URL patterns
urlpatterns = [
    path('@<str:user_handle>/<str:event_slug>/', event_detail_by_slug, name='event-detail'),
    path('scan/<str:qr_code_data>/', scan_qr_code, name='scan-qr-code'),
    path('verify-qr/<str:qr_code_data>/', verify_qr_code, name='verify-qr-code'),
    path('api/orders/<int:id>/', views.event_with_orders, name='event_with_orders'),]
# Include router URLs
urlpatterns += router.urls
