import React, { useState } from "react";

// import { useSelector } from "react-redux";

// import Footer from "../Footer/Footer";
import LandingPagePost from "./LandingPageDetail/LandingPagePost";

// import NavBar from "../NavBar/NavBar";
// import UserPage from "../UserPage/UserPage";

function LandingPage(props) {
  return (
    <div style={{ paddingTop: 30, display: "flex" }}>
      <LandingPagePost />
    </div>
  );
}

export default LandingPage;
