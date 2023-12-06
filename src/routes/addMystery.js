// AddMystery.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./addMystery.css";

const AddMystery = () => {
  const [formData, setFormData] = useState({
    name: '',
    locationId: '',
    point: '',
    foundImage: null,
    unfoundedimage: null, // Use null to represent the file
    description: ''
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

  const addMystery = async () => {
    try {
      const form = new FormData();

      // Append each form field to the FormData object
      form.append('name', formData.name);
      form.append('locationId', formData.locationId);
      form.append('point', formData.point);
      form.append('foundImage', formData.foundImage);
      form.append('unfoundedImage', formData.unfoundedImage);
      form.append('description', formData.description)

      const responseMystery = await fetch('http://35.198.240.131:8081/api/v1/locations', {
        method: "POST",
        body: form,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (!responseMystery.ok) {
        throw new Error('Something went wrong');
      }

      const { locationId } = await responseMystery.json();
      history(`/mystery`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="js-container">
      <div className="add-mystery">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          placeholder="Name"
        />
        <input
          name="locationId"
          value={formData.locationId}
          onChange={handleChange}
          type="text"
          placeholder="LocationId"
        />
        <input
          name="point"
          value={formData.point}
          onChange={handleChange}
          type="text"
          placeholder="Point"
        />
        <li>FoundImage</li>
        <input
          name="foundImage"
          value={formData.foundImage}
          onChange={handleChange}
          type="file"
          placeholder="Found"
        />
        <li>UnfoundedImage</li>
        <input
          name="unfoundedImage"
          value={formData.unfoundedimage}
          onChange={handleChange}
          type="file"
          placeholder="UnFound"
        />
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          type="text"
          placeholder="Description"
        />        
        <button onClick={addMystery} type="submit">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddMystery;
