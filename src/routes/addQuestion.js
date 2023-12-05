import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import QuestionApi from "../api/QuizzesApi";
import useAuth from "../api/useAuth";
import "./addQuestion.css"

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    image: '',
    question: '',
    locationId: '',
    correctAnswer: '',
    answers: [], // Store answers in an array
  });

  const { isAuthenticated, token } = useAuth();
  const accessToken=localStorage.getItem('accessToken');

  const { image, question, point, locationId,correctAnswer, answers } = formData;

  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle changes for answers
  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setFormData({ ...formData, answers: updatedAnswers });
  };

  const addQuestion = async () => {
    try {
      // Step 1: Send question data and get the quizzesId
      const responseQuestion = await fetch('http://127.0.0.1:8081/api/v1/quizzes', {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { 
          "Content-type": "application/json" ,
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (!responseQuestion.ok) {
        throw new Error('Something went wrong');
      }

      const { quizzesId } = await responseQuestion.json();

      // Step 2: Send answers to the corresponding quizzesId
      const responseAnswers = await fetch(`http://127.0.0.1:8081/api/v1/${quizzesId}/answer`, {
        method: "POST",
        body: JSON.stringify({ answers }),
        headers: { 
          "Content-type": "application/json" ,
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!responseAnswers.ok) {
        throw new Error('Something went wrong while adding answers');
      }

      history("/");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="js-container">
      <div className="add-question">
        <input
          name="locationId"
          value={locationId}
          onChange={handleChange}
          type="text"
          placeholder="Location"
        />
        <input
          name="question"
          value={question}
          onChange={handleChange}
          type="text"
          placeholder="Question"
        />
        <input
          name="point"
          value={point}
          onChange={handleChange}
          type="number"
          placeholder="Point"
        />
        <input
          name="correctAnswer"
          value={correctAnswer}
          onChange={handleChange}
          type="text"
          placeholder="CorrectAnswer"
        />
        <input
          name="Image"
          value={image}
          onChange={handleChange}
          type="file"
          placeholder="Image"
        />
        {/* Render answer input fields */}
        {answers.map((answer, index) => (
          <input
            key={index}
            value={answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            type="text"
            placeholder={`Answer ${index + 1}`}
          />
        ))}

        {/* Add a new answer button */}
        <button onClick={() => setFormData({ ...formData, answers: [...answers, ''] })}>
          Add Answer
        </button>

        <button onClick={addQuestion} type="submit">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddQuestion;
