import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Mystery.css";
import { AiFillEdit, AiFillDelete, AiFillFileAdd, AiFillFastBackward, AiFillFastForward, AiFillBackward, AiFillForward } from "react-icons/ai";

const Mystery = () => {
  const [mystery, setMystery] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mysteryPerPage, setMysteryPerPage] = useState(15);
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

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

      // Convert binary image data to data URL and revoke existing URLs
      const updatedMystery = mysteryData.map(m => {
        if (m.foundImage) {
          const foundImageUrl = `data:${m.foundImage.contentType};base64,${m.foundImage.data}`;
          const unfoundImageUrl = `data:${m.unfoundedImage.contentType};base64,${m.unfoundedImage.data}`;
          return { ...m, foundImageUrl, unfoundImageUrl };
        }
        return m;
      });

      setMystery(updatedMystery);
    } catch (error) {
      console.error('Failed to fetch', error);
    }
  };

  useEffect(() => {
    fetchMystery();

    // Cleanup function
    return () => {
      mystery.forEach(m => {
        m.foundImageUrl && URL.revokeObjectURL(m.foundImageUrl);
        m.unfoundImageUrl && URL.revokeObjectURL(m.unfoundImageUrl);
      });
    };
  }, []);

  const indexOfLastMystery = currentPage * mysteryPerPage;
  const indexOfFirstMystery = indexOfLastMystery - mysteryPerPage;
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
      console.error("Error in deleteMystery: ", error);
    }
  };

  const handleEditClick = (id) => {
    // Navigate to UpdateQuestion component
    navigate(`/update-mystery/${id}`);
  };

  const paginate = (pageNumber) => {
    const totalPages = Math.ceil(mystery.length / mysteryPerPage);
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  return (
    <div className="mystery-map">
      <button className="add-button" onClick={() => navigate('/add-mystery')}>Add <AiFillFileAdd /></button>
      <table className="mystery-table">
        <thead>
          <tr>
            <th className="mystery-column">Found Image</th>
            <th className="mystery-column">Unfounded Image</th>
            <th className="name-column">Name</th>
            <th className="locationId-column">Location ID</th>
            <th className="point-column">Point</th>
            <th className="des-column">Description</th>
            <th className="action-column"></th>
            <th className="action-column"></th>
          </tr>
        </thead>
        <tbody>
          {currentMystery.map(({ foundImageUrl, unfoundImageUrl, name, description, point, locationId, id }, index) => (
            <tr key={id}>
              <td>
                {foundImageUrl && (
                  <img
                    className="mystery-image"
                    src={foundImageUrl}
                    alt={`Found Image ${index + 1}`}
                    width={"100px"}
                    height={"auto"}
                  />
                )}
              </td>
              <td>
                {unfoundImageUrl && (
                  <img
                    className="mystery-image"
                    src={unfoundImageUrl}
                    alt={`Unfounded Image ${index + 1}`}
                    width={"100px"}
                    height={"auto"}
                  />
                )}
              </td>
              <td>{name}</td>
              <td>{locationId}</td>
              <td>{point}</td>
              <td>{description}</td>
              <td>
                <i className="edit-icon" onClick={() => handleEditClick(id)}><AiFillEdit /></i>
              </td>
              <td>
                <i className="delete-icon" onClick={() => deleteMystery(id)}><AiFillDelete /></i>
              </td>
            </tr>
          ))}
          {mysteryPerPage > currentMystery.length && (
            Array.from({ length: mysteryPerPage - currentMystery.length }, (_, index) => (
              <tr key={`empty-${index}`}>
                <td></td>
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
          <span className="first-last" onClick={() => paginate(Math.ceil(mystery.length / mysteryPerPage))}><AiFillFastForward /></span>
        </div>
      </div>
    </div>
  );
};

export default Mystery;
