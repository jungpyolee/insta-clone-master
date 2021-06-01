/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faUserCircle,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";

import {
  faCog,
  faExchangeAlt,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { Menu } from "antd";
import Avatar from "antd/lib/avatar/avatar";

function RightMenu(props) {
  const user = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    if (user.userData && user.userData.image) {
      setAvatar(user.userData.image);
    }
  }, [user]);
  const [open, setOpen] = useState(false);

  const onToggle = () => {
    setOpen(!open);
  };
  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/loginpage");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  return (
    <div style={{ position: "relative", width: "220px" }}>
      <div
        style={{
          marginTop: "13px",
          display: "flex",
        }}
      >
        <Link to="/">
          <FontAwesomeIcon
            style={{ marginLeft: "23px", marginRight: "10px" }}
            icon="home"
            size="2x"
            color="black"
          />
        </Link>

        <a href="/direct/inbox">
          <FontAwesomeIcon
            style={{ marginRight: "10px" }}
            icon={faComments}
            size="2x"
            color="black"
          />
        </a>
        <Link to="/upload">
          <FontAwesomeIcon
            style={{ marginRight: "10px" }}
            icon={faUpload}
            size="2x"
            color="black"
          />
        </Link>
        <FontAwesomeIcon
          style={{ marginRight: "10px" }}
          icon="heart"
          size="2x"
          color="black"
        />

        <div style={{ cursor: "pointer" }} onClick={onToggle}>
          <Avatar src={avatar} />
        </div>
      </div>
      {open && (
        <div>
          <div
            style={{
              width: 15,
              height: 15,
              transform: "rotate(45deg)",

              position: "absolute",
              right: "15px",
              marginTop: "3px",
              zIndex: "2",
              background: "#ffffff",
              boxShadow: "1px 3px 19px 5px rgba(242,242,242,1)",
              border: "1px solid #dbdbdb",
            }}
          ></div>
          <Menu
            mode="inline"
            style={{
              width: 200,
              float: "right",
              marginTop: "10px",
              boxShadow: "1px 3px 19px 5px rgba(242,242,242,1)",
              borderRadius: "4px",
              position: "relative",
              zIndex: "99",
            }}
          >
            <Menu.Item key="1" onClick={onToggle}>
              <Link to={`/user/${user.userData._id}`}>
                <FontAwesomeIcon
                  style={{ marginRight: "5px" }}
                  icon={faUserCircle}
                />
                프로필
              </Link>
            </Menu.Item>

            <Menu.Item key="2">
              <a href="/bookmark">
                <FontAwesomeIcon
                  style={{ marginRight: "5px" }}
                  icon={faBookmark}
                />
                저장됨
              </a>
            </Menu.Item>
            <Menu.Item key="3" onClick={onToggle}>
              <Link to="/setting">
                <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faCog} />
                설정{" "}
              </Link>
            </Menu.Item>

            <Menu.Item key="4" style={{ borderBottom: "1px solid black" }}>
              <a href="/exchange">
                <FontAwesomeIcon
                  style={{ marginRight: "5px" }}
                  icon={faExchangeAlt}
                />
                계정 전환
              </a>
            </Menu.Item>

            <Menu.Item key="5">
              <a onClick={logoutHandler}>로그아웃</a>
            </Menu.Item>
          </Menu>
        </div>
      )}

      {/* <div>{user.userData.image}</div> */}
    </div>
  );
}

export default withRouter(RightMenu);
