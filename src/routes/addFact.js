// AddFact.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./addFact.css";

const AddFact = () => {
  const [formData, setFormData] = useState({
    content: '',
    type: '',
    originalId: ''
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

  const addFact = async () => {
    try {
      const form = new FormData();

      // Append each form field to the FormData object
      form.append('content', formData.content);
      form.append('type', formData.type);
      form.append('originalId', formData.originalId);

      const responseFact = await fetch('http://35.198.240.131:8081/api/v1/facts', {
        method: "POST",
        body: form,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (!responseFact.ok) {
        throw new Error('Something went wrong');
      }

      const { quizzesId } = await responseFact.json();
      history(`/add-answer/${quizzesId}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="js-container">
      <div className="add-fact">
        <input
          name="content"
          value={formData.content}
          onChange={handleChange}
          type="text"
          placeholder="Content"
        />
        <input
          name="type"
          value={formData.type}
          onChange={handleChange}
          type="text"
          placeholder="Type"
        />
        <input
          name="originalId"
          value={formData.originalId}
          onChange={handleChange}
          type="text"
          placeholder="originalId"
        />
        <button onClick={addFact} type="submit">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddFact;
