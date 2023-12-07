import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Artifact.css";
import { AiFillFileAdd, AiFillFastBackward, AiFillFastForward, AiFillBackward, AiFillForward } from "react-icons/ai";

const Artifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [artifactsPerPage, setArtifactsPerPage] = useState(5);
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const fetchArtifacts = async () => {
    try {
      const response = await axios.get("http://35.198.240.131:8081/api/v1/search?searchText=", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log("API Response:", response.data); // Log the response

      setArtifacts(response.data.artifacts);
    } catch (error) {
      console.error('Failed to fetch artifacts:', error.message);
    }
  };

  useEffect(() => {
    fetchArtifacts();
  }, []);

  const indexOfLastArtifact = currentPage * artifactsPerPage;
  const indexOfFirstArtifact = indexOfLastArtifact - artifactsPerPage;
  const currentArtifacts = artifacts.slice(indexOfFirstArtifact, indexOfLastArtifact);

  const paginate = (pageNumber) => {
    const totalPages = Math.ceil(artifacts.length / artifactsPerPage);
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  const emptyRows = artifactsPerPage - currentArtifacts.length;

  return (
    <div className="artifacts-map">
      {/* <Link to={"/add-artifact"}>
        <button
          className="add-button"
          onClick={() => navigate('/add-artifact')}
        >
          Add
          <AiFillFileAdd className="add-icon" />
        </button>
      </Link> */}
      <table className="artifacts-table">
        <thead>
          <tr>
            <th className="name-column">Name</th>
            <th className="time-column">Time</th>
            <th className="locationId-column">LocationId</th>
            <th className="image-column">Image</th>
            <th className="description">Description</th>
          </tr>
        </thead>
        <tbody>
          {currentArtifacts.map((artifact) => (
            <tr key={artifact.id}>
              <td>{artifact.name}</td>
              <td>{artifact.time}</td>
              <td>{artifact.locationId}</td>
              <td>
                <img
                  className="artifact-image"
                  src={`data:${artifact.image.type};base64,${artifact.image.data}`}
                  alt={`Artifact ${artifact.id}`}
                  width={"150px"}
                  height={"auto"}
                />
              </td>
              <td>{artifact.description}</td>
            </tr>
          ))}
          {emptyRows > 0 && (
            Array.from({ length: emptyRows }, (_, index) => (
              <tr key={`empty-${index}`}>
                <td colSpan="5"></td>
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
          <span className="first-last" onClick={() => paginate(Math.ceil(artifacts.length / artifactsPerPage))}><AiFillFastForward /></span>
        </div>
      </div>
    </div>
  );
};

export default Artifacts;
