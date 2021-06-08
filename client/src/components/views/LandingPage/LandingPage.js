import React, { useState } from "react";
import Follow from "../../../_utils/Follow/Follow";
// import { useSelector } from "react-redux";

// import Footer from "../Footer/Footer";
import LandingPagePost from "./LandingPageDetail/LandingPagePost";
import SideBar from "./LandingPageDetail/SideBar";

// import NavBar from "../NavBar/NavBar";
// import UserPage from "../UserPage/UserPage";

function LandingPage(props) {
  const [myFollowingIds, setMyFollowingIds] = useState([]);
  const refreshMyFollowing = (ids) => {
    setMyFollowingIds(ids);
  };

  return (
    <div style={{ paddingTop: 30, display: "flex" }}>
      <LandingPagePost refreshMyFollowing={refreshMyFollowing} />
      {myFollowingIds && <SideBar myFollowingIds={myFollowingIds} />}

      <br />
    </div>
  );
}

export default LandingPage;
