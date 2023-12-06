import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Location.css";
import { AiFillEdit, AiFillDelete, AiFillExclamationCircle, AiFillFileAdd, AiFillFastBackward, AiFillFastForward, AiFillBackward, AiFillForward, AiOutlineCopy } from "react-icons/ai";

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
    }, []);

    const copyToClipboard = (text) => {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    };

    const indexOfLastQuestion = currentPage * locationsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - locationsPerPage;
    const currentLocations = locations.slice(indexOfFirstQuestion, indexOfLastQuestion);

    const deleteQuestion = async (id) => {
        await axios.delete(`http://35.198.240.131:8081/api/v1/locations/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        fetchLocations();
    };

    const handleEditClick = (id) => {
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
                    <span>Add</span>
                    <AiFillFileAdd className="add-icon" />
                </button>
            </Link>
            <table className="locations-table">
                <thead>
                    <tr>
                        <th className="name-column">Name</th>
                        <th className="namemap-column">Name in map</th>
                        <th className="id-column">ID
                        </th>
                        <th className="lati-column">Latitude</th>
                        <th className="longti-column">Longitude</th>
                        <th className="image-column">Image</th>
                        <th className="des-column">Description</th>
                        <th className="artifact-column">Artifact</th>
                        <th className="fact-column">Fact</th>
                        <th className="action-column"></th>
                        <th className="action-column"></th>
                    </tr>
                </thead>
                <tbody>
                    {currentLocations.map(({ id, name, nameInMap, latitude, longitude, imageUrl, description, artifact, fact }, index) => (
                        <tr key={id}>
                            <td>{name}</td>
                            <td>{nameInMap}</td>
                            <td>
                                <span
                                    className="copy-icon"
                                    onClick={() => copyToClipboard(id)}
                                >
                                    <AiOutlineCopy />
                                </span>
                            </td>
                            <td>{latitude}</td>
                            <td>{longitude}</td>
                            <td>
                                <img
                                    className="location-image"
                                    src={imageUrl}
                                    alt={`Location ${index + 1}`}
                                    width={"150px"}
                                    height={"auto"}
                                />
                            </td>
                            <td>{description}</td>
                            <td>
                                {/* <ul>
                                    {artifact.map(({ id: name }) => (
                                        <li key={id}>{name}</li>
                                    ))}
                                </ul> */}
                            </td>
                            <td>{fact}</td>
                            <td>
                                <i className="edit-icon" onClick={() => handleEditClick(id)}>
                                    <AiFillEdit />
                                </i>
                            </td>
                            <td>
                                <i className="delete-icon" onClick={() => deleteQuestion(id)}>
                                    <AiFillDelete />
                                </i>
                            </td>
                        </tr>
                    ))}
                    {emptyRows > 0 && (
                        Array.from({ length: emptyRows }, (_, index) => (
                            <tr key={`empty-${index}`}>
                                <td colSpan="11"></td>
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
