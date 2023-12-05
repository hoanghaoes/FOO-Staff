import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./routes/login";
import Question from "./routes/Question";
import AddQuestion from "./routes/addQuestion";
import Mysterys from "./routes/Mystery";
import Event from "./routes/Event";
import AddMystery from "./routes/addMystery";
import updateQuestion from "./routes/updateQuestion";
import Artifact from "./routes/Artifact";
import "./App.css";
import AddEvent from "./routes/addEvent";
import HomeScreen from "./routes/Home";
import QuestionDetail from "./routes/QuestionDetail";
import Locations from "./routes/Location";
import AddLocation from "./routes/addLocations";

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
                    <Route path="/add-mystery" element={<AddMystery />} />
                    <Route path="/add-event" element={<AddEvent />} />
                    <Route path="/add-location" element={<AddLocation />} />                   
                    <Route
                      path="/question/update-question/:id?"
                      element={<updateQuestion />}
                    />
                    <Route
                      path="/question/question-detail/:id?"
                      element={<QuestionDetail />}
                    />
                    <Route
                      path="/fact/update-fact/:id?"
                      element={<updateQuestion />}
                    />
                    <Route
                      path="/artifact/update-artifact/:id?"
                      element={<updateQuestion />}
                    />
                    <Route
                      path="/event/update-event/:id?"
                      element={<updateQuestion />}
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
