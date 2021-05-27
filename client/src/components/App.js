import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import Footer from "./views/Footer/Footer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faHome,
  faCompass,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
// pages for this product

import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import UserPage from "./views/UserPage/UserPage";
import UserSetting from "./views/UserPage/UserSetting";
// import { useSelector } from "react-redux";
// import { STATES } from "mongoose";
import NavBar from "./views/NavBar/NavBar";
// import { BlockOutlined } from "@ant-design/icons";
import UploadPage from "./views/UploadPage/UploadPage";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

library.add(fab, faHome, faCompass, faHeart, faStar);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div
        style={{
          width: "975px",
          margin: "0 auto",
          minHeight: "calc(100vh - 80px)",
          marginTop: 50,
        }}
      >
        <Switch>
          <Route exact path="/loginpage" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/" component={Auth(LandingPage, true)} />
          <Route exact path="/user/:id" component={Auth(UserPage, null)} />
          <Route exact path="/setting" component={Auth(UserSetting, true)} />
          <Route exact path="/upload" component={Auth(UploadPage, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}
export default App;
