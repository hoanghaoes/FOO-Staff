import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./updateQuestion.css";

const UpdateQuestion = () => {
 const { _id } = useParams();
 const history = useNavigate();

 const [questions, setQuestions] = useState({});

 useEffect(() => {
    getQuestions();
 }, [_id]);

 async function getQuestions() {
    try {
      const response = await fetch(`https://65588cefe93ca47020a9706c.mockapi.io/api/facts/question/${_id}`);
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.log('There was a problem with the fetch operation: ' + error.message);
    }
 }

 return (
    <div className="js-container">
      <div className="question-details">
        <div className="grid-container">
          <div className="grid-item">
            <img src={questions.image} alt="question-image" width="250px" height="auto" border="5" />
          </div>
          <div className="grid-item">
            <h3>Cau hoi: {questions.question}</h3>
            <p>Cac lua chon:</p>
            <ol>
              <li>{questions.option1}</li>
              <li>{questions.option2}</li>
              <li>{questions.option3}</li>
              <li>{questions.option4}</li>
            </ol>
            <p>Answer: {questions.answer}</p>
          </div>
        </div>
        <button className="back-button" onClick={() => history.push("/questions")}>
          Back
        </button>
      </div>
    </div>
 );
}

export default UpdateQuestion;