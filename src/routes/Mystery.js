// Import thêm một số thư viện và icon cần thiết
import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Mystery.css";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { AiFillExclamationCircle, AiFillFileAdd, AiFillFastBackward, AiFillFastForward, AiFillBackward, AiFillForward } from "react-icons/ai";

const Mystery = () => {
  const [mystery, setMystery] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [MysteryPerPage, setMysteryPerPage] = useState(15);
  const accessToken = localStorage.getItem('accessToken');

  const fetchMystery = async () => {
    try {
      const response = await fetch("http://35.198.240.131:8081/api/v1/mystery_item", {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching');
      }

      const mysteryData = await response.json();

      // Convert binary image data to data URL
      const updatedMystery = mysteryData.map(m => ({
        ...m,
        imageUrl: m.image ? URL.createObjectURL(new Blob([Uint8Array.from(atob(m.image), c => c.charCodeAt(0))], { type: 'image/jpeg' })) : null,
      }));

      setMystery(updatedMystery);
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
        Authorization: `Bearer ${accessToken}`,
      }
    };

    try {
      await fetch(`http://35.198.240.131:8081/api/v1/mystery_item/${id}`, requestOptions);
      fetchMystery();
    } catch (error) {
      console.error("Error in deleteQuestion: ", error);
    }
  };

  const paginate = (pageNumber) => {
    const totalPages = Math.ceil(mystery.length / MysteryPerPage);
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  const navigate = useNavigate();

  return (
    <div className="mystery-map">
      <button className="add-button" onClick={() => navigate('/add-mystery')}>Add <AiFillFileAdd /></button>
      <table className="mystery-table">
        <thead>
          <tr>
            <th className="image-column">Image</th>
            <th className="name-column">Name</th>
            <th className="locationId-column">Location ID</th>
            <th className="point-column">Point</th>
            <th className="des-column">Description</th>
            <th className="action-column"></th>
            <th className="action-column"></th>
          </tr>
        </thead>
        <tbody>
          {currentMystery.map(({ imageUrl, name, description, point, locationId, id }, index) => (
            <tr key={id}>
              <td>
                {imageUrl && (
                  <img
                    className="mystery-image"
                    src={imageUrl}
                    alt={`Mystery ${index + 1}`}
                  />
                )}
              </td>
              <td>{name}</td>
              <td>{locationId}</td>
              <td>{point}</td>
              <td>{description}</td>
              <td>
                <i className="edit-icon"><AiFillEdit /></i>
              </td>
              <td>
                <i className="delete-icon" onClick={() => deleteMystery(id)}><AiFillDelete /></i>
              </td>
            </tr>
          ))}
          {MysteryPerPage > currentMystery.length && (
            Array.from({ length: MysteryPerPage - currentMystery.length }, (_, index) => (
              <tr key={`empty-${index}`}>
                <td></td>
                <td></td>
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
