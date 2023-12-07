// AddEvent.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./addEvent.css";

const AddEvent = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    time: '',
    address: '',
    image: null // Use null to represent the file
  });

  const accessToken = localStorage.getItem('accessToken');
  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // If the input is a file input, update the 'image' property with the selected file
    if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addEvent = async () => {
    try {
      const form = new FormData();

      // Append each form field to the FormData object
      form.append('eventName', formData.eventName);
      form.append('time', formData.time);
      form.append('address', formData.address);
      form.append('image', formData.image);

      const responseEvent = await fetch('http://35.198.240.131:8081/api/v1/events', {
        method: "POST",
        body: form,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (!responseEvent.ok) {
        throw new Error('Something went wrong');
      }

      const { eventsId } = await responseEvent.json();
      history(`/add-event`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="js-container">
      <div className="add-event">
      <h1 className="text">Add Event</h1>
        <input
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          type="text"
          placeholder="Tên sự kiện"
        />
        <input
          name="time"
          value={formData.time}
          onChange={handleChange}
          type="text"
          placeholder="Thời gian"
        />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          type="text"
          placeholder="Địa chỉ"
        />
        <input
          name="image"
          onChange={handleChange}
          type="file"
          placeholder="Image"
        />
        <button onClick={addEvent} type="submit">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddEvent;
