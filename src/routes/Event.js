import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Event.css";
import { AiFillEdit, AiFillDelete, AiFillExclamationCircle, AiFillFileAdd, AiFillFastBackward, AiFillFastForward, AiFillBackward, AiFillForward } from "react-icons/ai";
// import AddEvent from "./addEvents";
// import EventDetail from "./EventDetail";
// import UpdateEvent from "./updateEvent";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage, setEventsPerPage] = useState(5);
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    const fetchEvents = async () => {
        try {
            const eventsResponse = await axios.get("http://35.198.240.131:8081/api/v1/events", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            const updatedEvents = eventsResponse.data.map((event) => {
                const imageUrl = `data:${event.image.contentType};base64,${event.image.data}`;
                return { ...event, imageUrl };
            });

            setEvents(updatedEvents);
        } catch (error) {
            console.error('Failed to fetch events:', error.message);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const deleteEvent = async (id) => {
        await axios.delete(`http://35.198.240.131:8081/api/v1/events/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        fetchEvents();
    };

    const handleInfoClick = (id) => {
        // Navigate to EventDetail component
        navigate(`/event-detail/${id}`);
    };

    const handleEditClick = (id) => {
        // Navigate to UpdateEvent component
        navigate(`/update-event/${id}`);
    };

    const paginate = (pageNumber) => {
        const totalPages = Math.ceil(events.length / eventsPerPage);
        setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
    };

    const emptyRows = eventsPerPage - currentEvents.length;

    return (
        <div className="events-map">
            <Link to={"/add-event"}>
                <button
                    className="add-button"
                    onClick={() => navigate('/add-event')}
                >
                    <span>Add</span>
                    <AiFillFileAdd className="add-icon" />
                </button>
            </Link>
            <table className="events-table">
                <thead>
                    <tr>
                        <th className="event-column">Event</th>
                        <th className="time-column">Time</th>
                        <th className="address-column">Adress</th>
                        <th className="image-column">Image</th>
                        <th className="action-column"></th>
                        <th className="action-column"></th>
                        <th className="action-column"></th>
                    </tr>
                </thead>
                <tbody>
                    {currentEvents.map(({ id, eventName, time, address, imageUrl }, index) => (
                        <tr key={id}>
                            <td>{eventName}</td>
                            <td>{time}</td>
                            <td>{address}</td>
                            <td>
                                <img className="event-image" src={imageUrl} alt={`Event ${index + 1}`} width={"200px"} height={"auto"} />
                            </td>
                            <td>
                                <i className="info-icon" onClick={() => handleInfoClick(id)}>
                                    <AiFillExclamationCircle />
                                </i>
                            </td>
                            <td>
                                <i className="edit-icon" onClick={() => handleEditClick(id)}>
                                    <AiFillEdit />
                                </i>
                            </td>
                            <td>
                                <i className="delete-icon" onClick={() => deleteEvent(id)}>
                                    <AiFillDelete />
                                </i>
                            </td>
                        </tr>
                    ))}
                    {emptyRows > 0 && (
                        Array.from({ length: emptyRows }, (_, index) => (
                            <tr key={`empty-${index}`}>
                                <td colSpan="7"></td>
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
                    <span className="first-last" onClick={() => paginate(Math.ceil(events.length / eventsPerPage))}><AiFillFastForward /></span>
                </div>
            </div>
        </div>
    );
};

export default Events;
