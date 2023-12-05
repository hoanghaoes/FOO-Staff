import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Fact.css";
import { AiFillEdit, AiFillDelete, AiFillExclamationCircle, AiFillFileAdd, AiFillFastBackward, AiFillFastForward, AiFillBackward, AiFillForward } from "react-icons/ai";
import UpdateFact from "./updateFact";

const Facts = () => {
  const [facts, setFacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [factsPerPage, setFactsPerPage] = useState(15);
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const fetchFacts = async () => {
    try {
      const factsResponse = await axios.get("http://35.198.240.131:8081/api/v1/facts", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const updatedFacts = factsResponse.data.map((fact) => {
        const imageBlob = new Blob([fact.image.data], { type: fact.image.contentType });
        const imageUrl = URL.createObjectURL(imageBlob);
        return { ...fact, imageUrl };
      });

      setFacts(updatedFacts);
    } catch (error) {
      console.error('Failed to fetch facts:', error.message);
    }
  };

  useEffect(() => {
    fetchFacts();
  }, []);

  const indexOfLastFact = currentPage * factsPerPage;
  const indexOfFirstFact = indexOfLastFact - factsPerPage;
  const currentFacts = facts.slice(indexOfFirstFact, indexOfLastFact);

  const deleteFact = async (id) => {
    await axios.delete(`http://35.198.240.131:8081/api/v1/facts/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    fetchFacts();
  };

  const handleEditClick = (id) => {
    // Navigate to UpdateFact component
    navigate(`/update-fact/${id}`);
  };

  const paginate = (pageNumber) => {
    const totalPages = Math.ceil(facts.length / factsPerPage);
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  const emptyRows = factsPerPage - currentFacts.length;

  return (
    <div className="facts-map">
      <Link to={"/add-fact"}>
        <button
          className="add-button"
          onClick={() => navigate('/add-fact')}
        >
          <span>Add</span>
          <AiFillFileAdd className="add-icon" />
        </button>
      </Link>
      <table className="facts-table">
        <thead>
          <tr>
            <th className="content-column">Content</th>
            <th className="type-column">Type</th>
            <th className="oId-column">OriginalId</th>
            <th className="action-column"></th>
            <th className="action-column"></th>
          </tr>
        </thead>
        <tbody>
          {currentFacts.map(({ id, content, type, originalId }, index) => (
            <tr key={id}>
              <td>{content}</td>
              <td>{type}</td>
              <td>{originalId}</td>
              <td>
                <i className="edit-icon" onClick={() => handleEditClick(id)}>
                  <AiFillEdit />
                </i>
              </td>
              <td>
                <i className="delete-icon" onClick={() => deleteFact(id)}>
                  <AiFillDelete />
                </i>
              </td>
            </tr>
          ))}
          {emptyRows > 0 && (
            Array.from({ length: emptyRows }, (_, index) => (
              <tr key={`empty-${index}`}>
                <td colSpan="4"></td>
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
          <span className="first-last" onClick={() => paginate(Math.ceil(facts.length / factsPerPage))}><AiFillFastForward /></span>
        </div>
      </div>
    </div>
  );
};

export default Facts;
