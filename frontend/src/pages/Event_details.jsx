import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../api';

export default function EventDetails() {
  const { id } = useParams(); // Get the order ID from the URL parameters
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch event details with orders from the API
    const fetchOrderDetails = async () => {
      try {
        const response = await api.get(`api/orders/${id}/`);
        const data = response.data;
        setOrderData(data);
        console.log(data); // This will log the data to the console for debugging
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch event details. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Order Details</h2>
      {orderData && (
        <div>
          <p><strong>Order ID:</strong> {orderData.id}</p>
          {/* <p><strong>Tickets remaining:</strong> {orderData.quantity}</p> */}
          <p><strong>Remaining Tickets:</strong> {orderData.remaining_quantity}</p>
          <p><strong>Created At:</strong> {new Date(orderData.created_at).toLocaleString()}</p>
          <p><strong>Status:</strong> {orderData.status}</p>
          <p><strong>User:</strong> {orderData.user}</p>
          <p><strong>Event:</strong> {orderData.event.name}</p>        </div>
      )}
    </div>
  );
}
