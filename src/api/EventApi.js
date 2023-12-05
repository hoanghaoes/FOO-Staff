import axios from "axios";
import useAuth from "./useAuth";

const useEventApi = () => {
 const { isAuthenticated, token } = useAuth();

 if (!isAuthenticated) {
    throw new Error("User is not authenticated. Please log in.");
 }

 const fetchData = async (url) => {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    return response.data;
 };

 const sendData = async (url, method, data) => {
    const response = await axios({
      url,
      method,
      data,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    return response.data;
 };

 return {
    getEvent: () => fetchData("http://35.198.240.131:8081/api/v1/events"),
    addEvent: (newEvent) => sendData("http://35.198.240.131:8081/api/v1/events", "POST", newEvent),
    editEvent: (id, updatedEvent) => sendData(`http://35.198.240.131:8081/api/v1/events/${id}`, "PUT", updatedEvent),
    deleteEvent: (id) => axios.delete(`http://35.198.240.131:8081/api/v1/events/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }),
 };
};

export default useEventApi;