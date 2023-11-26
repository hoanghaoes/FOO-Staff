import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Question.css";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { AiFillExclamationCircle } from "react-icons/ai";
import { AiFillFileAdd } from "react-icons/ai";
import { AiFillFastBackward } from "react-icons/ai";
import { AiFillFastForward } from "react-icons/ai";
import { AiFillBackward } from "react-icons/ai";
import { AiFillForward } from "react-icons/ai";
import AddQuestion from "./addQuestion";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState(15);
  const yourAccessToken = "eyJhbGciOiJIUzM4NCJ9.eyJ1c2VyIjp7ImlkIjoiOWM4MmViMzQtODg3OS0xMWVlLWEyNDgtYjE5Y2RkOTdkM2U3IiwidXNlcm5hbWUiOiJob2FuZ2hhb2VzIiwiZGlzcGxheU5hbWUiOiJIb2FuZyBIYW8iLCJlbWFpbCI6ImhvYW5naGFvZXNAZ21haWwuY29tIiwicmFua2luZ1BvaW50IjowLCJiYWxhbmNlIjowfSwic3ViIjoiaG9hbmdoYW9lc0BnbWFpbC5jb20iLCJpYXQiOjE3MDA5OTMwODMsImV4cCI6MTcwMTA3OTQ4M30.vvWthwrR8xfXAe8Q19Ae34NTn93LbRfZOM77qnOs7e-ugSA0AXsU4o3O_hIpESd_";


  const fetchQuestions = async () => {
    try {
      const response = await fetch("http:/192.168.2.54:8081/api/v1/quizzes", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching questions');
      }

      const questions = await response.json();
      setQuestions(questions);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const deleteQuestion = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        'Authorization': 'Beerer ' + yourAccessToken,
      }
    };

    try {
      await fetch(`http:/localhost:8081/api/v1/quizzes/${id}`, requestOptions);
      fetchQuestions();
    } catch (error) {
      console.error("Error in deleteQuestion: ", error);
    }
  };

  const paginate = (pageNumber) => {
    const totalPages = Math.ceil(questions.length / questionsPerPage);
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  }; const emptyRows = questionsPerPage - currentQuestions.length;

  return (
    <div className="questions-map">
      <Link to={"add-question"}>
        <button className="add-button">Add <AiFillFileAdd /></button>
      </Link>
      <table className="questions-table">
        <thead>
          <tr>
            <th className="image-column">Image</th>
            <th className="questions-column">Questions</th>
            <th className="point-column">Point</th>
            <th className="action-column"></th>
            <th className="action-column"></th>
            <th className="action-column"></th>
          </tr>
        </thead>
        <tbody>
          {currentQuestions.map(({ question, point, image, id }, index) => (
            <tr>
              <td> {image.length > 25 ? `${image.slice(0, 25)}...` : image}</td>
              <td> {question.length > 40 ? `${question.slice(0, 40)}...` : question}</td>
              <td> {point} </td>
              <td>
                <i className="info-icon"><AiFillExclamationCircle /></i>
              </td>
              <td>
                <i className="edit-icon"><AiFillEdit /></i>
              </td>
              <td>
                <i className="delete-icon" onClick={() => deleteQuestion(id)}><AiFillDelete /></i>
              </td>
            </tr>
          ))}
          {emptyRows > 0 && (
            Array.from({ length: emptyRows }, (_, index) => (
              <tr key={`empty-${index}`}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* // <div className="question-container">
    //   {currentQuestions.map(({ question, point, image, id }, index) => (
    //     <div className="question-row" key={index}>
    //       <div> {question.length > 40 ? `${question.slice(0, 40)}...` : question}</div>
    //       <div> {point} </div>
    //       <div>
    //         <i className="info-icon"><AiFillExclamationCircle /></i>
    //       </div>
    //       <div>
    //         <i className="edit-icon"><AiFillEdit /></i>
    //       </div>
    //       <div>
    //         <i className="delete-icon" onClick={() => deleteQuestion(id)}><AiFillDelete /></i>
    //       </div>
    //     </div>
    //   ))} */}
      <div className="pagination-container">
        <div className="pagination">
          <span className="first-last" onClick={() => paginate(1)}><AiFillFastBackward /></span>
          <span className="first-last" onClick={() => paginate(currentPage - 1)}><AiFillBackward /></span>
          <span className="active">{currentPage}</span>
          <span className="first-last" onClick={() => paginate(currentPage + 1)}><AiFillForward /></span>
          <span className="first-last" onClick={() => paginate(Math.ceil(questions.length / questionsPerPage))}><AiFillFastForward /></span>
        </div>
      </div>
    </div>
  );
};

export default Questions;