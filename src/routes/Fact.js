import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Fact.css";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { AiFillExclamationCircle } from "react-icons/ai";
import { AiFillFileAdd } from "react-icons/ai";
import { AiFillFastBackward } from "react-icons/ai";
import { AiFillFastForward } from "react-icons/ai";
import { AiFillBackward } from "react-icons/ai";
import { AiFillForward } from "react-icons/ai";
// import AddQuestion from "./addQuestion";

const Fact = () => {
 const [fact, setFact] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [FactPerPage, setFactPerPage] = useState(15);
 const yourAccessToken = "eyJhbGciOiJIUzM4NCJ9.eyJ1c2VyIjp7ImlkIjoiOWM4MmViMzQtODg3OS0xMWVlLWEyNDgtYjE5Y2RkOTdkM2U3IiwidXNlcm5hbWUiOiJob2FuZ2hhb2VzIiwiZGlzcGxheU5hbWUiOiJIb2FuZyBIYW8iLCJlbWFpbCI6ImhvYW5naGFvZXNAZ21haWwuY29tIn0sInN1YiI6ImhvYW5naGFvZXNAZ21haWwuY29tIiwiaWF0IjoxNzAwNTc2NjYxLCJleHAiOjE3MDA2NjMwNjF9.evRQUKJPrthSSVjmaTSEWu6PeHabImlcojiDkrLyxl3GBrGn1A-OXtyKIEIjeTM1";

 const fetchFact = async () => {
  try {
     const response = await fetch("localhost:8081/api/v1/artifact", {
       method: 'GET',
       headers: {
         'Authorization': `Bearer ${yourAccessToken}`,
       },
     });
 
     if (!response.ok) {
       throw new Error('Error fetching questions');
     }
 
     const fact = await response.json();
     setFact(fact);
  } catch (error) {
     console.error('Failed to fetch questions:', error);
  }
 };

 useEffect(() => {
    fetchFact();
 }, []);

 const indexOfLastFact = currentPage * FactPerPage;
 const indexOfFirstFact = indexOfLastFact - FactPerPage;
 const currentFact = fact.slice(indexOfFirstFact, indexOfLastFact);

 const deleteFact = async (id) => {
  const requestOptions = {
     method: "DELETE",
     headers: {
       'Authorization': 'Beerer ' + yourAccessToken,
     }
  };
 
  try {
     await fetch(`localhost:8081/api/v1/quizzes/${id}`, requestOptions);
     fetchFact();
  } catch (error) {
     console.error("Error in deleteQuestion: ", error);
  }
 };

 const paginate = (pageNumber) => {
  const totalPages = Math.ceil(fact.length / FactPerPage);
  setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
 }; const emptyRows = FactPerPage - currentFact.length;

 return (
    <div className="fact-map">
      <Link to={"add-fact"}>
        <button className="add-button">Add <AiFillFileAdd/></button>
      </Link>
      <table className="fact-table">
        <thead>
          <tr>
            <th className="fact-column">Fact</th>
            <th className="action-column"></th>
            <th className="action-column"></th>
            <th className="action-column"></th>
          </tr>
        </thead>
        <tbody>
          {currentFact.map(({ fact,  id }, index) => (
            <tr>
              {/* <td> {image.length > 25 ? `${image.slice(0, 25)}...` : image}</td> */}
              <td> {fact.length > 40 ? `${fact.slice(0, 40)}...` : fact}</td>
              <td>
                <i className="info-icon"><AiFillExclamationCircle /></i>
              </td>
              <td>
                <i className="edit-icon"><AiFillEdit /></i>
              </td>
              <td>
                <i className="delete-icon" onClick={() => deleteFact(id)}><AiFillDelete /></i>
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
          <span className="first-last" onClick={() => paginate(Math.ceil(fact.length / FactPerPage))}><AiFillFastForward /></span>
        </div>
      </div>
    </div>
 );
};

export default Fact;