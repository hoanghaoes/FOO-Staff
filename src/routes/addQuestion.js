import React, { useState } from "react";
import { useNavigate } from 'react-router-dom' ;
import QuestionApi from "../api/QuizzesApi";
import "./addQuestion.css"

const AddQuestion = () => {
 const [formData, setFormData] = useState({
    image: '',
    question: '',
    locationId: '',
    answer: ''
 });

 const { image, question, locationId, correctAnswer } = formData;

 const history = useNavigate();

 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
 };

 const addQuestion = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8081/api/v1/quizzes', {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-type": "application/json" },
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
      <div className="add-question">
        <input
          name="image"
          value={image}
          onChange={handleChange}
          type="file"
          placeholder="Image" 
        />
        <input
          name="question"
          value={question}
          onChange={handleChange}
          type="text"
          placeholder="Question"
        />
        <input
          name="locationId"
          value={locationId}
          onChange={handleChange}
          type="text"
          placeholder="Location"
        />
        <input
          name="answer"
          value={correctAnswer}
          onChange={handleChange}
          type="text"
          placeholder="Answer"
        />
        <button onClick={addQuestion} type="submit">
          Add
        </button>
      </div>
    </div>
 );
};

export default AddQuestion;