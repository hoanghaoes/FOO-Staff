import React, { useState, useEffect } from "react";
import axios from "axios";

const QuestionDetail = ({ match }) => {
  const [question, setQuestion] = useState({});
  const questionId = match.params.id;
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    fetchQuestion(questionId);
  }, [questionId]);

  const fetchQuestion = async (id) => {
    try {
      const response = await axios.get(`http://35.198.240.131:8081/api/v1/quizzes/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        responseType: 'arraybuffer',
      });

      const questionData = response.data;

      const imageBlob = new Blob([questionData.image.data], { type: questionData.image.contentType });
      const imageUrl = URL.createObjectURL(imageBlob);

      setQuestion(questionData);
      setImageSrc(imageUrl);
    } catch (error) {
      console.error('Failed to fetch question:', error.message);
    }
  };

  return (
    <div className="question-detail">
      <h1>{question.question}</h1>
      {imageSrc && <img src={imageSrc} alt={question.question} />}
      <h3>Point: {question.point}</h3>
      <p>Location ID: {question.locationId}</p>
      <p>Correct Answer: {question.correctAnswer}</p>
      <p>Description: {question.description}</p>
    </div>
  );
};

export default QuestionDetail;
