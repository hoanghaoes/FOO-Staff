import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, Link, Outlet, createRoutesFromElements } from "react-router-dom";
import Question from "./routes/Question";
import Navbar from "./components/Navbar";
import Questions from "./routes/Question";
import AddQuestion from "./routes/addQuestion";
import Facts from "./routes/Fact";
import Event from "./routes/Event";
import updateQuestion from "./routes/updateQuestion";
import Artifact from "./routes/Artifact";
import "./App.css"

const AppLayout = () => (
 <>
    <Navbar />
    <Outlet />
 </>
);

const router = createBrowserRouter([
 {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Question />,
      },
      {
        path: "fact",
        element: <Facts />,
      },
      {
        path: "artifact",
        element: <Artifact />,
      },
      {
        path: "event",
        element: <Event />,
      },
      {
        path: "add-question",
        element: <AddQuestion />,
      },
      {
        path: "update-question",
        element: <updateQuestion />,
      },
      {
        path: "add-fact",
        element: <updateQuestion />,
      },
      {
        path: "update-fact",
        element: <updateQuestion />,
      },
      {
        path: "add-artifact",
        element: <updateQuestion />,
      },
      {
        path: "update-artifact",
        element: <updateQuestion />,
      },
      {
        path: "add-event",
        element: <updateQuestion />,
      },
      {
        path: "update-event",
        element: <updateQuestion />,
      },
    ],
 },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);