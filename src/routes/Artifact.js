import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Artifact.css";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { AiFillExclamationCircle } from "react-icons/ai";
import { AiFillFileAdd } from "react-icons/ai";
import { AiFillFastBackward } from "react-icons/ai";
import { AiFillFastForward } from "react-icons/ai";
import { AiFillBackward } from "react-icons/ai";
import { AiFillForward } from "react-icons/ai";
// import AddQuestion from "./addQuestion";

const Artifact = () => {
 const [artifact, setArtifact] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [ArtifactPerPage, setArtifactPerPage] = useState(15);
 const yourAccessToken = "eyJhbGciOiJIUzM4NCJ9.eyJ1c2VyIjp7ImlkIjoiOWM4MmViMzQtODg3OS0xMWVlLWEyNDgtYjE5Y2RkOTdkM2U3IiwidXNlcm5hbWUiOiJob2FuZ2hhb2VzIiwiZGlzcGxheU5hbWUiOiJIb2FuZyBIYW8iLCJlbWFpbCI6ImhvYW5naGFvZXNAZ21haWwuY29tIn0sInN1YiI6ImhvYW5naGFvZXNAZ21haWwuY29tIiwiaWF0IjoxNzAwNTc2NjYxLCJleHAiOjE3MDA2NjMwNjF9.evRQUKJPrthSSVjmaTSEWu6PeHabImlcojiDkrLyxl3GBrGn1A-OXtyKIEIjeTM1";

 const fetchArtifact = async () => {
  try {
     const response = await fetch("http:/127.0.0.1:8081/api/v1/artifact", {
       method: 'GET',
       headers: {
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${yourAccessToken}`,
       },
     });
 
     if (!response.ok) {
       throw new Error('Error fetching questions');
     }
 
     const artifact = await response.json();
     setArtifact(artifact);
  } catch (error) {
     console.error('Failed to fetch questions:', error);
  }
 };

 useEffect(() => {
    fetchArtifact();
 }, []);

 const indexOfLastArtifact = currentPage * ArtifactPerPage;
 const indexOfFirstArtifact = indexOfLastArtifact - ArtifactPerPage;
 const currentArtifact = artifact.slice(indexOfFirstArtifact, indexOfLastArtifact);

 const deleteArtifact = async (id) => {
  const requestOptions = {
     method: "DELETE",
     headers: {
       'Authorization': 'Beerer ' + yourAccessToken,
     }
  };
 
  try {
     await fetch(`localhost:8081/api/v1/quizzes/${id}`, requestOptions);
     fetchArtifact();
  } catch (error) {
     console.error("Error in deleteQuestion: ", error);
  }
 };

 const paginate = (pageNumber) => {
  const totalPages = Math.ceil(artifact.length / ArtifactPerPage);
  setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
 }; const emptyRows = ArtifactPerPage - currentArtifact.length;

 return (
    <div className="artifact-map">
      <Link to={"add-artifact"}>
        <button className="add-button">Add <AiFillFileAdd/></button>
      </Link>
      <table className="artifact-table">
        <thead>
          <tr>
            <th className="artifact-column">Artifact</th>
            <th className="image-column">Image</th>
            <th className="action-column"></th>
            <th className="action-column"></th>
            <th className="action-column"></th>
          </tr>
        </thead>
        <tbody>
          {currentArtifact.map(({ artifact, image, id }, index) => (
            <tr>
              {/* <td> {image.length > 25 ? `${image.slice(0, 25)}...` : image}</td> */}
              <td> {artifact.length > 40 ? `${artifact.slice(0, 40)}...` : artifact}</td>
              <td> {image} </td>
              <td>
                <i className="info-icon"><AiFillExclamationCircle /></i>
              </td>
              <td>
                <i className="edit-icon"><AiFillEdit /></i>
              </td>
              <td>
                <i className="delete-icon" onClick={() => deleteArtifact(id)}><AiFillDelete /></i>
              </td>
            </tr>
          ))}
          {emptyRows > 0 && (
            Array.from({ length: emptyRows }, (_, index) => (
              <tr key={`empty-${index}`}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
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
          <span className="first-last" onClick={() => paginate(Math.ceil(artifact.length / ArtifactPerPage))}><AiFillFastForward /></span>
        </div>
      </div>
    </div>
 );
};

export default Artifact;