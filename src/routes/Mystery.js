import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Mystery.css";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { AiFillExclamationCircle } from "react-icons/ai";
import { AiFillFileAdd } from "react-icons/ai";
import { AiFillFastBackward } from "react-icons/ai";
import { AiFillFastForward } from "react-icons/ai";
import { AiFillBackward } from "react-icons/ai";
import { AiFillForward } from "react-icons/ai";

const Mystery = () => {
  const [mystery, setMystery] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [MysteryPerPage, setMysteryPerPage] = useState(15);
  const yourAccessToken = "eyJhbGciOiJIUzM4NCJ9.eyJ1c2VyIjp7ImlkIjoiOWM4MmViMzQtODg3OS0xMWVlLWEyNDgtYjE5Y2RkOTdkM2U3IiwidXNlcm5hbWUiOiJob2FuZ2hhb2VzIiwiZGlzcGxheU5hbWUiOiJIb2FuZyBIYW8iLCJlbWFpbCI6ImhvYW5naGFvZXNAZ21haWwuY29tIn0sInN1YiI6ImhvYW5naGFvZXNAZ21haWwuY29tIiwiaWF0IjoxNzAwNTc2NjYxLCJleHAiOjE3MDA2NjMwNjF9.evRQUKJPrthSSVjmaTSEWu6PeHabImlcojiDkrLyxl3GBrGn1A-OXtyKIEIjeTM1";

  const fetchMystery = async () => {
    try {
      const response = await fetch("http:/localhost:8081/api/v1/mystery_item", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${yourAccessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching');
      }

      const mystery = await response.json();
      setMystery(mystery);
    } catch (error) {
      console.error('Failed to fetch', error);
    }
  };

  useEffect(() => {
    fetchMystery();
  }, []);

  const indexOfLastMystery = currentPage * MysteryPerPage;
  const indexOfFirstMystery = indexOfLastMystery - MysteryPerPage;
  const currentMystery = mystery.slice(indexOfFirstMystery, indexOfLastMystery);

  const deleteMystery = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        'Authorization': 'Beerer ' + yourAccessToken,
      }
    };

    try {
      await fetch(`http:/127.0.0.1:8081/api/v1/mystery_item/${id}`, requestOptions);
      fetchMystery();
    } catch (error) {
      console.error("Error in deleteQuestion: ", error);
    }
  };

  const paginate = (pageNumber) => {
    const totalPages = Math.ceil(mystery.length / MysteryPerPage);
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  }; const emptyRows = MysteryPerPage - currentMystery.length;

  const navigate=useNavigate();

  return (
    <div className="mystery-map">
      <button className="add-button" onClick={() => navigate('/add-mystery')}>Add <AiFillFileAdd /></button>
      <table className="mystery-table">
        <thead>
          <tr>
            <th className="mystery-column">Mystery</th>
            <th className="action-column"></th>
            <th className="action-column"></th>
            <th className="action-column"></th>
          </tr>
        </thead>
        <tbody>
          {currentMystery.map(({ mystery, id }, index) => (
            <tr>
              {/* <td> {image.length > 25 ? `${image.slice(0, 25)}...` : image}</td> */}
              <td> {mystery.length > 40 ? `${mystery.slice(0, 40)}...` : mystery}</td>
              <td>
                <i className="info-icon"><AiFillExclamationCircle /></i>
              </td>
              <td>
                <i className="edit-icon"><AiFillEdit /></i>
              </td>
              <td>
                <i className="delete-icon" onClick={() => deleteMystery(id)}><AiFillDelete /></i>
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
          <span className="first-last" onClick={() => paginate(Math.ceil(mystery.length / MysteryPerPage))}><AiFillFastForward /></span>
        </div>
      </div>
    </div>
  );
};

export default Mystery;