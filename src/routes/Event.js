import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Event.css";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { AiFillExclamationCircle } from "react-icons/ai";
import { AiFillFileAdd } from "react-icons/ai";
import { AiFillFastBackward } from "react-icons/ai";
import { AiFillFastForward } from "react-icons/ai";
import { AiFillBackward } from "react-icons/ai";
import { AiFillForward } from "react-icons/ai";
// import AddQuestion from "./addQuestion";

const Event = () => {
 const [event, setEvent] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [EventPerPage, setEventPerPage] = useState(15);
 const yourAccessToken = "eyJhbGciOiJIUzM4NCJ9.eyJ1c2VyIjp7ImlkIjoiOWM4MmViMzQtODg3OS0xMWVlLWEyNDgtYjE5Y2RkOTdkM2U3IiwidXNlcm5hbWUiOiJob2FuZ2hhb2VzIiwiZGlzcGxheU5hbWUiOiJIb2FuZyBIYW8iLCJlbWFpbCI6ImhvYW5naGFvZXNAZ21haWwuY29tIn0sInN1YiI6ImhvYW5naGFvZXNAZ21haWwuY29tIiwiaWF0IjoxNzAwNTc2NjYxLCJleHAiOjE3MDA2NjMwNjF9.evRQUKJPrthSSVjmaTSEWu6PeHabImlcojiDkrLyxl3GBrGn1A-OXtyKIEIjeTM1";

 const fetchEvent = async () => {
  try {
     const response = await fetch("localhost:8081/api/v1/event", {
       method: 'GET',
       headers: {
         'Authorization': `Bearer ${yourAccessToken}`,
       },
     });
 
     if (!response.ok) {
       throw new Error('Error fetching questions');
     }
 
     const event = await response.json();
     setEvent(event);
  } catch (error) {
     console.error('Failed to fetch questions:', error);
  }
 };

 useEffect(() => {
    fetchEvent();
 }, []);

 const indexOfLastEvent = currentPage * EventPerPage;
 const indexOfFirstEvent = indexOfLastEvent - EventPerPage;
 const currentEvent = event.slice(indexOfFirstEvent, indexOfLastEvent);

 const deleteEvent = async (id) => {
  const requestOptions = {
     method: "DELETE",
     headers: {
       'Authorization': 'Beerer ' + yourAccessToken,
     }
  };
 
  try {
     await fetch(`localhost:8081/api/v1/quizzes/${id}`, requestOptions);
     fetchEvent();
  } catch (error) {
     console.error("Error in deleteQuestion: ", error);
  }
 };

 const paginate = (pageNumber) => {
  const totalPages = Math.ceil(event.length / EventPerPage);
  setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
 }; const emptyRows = EventPerPage - currentEvent.length;

 return (
    <div className="event-map">
      <Link to={"add-event"}>
        <button className="add-button">Add <AiFillFileAdd/></button>
      </Link>
      <table className="event-table">
        <thead>
          <tr>
            <th className="event-column">Event</th>
            <th className="time-column">Time</th>
            <th className="location-column">Location</th>
            <th className="poster-column">Image</th>
            <th className="action-column"></th>
            <th className="action-column"></th>
            <th className="action-column"></th>
          </tr>
        </thead>
        <tbody>
          {currentEvent.map(({ event,image, time,  id }, index) => (
            <tr>
              <td> {event.length > 40 ? `${event.slice(0, 40)}...` : event}</td>
              <td> {image.length > 25 ? `${image.slice(0, 25)}...` : image}</td>
              <td>{time}</td>
              <td>
                <i className="info-icon"><AiFillExclamationCircle /></i>
              </td>
              <td>
                <i className="edit-icon"><AiFillEdit /></i>
              </td>
              <td>
                <i className="delete-icon" onClick={() => deleteEvent(id)}><AiFillDelete /></i>
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
          <span className="first-last" onClick={() => paginate(Math.ceil(event.length / EventPerPage))}><AiFillFastForward /></span>
        </div>
      </div>
    </div>
 );
};

export default Event;