import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ArtifactDetail.css";
import { AiFillExclamationCircle } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { AiFillFastBackward } from "react-icons/ai";
import { AiFillFastForward } from "react-icons/ai";
import { AiFillBackward } from "react-icons/ai";
import { AiFillForward } from "react-icons/ai";

const ArtifactDetail = () => {
const [artifact, setArtifact] = useState([]);
const { id } = useParams();
const yourAccessToken = "eyJhbGciOiJIUzM4NCJ9.eyJ1c2VyIjp7ImlkIjoiOWM4MmViMzQtODg3OS0xMWVlLWEyNDgtYjE5Y2RkOTdkM2U3IiwidXNlcm5hbWUiOiJob2FuZ2hhb2VzIiwiZGlzcGxheU5hbWUiOiJIb2FuZyBIYW8iLCJlbWFpbCI6ImhvYW5naGFvZXNAZ21haWwuY29tIn0sInN1YiI6ImhvYW5naGFvZXNAZ21haWwuY29tIiwiaWF0IjoxNzAwNTc2NjYxLCJleHAiOjE3MDA2NjMwNjF9.evRQUKJPrthSSVjmaTSEWu6PeHabImlcojiDkrLyxl3GBrGn1A-OXtyKIEIjeTM1";

const fetchArtifact = async () => {
   try {
     const response = await fetch(`http:/127.0.0.1:8081/api/v1/artifact/${id}`, {
       method: 'GET',
       headers: {
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

const deleteArtifact = async (id) => {
   const requestOptions = {
     method: "DELETE",
     headers: {
       'Authorization': 'Beerer ' + yourAccessToken,
     }
   };

   try {
     await fetch(`http:/127.0.0.1:8081/api/v1/quizzes/${id}`, requestOptions);
     fetchArtifact();
   } catch (error) {
     console.error("Error in deleteQuestion: ", error);
   }
};

return (
   <div className="artifact-detail">
     <div className="artifact-header">
       <h2>{artifact.artifact}</h2>
       <img src={artifact.image} alt={artifact.artifact} />
     </div>
     <div className="artifact-footer">
       <i className="info-icon"><AiFillExclamationCircle /></i>
       <i className="edit-icon"><AiFillEdit /></i>
       <i className="delete-icon" onClick={() => deleteArtifact(id)}><AiFillDelete /></i>
     </div>
   </div>
);
};

export default ArtifactDetail;