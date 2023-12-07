// AddLocation.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./addLocation.css";

const AddLocation = () => {
  const [formData, setFormData] = useState({
    name: '',
    nameInMap: '',
    latitude: '',
    longitude: '',
    image: null, // Use null to represent the file
    description: '',
    fact: ''
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

  const addLocation = async () => {
    try {
      const form = new FormData();

      // Append each form field to the FormData object
      form.append('name', formData.name);
      form.append('nameInMap', formData.nameInMap);
      form.append('latitude', formData.latitude);
      form.append('longitude', formData.longitude);
      form.append('image', formData.image);
      form.append('description', formData.description);
      form.append('fact', formData.fact)

      const responseLocation = await fetch('http://35.198.240.131:8081/api/v1/locations', {
        method: "POST",
        body: form,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (!responseLocation.ok) {
        throw new Error('Something went wrong');
      }

      const { locationId } = await responseLocation.json();
      history(`/location`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="js-container">
      <div className="add-location">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          placeholder="Name"
        />
        <input
          name="nameInMap"
          value={formData.nameInMap}
          onChange={handleChange}
          type="text"
          placeholder="Địa chỉ"
        />
        <input
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          type="text"
          placeholder="Latitude"
        />
        <input
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          type="text"
          placeholder="Longitude"
        />
        <input
          name="image"
          onChange={handleChange}
          type="file"
          placeholder="Image"
        />
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          type="text"
          placeholder="Description"
        />
        <input
          name="fact"
          value={formData.fact}
          onChange={handleChange}
          type="text"
          placeholder="Fact"
        />        
        <button onClick={addLocation} type="submit">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddLocation;
