from io import BytesIO
from django.core.files import File
import qrcode

def create_qr_image(data):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_Q,  # Use high error correction
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    file_name = f"qr_{data}.png"
    buffer.seek(0)  # Ensure the buffer is at the beginning
    return File(buffer, name=file_name)
