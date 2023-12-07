import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./routes/login";
import Question from "./routes/Question";
import AddQuestion from "./routes/addQuestion";
import Mysterys from "./routes/Mystery";
import Event from "./routes/Event";
import AddMystery from "./routes/addMystery";
import UpdateQuestion from "./routes/updateQuestion";
import "./App.css";
import AddEvent from "./routes/addEvent";
import Locations from "./routes/Location";
import AddLocation from "./routes/addLocations";
import AddAnswer from "./routes/addAnswer";
import UpdateLocation from "./routes/updateLocation";
import Artifacts from "./routes/Artifact";
import AddArtifact from "./routes/addArtifact";

const AppLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

const App = () => (
  <Router>
    <Routes>
      <Route
        path="/*"
        element={
          <Routes>
            {/* Route for LoginForm without AppLayout */}
            <Route index element={<LoginForm />} />

            {/* Routes with AppLayout (Navbar will be displayed) */}
            <Route
              path="/*"
              element={
                <AppLayout>
                  <Routes>
                    <Route path="/question" element={<Question />} />
                    <Route path="/mystery" element={<Mysterys />} />
                    <Route path="/event" element={<Event />} />
                    <Route path="/locations" element={<Locations />} />
                    <Route path="/artifacts" element={<Artifacts />} />
                    <Route path="/add-question" element={<AddQuestion />} />
                    <Route path="/add-answer" element={<AddAnswer />} />
                    <Route path="/add-mystery" element={<AddMystery />} />
                    <Route path="/add-event" element={<AddEvent />} />
                    <Route path="/add-location" element={<AddLocation />} /> 
                    <Route path="/add-artifact" element={<AddArtifact />} />
                    <Route
                      path="/update-question/:id"
                      element={<UpdateQuestion />}
                    />
                    <Route
                      path="/update-location/:id"
                      element={<UpdateLocation />}
                    />
                  </Routes>
                </AppLayout>
              }
            />
          </Routes>
        }
      />
    </Routes>
  </Router>
);

export default App;
