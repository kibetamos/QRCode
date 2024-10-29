import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

const QrCodeScanner = () => {
    const [qrCodeData, setQrCodeData] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleScan = (data) => {
        if (data) {
            setQrCodeData(data);
            verifyQrCode(data);
        }
    };

    const handleError = (err) => {
        console.error(err);
        setErrorMessage('Error reading QR code');
    };

    const verifyQrCode = async (data) => {
        try {
            const response = await fetch(`http://your-api-url/verify/${data}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            console.log(result);
            if (result.error) {
                setErrorMessage(result.error);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Failed to verify QR code');
        }
    };

    return (
        <div>
            <QrReader
                onScan={handleScan}
                onError={handleError}
                style={{ width: '100%' }}
            />
            {errorMessage && <p>{errorMessage}</p>}
            {qrCodeData && <p>QR Code Data: {qrCodeData}</p>}
        </div>
    );
};

export default QrCodeScanner;
