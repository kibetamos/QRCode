// src/pages/ScanQRCode.jsx
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import Header from './Header';
import Footer from './Footer';

export default function ScanQRCode() {
    const [qrData, setQrData] = useState(null); // To store scanned data
    const [errorMessage, setErrorMessage] = useState(null); // To store error messages

    // Handle successful QR code scan
    const handleScan = (result) => {
        if (result) {
            setQrData(result.text);
            setErrorMessage(null); // Clear any previous errors
        }
    };

    // Handle scanning errors
    const handleError = (err) => {
        setErrorMessage(`Error scanning QR Code: ${err.message}`);
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
                                <p>Align the QR code within the frame to scan.</p>

                                {/* QR Code Scanner */}
                                <QrReader
                                    constraints={{ facingMode: 'environment' }}
                                    onResult={(result, error) => {
                                        if (!!result) handleScan(result);
                                        if (!!error) handleError(error);
                                    }}
                                    style={{ width: '100%' }}
                                />

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
