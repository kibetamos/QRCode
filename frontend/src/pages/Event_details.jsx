import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api'; // Assuming you have an axios instance or similar set up for API calls
import Footer from './Footer';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';


export default function EventDetails() {
    const { id } = useParams();
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qrCode, setQrCode] = useState(null); // State to hold the first unverified QR code

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await 
                api
                .get(`api/orders/${id}/`);
                setOrderData(response.data);

                

                const qrCodesResponse = await api.get(`api/orders/${id}/qrcodes/`);
                if (qrCodesResponse.data.length > 0) {
                    const unverifiedQrCode = qrCodesResponse.data.find(qr => !qr.verified);
                    setQrCode(unverifiedQrCode);
                }
            } catch (err) {
                setError('Failed to fetch event details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);
    
    const handleScan = async () => {
        if (!qrCode) return; // Ensure there's a QR code to scan
    
        try {
            // Extract the QR code data (ensure this is formatted correctly)
            const qrCodeData = qrCode.qr_code_data; // This should match the saved format (e.g., 'Organizer-Event-Date')
    
            // Construct the URL for the scan API
            const url = `http://127.0.0.1:8000/api/scan/${encodeURIComponent(qrCodeData)}/`;
    
            // Make the POST request to the constructed URL
            const response = await api.post(url);
    
            // Notify user of success or error
            alert(response.data.message);
        } catch (err) {
            // Handle error and notify user
            alert('Failed to verify QR code. Please try again later.');
        }
    };
    
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

const qrCodeValue = JSON.stringify({
    Organizer: orderData.user_name,
    Event: orderData.event_name,
    Date: orderData.event_date
});
  
  // Use qrCodeValue for the QRCodeSVG
//   <QRCodeSVG value={qrCodeValue} size={256} />;
  
    return (
        <div>
            {orderData && (
                <section className="timeline-section section-padding" id="section_3">
                    <div className="section-overlay"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h2 className="text-white mb-4">Here are the Details of the Event</h2>
                            </div>

                            <div className="col-lg-10 col-12 mx-auto">
                                <div className="timeline-container">
                                    <ul className="vertical-scrollable-timeline">
                                        <li>
                                            <h4 className="text-white mb-3">Name</h4>
                                            <p className="text-white">
                                                {orderData.event_name.charAt(0).toUpperCase() + orderData.event_name.slice(1)} event 
                                                organized by {orderData.user_name?.charAt(0).toUpperCase() + orderData.user_name?.slice(1)}
                                            </p>
                                        </li>
                                        <li>
                                            <h4 className="text-white mb-3">Status</h4>
                                            <p className="text-white">
                                                {orderData.status === 'PENDING' 
                                                    ? 'The event has not yet happened.' 
                                                    : 'The event has happened already.'}
                                            </p>
                                        </li>
                                        <li>
                                            <h4 className="text-white mb-3">When is the Event</h4>
                                            <p className="text-white">
                                                The event is happening on <strong>{new Date(orderData.event_date).toLocaleString()}</strong>.
                                            </p>
                                        </li>
                                        {/* QR Code Section */}
                                        <li>
                                          
                                            <h4 className="text-white mb-3">QR Code</h4>
                                            <p className="text-white"> Scan this QRCode to be part of the event. </p>
                                            {qrCode ? (
                                              
                                                <p>
                                                    <QRCodeSVG 
                                                        value={JSON.stringify({
                                                            organizer: orderData.user_name,
                                                            event: orderData.event_name,
                                                            date: orderData.event_date,
                                                        })} 
                                                        size={256} 
                                                    />
                                                    {/* <button onClick={handleScan}>Scan QR Code</button> */}
                                                    <p className="text-white mt-2">This QR code is not verified.</p>
                                                    {/* <button onClick={handleVerify} className="btn custom-btn">Scan QR Code</button> */}
                                                </p>
                                            ) : (
                                                <p className="text-white mt-2">No unverified QR code available.</p>
                                            )}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 text-center mt-5">
                                <p className="text-white">
                                    Want to Attend?
                                    <a href="#" className="btn custom-btn custom-border-btn ms-3">Click here to Attend</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <Footer />
        </div>
    );
}
