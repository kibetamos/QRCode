from rest_framework.routers import DefaultRouter
from .views import EventViewSet, OrderViewSet, QRCodeViewSet
from django.urls import path
from .views import event_detail_by_slug
from .views import scan_qr_code



router = DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'qrcodes', QRCodeViewSet)

urlpatterns = router.urls

urlpatterns += [
    path('@<str:user_handle>/<str:event_slug>/', event_detail_by_slug, name='event-detail'),
     path('scan/<str:qr_code_data>/', scan_qr_code, name='scan-qr-code'),
]
