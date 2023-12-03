import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./addArtifact.css";
import axios from "axios";

const AddArtifact = () => {
    const [formData, setFormData] = useState({
        image: '',
        artifact: '',
        locationId: ''
    });

    const { image, artifact, locationId } = formData;

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://65588cefe93ca47020a9706c.mockapi.io/api/facts/question', formData, {
                headers: {
                    "Content-type": "application/json",
                    // "Authorization": "Bearer " + token,
                },
            });

            if (response.status !== 200) {
                throw new Error('Something went wrong');
            }

            navigate("/");
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="js-container">
            <form className="add-artifact" onSubmit={handleSubmit}>
                <input
                    name="image"
                    value={image}
                    onChange={handleChange}
                    type="file"
                    placeholder="Image"
                />
                <input
                    name="artifact"
                    value={artifact}
                    onChange={handleChange}
                    type="text"
                    placeholder="Aritfact"
                />
                <input
                    name="locationId"
                    value={locationId}
                    onChange={handleChange}
                    type="text"
                    placeholder="Location"
                />
                <button type="submit">
                    Add
                </button>
            </form>
        </div>
    );
};

export default AddArtifact;