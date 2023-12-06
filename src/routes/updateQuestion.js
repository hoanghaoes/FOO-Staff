import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "./updateQuestion.css";

const EditQuestion = () => {
  const [formData, setFormData] = useState({
    locationId: '',
    question: '',
    point: '',
    correctAnswer: '',
    image: null,
    description: '',
  });

  const accessToken = localStorage.getItem('accessToken');
  const history = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://35.198.240.131:8081/api/v1/quizzes/${id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching location data');
        }

        const questionData = await response.json();
        setFormData(questionData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchQuestions();
  }, [id, accessToken]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // If the input is a file input, update the 'image' property with the selected file
    if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const editQuestion = async () => {
    try {
      const form = new FormData();

      // Append each form field to the FormData object
      form.append('locationId', formData.locationId);
      form.append('question', formData.question);
      form.append('point', formData.point);
      form.append('correctAnswer', formData.correctAnswer);
      form.append('image', formData.image);
      form.append('description', formData.description);

      const responseQuestion = await fetch(`http://35.198.240.131:8081/api/v1/quizzes/${id}`, {
        method: "PUT",
        body: form,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (!responseQuestion.ok) {
        throw new Error('Something went wrong');
      }

      // Handle the response or redirect to another page
      history(`/question`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="js-container">
      <div className="add-question">
        <input
          name="locationId"
          value={formData.locationId}
          onChange={handleChange}
          type="text"
          placeholder="LocationId"
        />
        <input
          name="question"
          value={formData.question}
          onChange={handleChange}
          type="text"
          placeholder="Question"
        />
        <input
          name="point"
          value={formData.point}
          onChange={handleChange}
          type="text"
          placeholder="Point"
        />
        <input
          name="correctAnswer"
          value={formData.correctAnswer}
          onChange={handleChange}
          type="text"
          placeholder="CorrectAnswer"
        />
        {/* Handle the image display based on your UI logic */}
        {formData.image && (
          <img
            src={URL.createObjectURL(formData.image)}
            alt="Current Image"
            width="100"
          />
        )}
        <input
          name="image"
          onChange={handleChange}
          type="file"
          placeholder="Image"
        />
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          type="text"
          placeholder="Description"
        />
        <button onClick={editQuestion} type="submit">
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditQuestion;
