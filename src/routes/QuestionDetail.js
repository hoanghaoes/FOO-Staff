import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillExclamationCircle } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

const QuestionDetail = ({ match }) => {
 const [question, setQuestion] = useState([]);
 const questionId = match.params.id;
 const accessToken=localStorage.getItem('accessToken');

 useEffect(() => {
    fetchQuestion();
 }, []);

 const fetchQuestion = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8081/api/v1/quizzes/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const question = response.data;
      setQuestion(question);
    } catch (error) {
      console.error('Failed to fetch question:', error.message);
    }
 };

 const deleteQuestion = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    };

    try {
      await axios.delete(`http://127.0.0.1:8081/api/v1/quizzes/${id}`, requestOptions);
      fetchQuestion();
    } catch (error) {
      console.error("Error in deleteQuestion: ", error);
    }
 };

 return (
    <div className="question-detail">
      <h1>{question.question}</h1>
      <img src={question.image} alt={question.question} />
      <h3>Point: {question.point}</h3>
      <div className="action-icons">
        <i className="info-icon"><AiFillExclamationCircle /></i>
        <i className="edit-icon"><AiFillEdit /></i>
        <i className="delete-icon" onClick={() => deleteQuestion(question.id)}><AiFillDelete /></i>
      </div>
    </div>
 );
};

export default QuestionDetail;