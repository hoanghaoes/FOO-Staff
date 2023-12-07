import React from "react";
import { useNavigate } from "react-router";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
   // { title: "Home", path: "/home", icon: <AiIcons.AiFillHome /> },
   {
      title: "Question",
      path: "/question",
      icon: <FaIcons.FaBook />,
      cName: "nav-text",
   },
   {
      title: "Mystery",
      path: "/mystery",
      icon: <AiIcons.AiFillSecurityScan />,
      cName: "nav-text",
   },
   {
      title: "Location",
      path: "/locations",
      icon: <FaIcons.FaLocationArrow />,
      cName: "nav-text",
   },
   {
      title: "Event",
      path: "/event",
      icon: <IoIcons.IoIosCalendar />,
      cName: "nav-text",
   },
   {
      title: "Artifact",
      path: "/artifacts",
      icon: <FaIcons.FaBox />,
      cName: "nav-text",
   },
   {
      title: "Log out",
      path: "/",
      icon: <AiIcons.AiOutlineLogout />,
      cName: "nav-text",
   },
];
