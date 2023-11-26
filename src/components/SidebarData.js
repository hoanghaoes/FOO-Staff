import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Question",
    path: "/",
    icon: <FaIcons.FaBook />,
    cName: "nav-text",
  },
  {
    title: "Fact",
    path: "/fact",
    icon: <AiIcons.AiFillCheckCircle />,
    cName: "nav-text",
  },
  {
    title: "Artifact",
    path: "/artifact",
    icon: <AiIcons.AiFillGift />,
    cName: "nav-text",
  },
  {
    title: "Event",
    path: "/event",
    icon: <IoIcons.IoIosCalendar />,
    cName: "nav-text",
  },
];
