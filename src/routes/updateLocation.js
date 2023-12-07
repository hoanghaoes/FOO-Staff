import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "./updateLocation.css";

const UpdateLocation = () => {
  const [formData, setFormData] = useState({
    name: '',
    nameInMap: '',
    latitude: '',
    longitude: '',
    image: null, // Use null to represent the file
    description: '',
    fact: ''
  });

  const { id } = useParams();
  const accessToken = localStorage.getItem('accessToken');
  const history = useNavigate();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`http://35.198.240.131:8081/api/v1/locations/${id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching location data');
        }

        const locationData = await response.json();
        setFormData(locationData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchLocation();
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

  const updateLocation = async () => {
    try {
      const form = new FormData();

      // Append each form field to the FormData object
      form.append('name', formData.name);
      form.append('nameInMap', formData.nameInMap);
      form.append('latitude', formData.latitude);
      form.append('longitude', formData.longitude);
      form.append('image', formData.image);
      form.append('description', formData.description);
      form.append('fact', formData.fact);

      const response = await fetch(`http://35.198.240.131:8081/api/v1/locations/${id}`, {
        method: "PUT",
        body: form,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Error updating location');
      }

      history(`/location`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="js-container">
      <div className="update-location">
        <li className="text">Name</li>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          placeholder="Name"
        />
        <li className="text">Địa chỉ</li>
        <input
          name="nameInMap"
          value={formData.nameInMap}
          onChange={handleChange}
          type="text"
          placeholder="Địa chỉ"
        />
        <li className="text">Latitude</li>
        <input
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          type="text"
          placeholder="Latitude"
        />
        <li className="text">Longitude</li>
        <input
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          type="text"
          placeholder="Longitude"
        />
        <li className="text">Image</li>
        <input
          name="image"
          onChange={handleChange}
          type="file"
          placeholder="Image"
        />
        <li className="text">Description</li>
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          type="text"
          placeholder="Description"
        />
        <li className="text">Fact</li>
        <input
          name="fact"
          value={formData.fact}
          onChange={handleChange}
          type="text"
          placeholder="Fact"
        />
        <button onClick={updateLocation} type="submit">
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateLocation;
