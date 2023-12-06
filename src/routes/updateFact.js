import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./updateFact.css";

const EditFact = ({ match }) => {
  const [formData, setFormData] = useState({
    content: '',
    type: '',
    originalId: ''
  });

  const accessToken = localStorage.getItem('accessToken');
  const history = useNavigate();
  const factId = match.params.id;

  useEffect(() => {
    // Fetch existing fact data and populate the form
    fetchFactData(factId);
  }, [factId]);

  const fetchFactData = async (id) => {
    try {
      const response = await fetch(`http://35.198.240.131:8081/api/v1/quizzes/${id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch fact data');
      }

      const factData = await response.json();
      setFormData({
        content: factData.content,
        type: factData.type,
        originalId: factData.originalId,
      });
    } catch (error) {
      console.error('Error fetching fact data:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // If the input is a file input, update the 'image' property with the selected file
    if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const editFact = async () => {
    try {
      const form = new FormData();

      // Append each form field to the FormData object
      form.append('content', formData.content);
      form.append('type', formData.type);
      form.append('originalId', formData.originalId);

      const responseFact = await fetch(`http://35.198.240.131:8081/api/v1/quizzes/${factId}`, {
        method: "PUT",
        body: form,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (!responseFact.ok) {
        throw new Error('Something went wrong');
      }

      // Handle the response or redirect to another page
      history(`/fact-detail/${factId}`);
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
          placeholder="OriginalId"
        />
        <button onClick={editFact} type="submit">
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditFact;
