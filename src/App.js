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
          <AppLayout>
            <Routes>
              <Route index element={<LoginForm />} />
              <Route path="/home" element={<HomeScreen/>}></Route>
              <Route path="/question" element={<Question />} />
              <Route path="/mystery" element={<Mysterys />} />
              <Route path="/artifact" element={<Artifact />} />
              <Route path="/event" element={<Event />} />
              <Route path="/add-question" element={<AddQuestion />} />
              <Route path="/add-mystery" element={<AddMystery/>}></Route>
              <Route path="/add-event" element={<AddEvent />} />
              <Route path="/question/update-question/:id?" element={<updateQuestion />} />
              <Route path="/fact/update-fact/:id?" element={<updateQuestion />} />
              <Route path="/artifact/update-artifact/:id?" element={<updateQuestion />} />
              <Route path="/event/update-event/:id?" element={<updateQuestion />} />
            </Routes>
          </AppLayout>
        }
      />
    </Routes>
  </Router>
);


export default App;
