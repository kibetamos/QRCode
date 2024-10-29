// OrderForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const OrderForm = () => {
    const { eventId } = useParams(); // Get event ID from URL
    const [quantity, setQuantity] = useState(1); // Default order quantity
    const [eventDetails, setEventDetails] = useState(null); // To store event details
    const [user, setUser] = useState(null); // To store user details
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Fetch event details
        api.get(`/api/events/${eventId}/`)
            .then(response => {
                setEventDetails(response.data);
            })
            .catch(error => {
                console.error("Error fetching event details:", error);
            });

        // Mock fetching user details (replace with actual user fetching logic)
        // const loggedInUser = { id: 1, name: 'John Doe' }; // Example user
        // setUser(loggedInUser);
    }, [eventId]);

    const handleCreateOrder = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        if (!user || !eventDetails) {
            alert("User or event details are missing.");
            return;
        }

        const remainingQuantity = quantity; // Assuming remaining quantity is initially equal to quantity
        const status = 'PENDING'; // Default status

        api.post(`/api/events/${eventId}/orders/`, {
            user: user.id,
            event: eventDetails.id,
            quantity,
            remaining_quantity: remainingQuantity,
            status,
        })
        .then(response => {
            alert("Order created successfully!");
            navigate(`/events/${eventId}`); // Redirect to event details or orders page
        })
        .catch(error => {
            console.error("Error creating order:", error);
            alert("Failed to create order.");
        });
        console.log(eventDetails.id)
        console.log(eventDetails.name)
        console.log(user.id)
    };

    return (
        <div>
            <h3>Create Order for Event: {eventDetails ? eventDetails.name : 'Loading...'}</h3>
            <form onSubmit={handleCreateOrder}>
                <label>Quantity:</label>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    required
                />
                <button type="submit">Submit Order</button>
            </form>
        </div>
    );
};

export default OrderForm;
