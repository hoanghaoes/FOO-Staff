import React, { useState } from "react";
import { useNavigate } from 'react-router-dom' ;
import "./addEvent.css"

const AddEvent = () => {
 const [formData, setFormData] = useState({
    Event: '',
    Time: '',
    locationId: '',
 });

 const { Event,Time, locationId } = formData;

 const history = useNavigate();

 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
 };

 const AddEvent = async () => {
    try {
      const response = await fetch('https://65588cefe93ca47020a9706c.mockapi.io/api/facts/Fact', {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-type": "application/json" ,
            "Authorization": ""
        },
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      history("/");
    } catch (error) {
      console.error('Error:', error);
    }
 };

 return (
    <div className="js-container">
      <div className="add-Event">
        <input
          name="Event"
          value={Event}
          onChange={handleChange}
          type="text"
          placeholder="Event"
        />
        <input
          name="Time"
          value={Time}
          onChange={handleChange}
          type="time"
          placeholder="Time"
        />
        <input
          name="locationId"
          value={locationId}
          onChange={handleChange}
          type="text"
          placeholder="Location"
        />
        <button onClick={AddEvent} type="submit">
          Add
        </button>
      </div>
    </div>
 );
};

export default AddEvent;