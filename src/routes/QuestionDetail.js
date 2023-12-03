import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillExclamationCircle } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

const QuestionDetail = ({ match }) => {
 const [question, setQuestion] = useState([]);
 const questionId = match.params.id;
 const yourAccessToken = "eyJhbGciOiJIUzM4NCJ9.eyJ1c2VyIjp7ImlkIjoiMzBhZDhhY2UtOTE5OC0xMWVlLWE2NjUtYzUzZmI0NTY0YjE0IiwidXNlcm5hbWUiOiJhZG1pbiIsImRpc3BsYXlOYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJhbmtpbmdQb2ludCI6MCwiYmFsYW5jZSI6MH0sInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwMTU3OTM3NCwiZXhwIjoxNzAxNjY1Nzc0fQ.8FC-xIixknbl7A0gDXepLlkh4Ys1Bp8GSqX6LKy7ZeksbNwDe0EVsVxSG98YMGuN";

 useEffect(() => {
    fetchQuestion();
 }, []);

 const fetchQuestion = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8081/api/v1/quizzes/${questionId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${yourAccessToken}`,
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
        'Authorization': 'Beerer ' + yourAccessToken,
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