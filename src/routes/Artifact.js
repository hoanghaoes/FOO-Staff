import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

const Artifacts = (id) => {
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {locationId} = useParams(id);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get(`http://35.198.240.131:8081/api/v1/locations/${locationId}/artifacts`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }

        setLocationData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch location data:', error.message);
        setLoading(false);
      }
    };

    fetchLocationData();
  }, [locationId]);

  return (
    <div className="artifacts-container">
      {loading && <p>Loading artifacts...</p>}
      {locationData && (
        <div>
          <h2>Artifacts for {locationData.name}</h2>
          <table className="artifacts-table">
            <thead>
              <tr>
                <th>Artifact Name</th>
                <th>Time</th>
                <th>Description</th>
                {/* Add other artifact properties here */}
              </tr>
            </thead>
            <tbody>
              {locationData.artifacts.map((artifact) => (
                <tr key={artifact.id}>
                  <td>{artifact.name}</td>
                  <td>{artifact.time}</td>
                  <td>{artifact.description}</td>
                  {/* Add other artifact properties here */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Artifacts;
