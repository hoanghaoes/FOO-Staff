import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Question.css";
import { AiFillEdit, AiFillDelete, AiOutlineCopy, AiFillExclamationCircle, AiFillFileAdd, AiFillFastBackward, AiFillFastForward, AiFillBackward, AiFillForward } from "react-icons/ai";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState(5);
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      const questionsResponse = await axios.get("http://35.198.240.131:8081/api/v1/quizzes/all", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const updatedQuestions = questionsResponse.data.map((question) => {
        const imageUrl = `data:${question.image.contentType};base64,${question.image.data}`;
        return { ...question, imageUrl };
      });

      setQuestions(updatedQuestions);
    } catch (error) {
      console.error('Failed to fetch questions:', error.message);
    }
  };

  useEffect(() => {
    fetchQuestions();

    // Cleanup function
    return () => {
      questions.forEach(q => q.imageUrl && URL.revokeObjectURL(q.imageUrl));
    };
  }, []);

  const copyToClipboard = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const deleteQuestion = async (id) => {
    await axios.delete(`http://35.198.240.131:8081/api/v1/quizzes/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    fetchQuestions();
  };

  // const handleDeleteClick = (id) => {

  // };

  const handleEditClick = (id) => {
    // Navigate to UpdateQuestion component
    navigate(`/update-question/${id}`);
  };

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
          Add Quiz
          <AiFillFileAdd className="add-icon" />
        </button>
      </Link>
      <Link to={"/add-answer"}>
        <button
          className="add-button"
          onClick={() => navigate('/add-answer')}
        >
          Add Answer
          <AiFillFileAdd className="add-icon" />
        </button>
      </Link>
      <table className="questions-table">
        <thead>
          <tr>
            <th className="id-column">ID</th>
            <th className="image-column">Image</th>
            <th className="questions-column">Questions</th>
            <th className="point-column">Point</th>
            <th className="correctAns-column">Correct</th>
            <th className="answer-column">Answer</th>
            <th className="des-column">Description</th>
            <th className="action-column"></th>
            <th className="action-column"></th>
          </tr>
        </thead>
        <tbody>
          {currentQuestions.map(({ id, question, point, correctAnswer, answers, imageUrl, description }, index) => (
            <React.Fragment key={id}>
              <tr>
                <td>
                  <span
                    className="copy-icon"
                    onClick={() => copyToClipboard(id)}
                  >
                    <AiOutlineCopy />
                  </span>
                </td>
                <td>
                  {imageUrl && (
                    <img
                      className="question-image"
                      src={imageUrl}
                      alt={`Question ${index + 1}`}
                      width={"250px"}
                      height={"auto"}
                    />
                  )}
                </td>
                <td>{question}</td>
                <td>{point}</td>
                <td>{correctAnswer}</td>
                <td>
                  <ul>
                    {answers.map(({ id: answerId, quizzessId, answer }) => (
                      <li key={answerId}>{answer}</li>
                    ))}
                  </ul>
                </td>
                <td>{description}</td>
                <td>
                  <i className="edit-icon" onClick={() => handleEditClick(id)}>
                    <AiFillEdit />
                  </i>
                </td>
                <td>
                  <i className="delete-icon" onClick={() => deleteQuestion(id)}>
                    <AiFillDelete />
                  </i>
                </td>
              </tr>
              {index < currentQuestions.length - 1 && <tr key={`separator-${id}`}><td colSpan="8"></td></tr>}
            </React.Fragment>
          ))}
          {emptyRows > 0 && (
            Array.from({ length: emptyRows }, (_, index) => (
              <tr key={`empty-${index}`}>
                <td colSpan="8"></td>
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
