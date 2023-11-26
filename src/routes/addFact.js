import React, { useState } from "react";
import { useNavigate } from 'react-router-dom' ;
import "./addFact.css"

const AddFact = () => {
 const [formData, setFormData] = useState({
    Fact: '',
    locationId: '',
 });

 const { Fact, locationId } = formData;

 const history = useNavigate();

 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
 };

 const addFact = async () => {
    try {
      const response = await fetch('https://65588cefe93ca47020a9706c.mockapi.io/api/facts/Fact', {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-type": "application/json" },
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      history("/");
    } catch (error) {
      console.error('Error:', error);
    }
 };

 return (
    <div className="js-container">
      <div className="add-Fact">
        <input
          name="Fact"
          value={Fact}
          onChange={handleChange}
          type="text"
          placeholder="Fact"
        />
        <input
          name="locationId"
          value={locationId}
          onChange={handleChange}
          type="text"
          placeholder="Location"
        />
        <button onClick={addFact} type="submit">
          Add
        </button>
      </div>
    </div>
 );
};

export default AddFact;