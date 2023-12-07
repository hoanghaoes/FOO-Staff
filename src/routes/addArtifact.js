import React, { useState } from "react";
import axios from "axios";

const AddArtifact = ({ locationId, onAddArtifact }) => {
  const [formData, setFormData] = useState({
    name: "",
    time: "",
    image: null,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, time, image, description } = formData;

    // Create FormData object to send the file
    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("time", time);
    formDataToSend.append("image", image);
    formDataToSend.append("description", description);

    try {
      // Make a POST request to the API endpoint
      const response = await axios.post(
        `http://35.198.240.131:8081/api/v1/locations/${locationId}/artifacts`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Include any other headers as needed (e.g., Authorization)
          },
        }
      );

      // Optionally, you can handle the response, for example, update state or close the modal
      console.log("Artifact added successfully:", response.data);

      // Call the callback function passed as a prop to update the artifacts in the parent component
      onAddArtifact(response.data);
    } catch (error) {
      console.error("Failed to add artifact:", error.message);
    }
  };

  return (
    <div>
      <h2>Add Artifact</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Time:
          <input type="text" name="time" value={formData.time} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Image:
          <input type="file" name="image" accept="image/*" onChange={handleFileChange} required />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Add Artifact</button>
      </form>
    </div>
  );
};

export default AddArtifact;
