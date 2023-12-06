import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./addAnswer.css";

const AddAnswer = ({ quizzesId }) => {
    const [quizId, setQuizId] = useState(quizzesId);
    const [answer, setAnswer] = useState('');
    const accessToken = localStorage.getItem('accessToken');
    const history = useNavigate();

    const submitAnswers = async () => {
        try {
            const response = await fetch(`http://35.198.240.131:8081/api/v1/quizzes/${quizId}/answer`, {
                method: 'POST',
                body: JSON.stringify([{ quizId, answer }]), // Wrap quizId and answer in an array
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            });

            if (!response.ok) {
                throw new Error('Error adding answers');
            }

            history(`/add-answer`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="add-answer">
            <input
                name="quizId"
                value={quizId}
                onChange={(e) => setQuizId(e.target.value)}
                type="text"
                placeholder="QuizId"
            />
            <input
                name="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                type="text"
                placeholder="Answer"
            />
            <button onClick={submitAnswers} type="button">
                Submit Answers
            </button>
        </div>
    );
};

export default AddAnswer;
