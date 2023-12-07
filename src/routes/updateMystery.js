import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "./updateMystery.css";

const UpdateMystery = () => {
  const [formData, setFormData] = useState({
    name: '',
    locationId: '',
    point: '',
    foundImage: null,
    unfoundedImage: null, 
    description: ''
  });

  const { id } = useParams();
  const accessToken = localStorage.getItem('accessToken');
  const history = useNavigate();

  useEffect(() => {
    const fetchMystery = async () => {
      try {
        const response = await fetch(`http://35.198.240.131:8081/api/v1/mystery_item/${id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching Mystery data');
        }

        const mysteryData = await response.json();
        setFormData(mysteryData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMystery();
  }, [id, accessToken]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // If the input is a file input, update the 'image' property with the selected file
    if (name === 'foundImage' && name === 'unfoundedImage') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const updateMystery = async () => {
    try {
      const form = new FormData();

      // Append each form field to the FormData object
      form.append('name', formData.name);
      form.append('locationId', formData.locationId);
      form.append('point', formData.point);
      form.append('foundImage', formData.foundImage);
      form.append('unfoundedImage', formData.unfoundedImage);
      form.append('description', formData.description);

      const response = await fetch(`http://35.198.240.131:8081/api/v1/mystery_item/${id}`, {
        method: "PUT",
        body: form,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Error updating Mystery');
      }

      history(`/mystery`);
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
        <li className="text">LocationId</li>
        <input
          name="locatioId"
          value={formData.locationId}
          onChange={handleChange}
          type="text"
          placeholder="LocationId "
        />
        <li className="text">Điểm</li>
        <input
          name="point"
          value={formData.point}
          onChange={handleChange}
          type="text"
          placeholder="Điểm"
        />
        <li className="text">FoundImage</li>
        <input
          name="foundImage"
          onChange={handleChange}
          type="file"
          placeholder="FoundImage"
        />
        <li className="text">UnfoundedImage</li>
        <input
          name="unfoundedImage"
          onChange={handleChange}
          type="file"
          placeholder="UnfoundImage"
        />
        <li className="text">Description</li>
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          type="text"
          placeholder="Description"
        />
        <button onClick={updateMystery} type="submit">
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateMystery;
