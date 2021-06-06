import React, { useState } from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { Drawer, Button } from "antd";
import "./Sections/Navbar.css";
// import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
function NavBar(props) {
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.user);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div style={{ position: "relative" }}>
      {user?.userData?.isAuth ? (
        <div
        // style={{
        //   position: "fixed",
        //   width: "100%",
        //   top: 0,
        //   right: 0,
        //   left: 0,
        //   height: 54,
        //   borderBottom: "1px solid #dbdbdb",
        // }}
        >
          <nav
            className="menu"
            style={{
              position: "fixed",
              width: "975px",
              top: 0,
              right: 0,
              left: 0,
              height: "54px",
              margin: "0 auto",
              borderBottom: "1px solid #dbdbdb",
              zIndex: 2,
            }}
          >
            <div className="menu__logo">
              <Link to="/">
                <FontAwesomeIcon
                  icon={["fab", "instagram"]}
                  size="2x"
                  color="purple"
                />
              </Link>
            </div>
            <div className="menu__container">
              <div className="menu_left">
                <LeftMenu mode="horizontal" />
              </div>
              <div className="menu_rigth">
                <RightMenu mode="horizontal" />
              </div>
              <Button
                className="menu__mobile-button"
                type="primary"
                onClick={showDrawer}
              >
                {/* <Icon type="align-right" /> */}
              </Button>
              <Drawer
                title="Basic Drawer"
                placement="right"
                className="menu_drawer"
                closable={false}
                onClose={onClose}
                visible={visible}
              >
                <LeftMenu mode="inline" />
                <RightMenu mode="inline" />
              </Drawer>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
export default withRouter(NavBar);
