import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./routes/login";
import Question from "./routes/Question";
import AddQuestion from "./routes/addQuestion";
import Mysterys from "./routes/Mystery";
import Event from "./routes/Event";
import AddMystery from "./routes/addMystery";
import EditQuestion from "./routes/updateQuestion";
import Artifact from "./routes/Artifact";
import "./App.css";
import AddEvent from "./routes/addEvent";
import HomeScreen from "./routes/Home";
import Locations from "./routes/Location";
import AddLocation from "./routes/addLocations";
import AddAnswer from "./routes/addAnswer";
import UpdateLocation from "./routes/updateLocation";

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
                    <Route path="/home" element={<HomeScreen />} />
                    <Route path="/question" element={<Question />} />
                    <Route path="/mystery" element={<Mysterys />} />
                    <Route path="/artifact" element={<Artifact />} />
                    <Route path="/event" element={<Event />} />
                    <Route path="/locations" element={<Locations />} />
                    <Route path="/add-question" element={<AddQuestion />} />
                    <Route path="/add-answer" element={<AddAnswer />} />
                    <Route path="/add-mystery" element={<AddMystery />} />
                    <Route path="/add-event" element={<AddEvent />} />
                    <Route path="/add-location" element={<AddLocation />} />   
                    <Route
                      path="/update-question/:id"
                      element={<EditQuestion />}
                    />
                    <Route
                      path="/update-location/:id"
                      element={<UpdateLocation />}
                    />
                    {/* <Route
                      path="/update-artifact/:id?"
                      element={<updateQuestion />}
                    />
                    <Route
                      path="/update-event/:id?"
                      element={<updateQuestion />}
                    /> */}
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
