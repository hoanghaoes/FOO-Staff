// AddQuestion.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./addQuestion.css";

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    locationId: '',
    question: '',
    point: '',
    correctAnswer: '',
    image: null, // Use null to represent the file
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

  const addQuestion = async () => {
    try {
      const form = new FormData();

      // Append each form field to the FormData object
      form.append('locationId', formData.locationId);
      form.append('question', formData.question);
      form.append('point', formData.point);
      form.append('correctAnswer', formData.correctAnswer);
      form.append('image', formData.image);
      form.append('description', formData.description);

      const responseQuestion = await fetch('http://35.198.240.131:8081/api/v1/quizzes', {
        method: "POST",
        body: form,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (!responseQuestion.ok) {
        throw new Error('Something went wrong');
      }

      const { quizzesId } = await responseQuestion.json();
      history(`/add-answer/${quizzesId}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="js-container">
      <div className="add-question">
        <input
          name="locationId"
          value={formData.locationId}
          onChange={handleChange}
          type="text"
          placeholder="LocationId"
        />
        <input
          name="question"
          value={formData.question}
          onChange={handleChange}
          type="text"
          placeholder="Question"
        />
        <input
          name="point"
          value={formData.point}
          onChange={handleChange}
          type="text"
          placeholder="Point"
        />
        <input
          name="correctAnswer"
          value={formData.correctAnswer}
          onChange={handleChange}
          type="text"
          placeholder="CorrectAnswer"
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
        <button onClick={addQuestion} type="submit">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddQuestion;
