// src/pages/ScanQRCode.jsx
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import QRCode from 'qrcode';
import Header from './Header';
import Footer from './Footer';

export default function ScanQRCode() {
    const [qrData, setQrData] = useState(null); // To store scanned data
    const [errorMessage, setErrorMessage] = useState(null); // To store error messages
    const [useCamera, setUseCamera] = useState(true); // Toggle between camera and image upload

    // Handle successful QR code scan from camera
    const handleScan = (result) => {
        if (result) {
            setQrData(result.text);
            setErrorMessage(null);
        }
    };

    // Handle scanning errors from camera
    const handleError = (err) => {
        setErrorMessage(`Error scanning QR Code: ${err.message}`);
    };

    // Handle QR code image upload and decode
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const imageData = event.target.result;
                try {
                    const decodedData = await QRCode.decode(imageData);
                    setQrData(decodedData);
                    setErrorMessage(null);
                } catch (err) {
                    setErrorMessage("Error decoding QR code from image.");
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <Header />
            <header className="site-header d-flex flex-column justify-content-center align-items-center">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 col-12">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/">Homepage</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Scan QR Code</li>
                                </ol>
                            </nav>
                            <h2 className="text-white">Scan QR Code</h2>
                        </div>
                    </div>
                </div>
            </header>

            <section className="section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-12 mx-auto">
                            <div className="text-center">
                                <h3 className="mb-4">QR Code Scanner</h3>

                                {/* Toggle between camera and upload */}
                                <div className="mb-3">
                                    <button onClick={() => setUseCamera(true)} className="btn btn-primary me-2">
                                        Use Camera
                                    </button>
                                    <button onClick={() => setUseCamera(false)} className="btn btn-secondary">
                                        Upload Image
                                    </button>
                                </div>

                                {useCamera ? (
                                    <div>
                                        <p>Align the QR code within the frame to scan.</p>
                                        <QrReader
                                            constraints={{ facingMode: 'environment' }}
                                            onResult={(result, error) => {
                                                if (!!result) handleScan(result);
                                                if (!!error) handleError(error);
                                            }}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <p>Select a QR code image to upload and scan.</p>
                                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                                    </div>
                                )}

                                {/* Display scanned data */}
                                {qrData && (
                                    <div className="mt-4">
                                        <h5>Scanned QR Code Data:</h5>
                                        <p>{qrData}</p>
                                    </div>
                                )}

                                {/* Display error messages */}
                                {errorMessage && (
                                    <div className="mt-4 text-danger">
                                        <p>{errorMessage}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
