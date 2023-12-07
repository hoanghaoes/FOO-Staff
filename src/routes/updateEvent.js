import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "./updateEvent.css";

const EditEvent = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    time: '',
    address: '',
    image: null
  });

  const accessToken = localStorage.getItem('accessToken');
  const history = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://35.198.240.131:8081/api/v1/events/${id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching location data');
        }

        const eventData = await response.json();
        setFormData(eventData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEvents();
  }, [id, accessToken]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // If the input is a file input, update the 'image' property with the selected file
    if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const editEvent = async () => {
    try {
      const form = new FormData();

      // Append each form field to the FormData object
      form.append('eventName', formData.eventName);
      form.append('time', formData.time);
      form.append('address', formData.address);
      form.append('image', formData.image);

      const responseEvent = await fetch(`http://35.198.240.131:8081/api/v1/events/${id}`, {
        method: "PUT",
        body: form,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (!responseEvent.ok) {
        throw new Error('Something went wrong');
      }

      // Handle the response or redirect to another page
      history(`/event`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="js-container">
      <div className="add-event">
        <input
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          type="text"
          placeholder="Event Name"
        />
        <input
          name="time"
          value={formData.time}
          onChange={handleChange}
          type="text"
          placeholder="Time"
        />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          type="text"
          placeholder="Address"
        />
        {/* Handle the image display based on your UI logic */}
        {formData.image && (
          <img
            src={URL.createObjectURL(formData.image)}
            alt="Current Image"
            width="100"
          />
        )}
        <input
          name="image"
          onChange={handleChange}
          type="file"
          placeholder="Image"
        />
        <button onClick={editEvent} type="submit">
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditEvent;
