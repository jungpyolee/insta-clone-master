import React from "react";
// import { useSelector } from "react-redux";

// import Footer from "../Footer/Footer";
import LandingPagePost from "./LandingPageDetail.js/LandingPagePost";
import SideBar from "./LandingPageDetail.js/SideBar";
// import NavBar from "../NavBar/NavBar";
// import UserPage from "../UserPage/UserPage";

function LandingPage(props) {
  // const user = useSelector((state) => state.user);

  return (
    <div style={{ display: "flex", paddingTop: 30 }}>
      <LandingPagePost />
      <SideBar />;
    </div>
  );
}

export default LandingPage;
