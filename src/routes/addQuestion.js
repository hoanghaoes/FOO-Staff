import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./addQuestion.css";
import AddAnswer from "./addAnswer"; // Import the AddAnswer component

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    locationId: '',
    question: '',
    point: '',
    correctAnswer: '',
    image: null,
    description: ''
  });

  const accessToken = localStorage.getItem('accessToken');
  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name === 'answer') {
      const newAnswers = [...formData.answer];
      newAnswers[e.target.dataset.index] = value;
      setFormData({ ...formData, answer: newAnswers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submitQuestion = async () => {
    try {
      const form = new FormData();
      form.append('locationId', formData.locationId);
      form.append('question', formData.question);
      form.append('point', formData.point);
      form.append('correctAnswer', formData.correctAnswer);
      form.append('image', formData.image);
      form.append('description', formData.description);

      const response = await fetch('http://35.198.240.131:8081/api/v1/quizzes', {
        method: 'POST',
        body: form,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const { quizzesId } = await response.json();

      history("/question")
      // Render the AddAnswer component
      return <AddAnswer quizzesId={quizzesId} />;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="js-container">
      <div className="add-question">
        <h1 className="text">Add Question</h1>
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
        <button onClick={submitQuestion} type="submit">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddQuestion;
