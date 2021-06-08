/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import NotifyMe from "react-notification-timeline";
import NotifyMe from "./Notification/NotifyMe";
import {
  faComments,
  faUserCircle,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import "./RightMenu.css";
import {
  faCog,
  faExchangeAlt,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { Menu } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { HomeOutlined, UploadOutlined } from "@ant-design/icons";

function RightMenu(props) {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState([]);

  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    let body = {
      myId: user.userData._id,
    };
    // user.userData._id 의 notification 정보가져와서 setData에 넣어주기
    axios
      .get("/api/notification/getNotify", { params: body })
      .then((response) => {
        if (response.data.success) {
          setData(
            response.data.commentNotify.map((notify) => {
              if (notify.userId._id === notify.myId) {
                return null;
              } else {
                return {
                  update: `${notify.userId.nickname}님이 댓글을 남겼습니다.`,
                  timestamp: Number(new Date(notify.createdAt)),
                  image: notify.userId.image,
                  postId: notify.postId,
                };
              }
            })
          );
        } else {
          alert("Fail to getNotify");
        }
      });

    if (user.userData && user.userData.image) {
      setAvatar(user.userData.image);
    }
  }, []);
  const [open, setOpen] = useState(false);

  console.log(data);
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
          <div className="rightIcon">
            <HomeOutlined style={{ color: "black", fontSize: "25px" }} />
          </div>
        </Link>

        <Link to="/upload">
          <div className="rightIcon">
            <UploadOutlined style={{ color: "black", fontSize: "25px" }} />
          </div>
        </Link>
        <NotifyMe
          data={data}
          storageKey="notific_key"
          notific_key="timestamp"
          notific_value="update"
          notific_img="image"
          heading=" "
          sortedByKey={false}
          showDate={false}
          size={25}
        />

        <div className="Icon" onClick={onToggle}>
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
              right: "14px",
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
                  style={{ marginRight: "10px" }}
                  icon={faUserCircle}
                />
                프로필
              </Link>
            </Menu.Item>

            <Menu.Item key="2">
              <a href="/bookmark">
                <FontAwesomeIcon
                  style={{ marginRight: "10px" }}
                  icon={faBookmark}
                />
                저장됨
              </a>
            </Menu.Item>
            <Menu.Item key="3" onClick={onToggle}>
              <Link to="/setting">
                <FontAwesomeIcon style={{ marginRight: "10px" }} icon={faCog} />
                설정{" "}
              </Link>
            </Menu.Item>

            <Menu.Item key="4" style={{ borderBottom: "1px solid black" }}>
              <a href="/exchange">
                <FontAwesomeIcon
                  style={{ marginRight: "10px" }}
                  icon={faExchangeAlt}
                />
                계정 전환
              </a>
            </Menu.Item>

            <Menu.Item key="5">
              <a style={{ paddingLeft: 40 }} onClick={logoutHandler}>
                로그아웃
              </a>
            </Menu.Item>
          </Menu>
        </div>
      )}

      {/* <div>{user.userData.image}</div> */}
    </div>
  );
}

export default withRouter(RightMenu);
