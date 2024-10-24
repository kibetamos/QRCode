import React, { useEffect, useState } from 'react';
import api from '../api';


const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/api/events/');
        setEvents(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching events:', error.response ? error.response.data : error.message);
        setError('Could not fetch events.');
      }
    };

    fetchEvents();
  }, []);

 
  return (
    <div>
      <h1>Event List</h1>
      {error && <p>{error}</p>}
      <ul>
        {events.map(event => (
          <div>
          <li key={event.id}>{event.name}</li>
          <li>{event.description}</li>
          <li>{event.date}</li>
          <li>{event.venue}</li>
          <li>{event.created_at}</li>
          <li>{event.image}</li>
          {/* <li>{event.name}</li> */}
          <li>{event.enable_phone_check}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
