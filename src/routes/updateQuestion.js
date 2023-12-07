import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "./updateQuestion.css";

const UpdateQuestion = () => {
  const [formData, setFormData] = useState({
    locationId: '',
    question: '',
    point: '',
    correctAnswer: '',
    image: null, // Use null to represent the file
    description: ''
  });

  const { id } = useParams();
  const accessToken = localStorage.getItem('accessToken');
  const history = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
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

    fetchQuestion();
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

  const updateQuestion = async () => {
    try {
      const form = new FormData();

      // Append each form field to the FormData object
      form.append('locationId', formData.locationId);
      form.append('question', formData.question);
      form.append('point', formData.point);
      form.append('correctAnswer', formData.correctAnswer);
      form.append('image', formData.image);
      form.append('description', formData.description);

      const response = await fetch(`http://35.198.240.131:8081/api/v1/quizzes/${id}`, {
        method: "PUT",
        body: form,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Error updating location');
      }

      history(`/question`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="js-container">
      <div className="update-location">
        <li>Name</li>
        <input
          name="locationId"
          value={formData.locationId}
          onChange={handleChange}
          type="text"
          placeholder="LocationId"
        />
        <li>Câu hỏi</li>
        <input
          name="question"
          value={formData.question}
          onChange={handleChange}
          type="text"
          placeholder="Câu hỏi "
        />
        <li>Điểm</li>
        <input
          name="point"
          value={formData.point}
          onChange={handleChange}
          type="text"
          placeholder="Điểm"
        />
        <li>Đáp án đúng</li>
        <input
          name="correctAnswer"
          value={formData.correctAnswer}
          onChange={handleChange}
          type="text"
          placeholder="Correct"
        />
        <li>Image</li>
        <input
          name="image"
          onChange={handleChange}
          type="file"
          placeholder="Image"
        />
        <li>Description</li>
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          type="text"
          placeholder="Description"
        />
        <button onClick={updateQuestion} type="submit">
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateQuestion;
