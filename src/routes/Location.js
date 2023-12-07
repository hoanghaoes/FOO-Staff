import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Location.css";
import { AiFillEdit, AiFillDelete, AiOutlineCopy, AiFillExclamationCircle, AiFillFileAdd, AiFillFastBackward, AiFillFastForward, AiFillBackward, AiFillForward } from "react-icons/ai";

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [locationsPerPage, setLocationsPerPage] = useState(5);
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const fetchLocations = async () => {
    try {
      const locationsResponse = await axios.get("http://35.198.240.131:8081/api/v1/locations", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const updatedLocations = locationsResponse.data.map((location) => {
        const imageUrl = `data:${location.image.contentType};base64,${location.image.data}`;
        return { ...location, imageUrl };
      });

      setLocations(updatedLocations);
    } catch (error) {
      console.error('Failed to fetch locations:', error.message);
    }
  };

  useEffect(() => {
    fetchLocations();

    // Cleanup function
    return () => {
      locations.forEach(q => q.imageUrl && URL.revokeObjectURL(q.imageUrl));
    };
  }, []);

  const copyToClipboard = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  const indexOfLastLocation = currentPage * locationsPerPage;
  const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
  const currentLocations = locations.slice(indexOfFirstLocation, indexOfLastLocation);

  const deleteLocation = async (id) => {
    await axios.delete(`http://35.198.240.131:8081/api/v1/locations/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    fetchLocations();
  };

  // const handleDeleteClick = (id) => {

  // };

  const handleEditClick = (id) => {
    // Navigate to UpdateLocation component
    navigate(`/update-location/${id}`);
  };

  const paginate = (pageNumber) => {
    const totalPages = Math.ceil(locations.length / locationsPerPage);
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  const emptyRows = locationsPerPage - currentLocations.length;

  return (
    <div className="locations-map">
      <Link to={"/add-location"}>
        <button
          className="add-button"
          onClick={() => navigate('/add-location')}
        >
          Add
          <AiFillFileAdd className="add-icon" />
        </button>
      </Link>
      <table className="locations-table">
        <thead>
          <tr>
            <th className="id-column">ID</th>
            <th className="image-column">Name</th>
            <th className="locations-column">Address</th>
            <th className="point-column">Latitude</th>
            <th className="correctAns-column">Longitude</th>
            <th className="des-column">Image</th>
            <th className="">Description</th>
            <th className="">Fact</th>
            <th className="action-column"></th>
            <th className="action-column"></th>
          </tr>
        </thead>
        <tbody>
          {currentLocations.map(({ id, name, nameInMap, latitude, longitude, description, artifacts, imageUrl, fact}, index) => (
            <React.Fragment key={id}>
              <tr>
                <td>
                  <span
                    className="copy-icon"
                    onClick={() => copyToClipboard(id)}
                  >
                    <AiOutlineCopy />
                  </span>
                </td>
                <td>{name}</td>
                <td>{nameInMap}</td>
                <td>{latitude}</td>
                <td>{longitude}</td>
                <td>
                {imageUrl && (
                    <img
                      className="location-image"
                      src={imageUrl}
                      alt={`Location ${index + 1}`}
                      width={"150px"}
                      height={"auto"}
                    />
                  )}
                </td>
                <td>{description}</td>
                <td>{fact}</td>
                <td>
                  <i className="edit-icon" onClick={() => handleEditClick(id)}>
                    <AiFillEdit />
                  </i>
                </td>
                <td>
                  <i className="delete-icon" onClick={() => deleteLocation(id)}>
                    <AiFillDelete />
                  </i>
                </td>
              </tr>
              {index < currentLocations.length - 1 && <tr key={`separator-${id}`}><td colSpan="8"></td></tr>}
            </React.Fragment>
          ))}
          {emptyRows > 0 && (
            Array.from({ length: emptyRows }, (_, index) => (
              <tr key={`empty-${index}`}>
                <td colSpan="8"></td>
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
          <span className="first-last" onClick={() => paginate(Math.ceil(locations.length / locationsPerPage))}><AiFillFastForward /></span>
        </div>
      </div>
    </div>
  );
};

export default Locations;
