import React, { useState } from "react";
import { useNavigate } from 'react-router-dom' ;
import "./addMystery.css"

const AddMystery = () => {
 const [formData, setFormData] = useState({
    Mystery: '',
    locationId: '',
 });

 const { Mystery, locationId } = formData;

 const history = useNavigate();

 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
 };

 const addMystery = async () => {
    try {
      const response = await fetch('https://65588cefe93ca47020a9706c.mockapi.io/api/mysterys/Mystery', {
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
      <div className="add-Mystery">
        <input
          name="Mystery"
          value={Mystery}
          onChange={handleChange}
          type="text"
          placeholder="Mystery"
        />
        <input
          name="locationId"
          value={locationId}
          onChange={handleChange}
          type="text"
          placeholder="Location"
        />
        <button onClick={addMystery} type="submit">
          Add
        </button>
      </div>
    </div>
 );
};

export default AddMystery;