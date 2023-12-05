import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Question.css";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { AiFillExclamationCircle } from "react-icons/ai";
import { AiFillFileAdd } from "react-icons/ai";
import { AiFillFastBackward } from "react-icons/ai";
import { AiFillFastForward } from "react-icons/ai";
import { AiFillBackward } from "react-icons/ai";
import { AiFillForward } from "react-icons/ai";
import useAuth from "../api/useAuth";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState(15);
  const { isAuthenticated, token } = useAuth();
  const accessToken=localStorage.getItem('accessToken');

  const fetchQuestions = async () => {
    try {
       const questions = await axios.get("http://127.0.0.1:8081/api/v1/quizzes", {
         headers: { Authorization: `Bearer ${accessToken}` },
       });
       questions.data.forEach(question => {
         question.image = question.image.name;
       });
       setQuestions(questions.data);
    } catch (error) {
       console.error('Failed to fetch questions:', error.message);
    }
   };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const deleteQuestion = async (id) => {
    await axios.delete(`http://127.0.0.1:8081/api/v1/quizzes/${id}`, {
       headers: { Authorization: `Bearer ${accessToken}` },
    });
    fetchQuestions();
   };

  const navigate = useNavigate();

  const paginate = (pageNumber) => {
    const totalPages = Math.ceil(questions.length / questionsPerPage);
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  const emptyRows = questionsPerPage - currentQuestions.length;

  return (
    <div className="questions-map">
      <Link to={"/add-question"}>
        <button
          className="add-button"
          onClick={() => navigate('/add-question')}
        >
          <span>Add</span>
          <AiFillFileAdd className="add-icon" />
        </button>
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
              <td> {image}</td>
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