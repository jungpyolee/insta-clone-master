import { CloseOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FollowforLike from "./Follow/FollowforLike";

function FollowerDetail(props) {
  const [open, setOpen] = useState(true);

  const followerDetail = props.followerDetail;

  const renderFollowerDetail = followerDetail?.map((follower, index) => {
    return (
      <div style={{ display: "flex", height: 60 }} key={index}>
        {" "}
        <div
          style={{
            width: 60,
            height: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to={`/user/${follower.userId._id}`}>
            <Avatar
              style={{ width: 44, height: 44 }}
              src={follower.userId.image}
            ></Avatar>
          </Link>
        </div>
        <div
          style={{
            marginLeft: 7,
            fontSize: "1rem",
            lineHeight: 1.2,
            width: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link style={{ color: "black" }} to={`/user/${follower.userId._id}`}>
            <b>{follower.userId.nickname}</b>
            <br />
          </Link>

          <FollowforLike userId={follower.userId._id} />
        </div>
      </div>
    );
  });

  return (
    <div>
      {open && (
        <div>
          <div
            style={{
              position: "fixed",
              zIndex: 11,
              top: 270,
              left: 770,

              width: 400,
              height: 400,
              backgroundColor: "white",
              borderRadius: 12,
            }}
          >
            <div
              style={{
                height: 42,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: "1px solid black",
                position: "relative",
              }}
            >
              <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>팔로워</div>
              <div
                style={{
                  fontSize: "1.4rem",
                  position: "absolute",
                  right: 20,
                  top: -2,
                }}
              >
                <CloseOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setOpen(!open);
                    props.openHandler();
                  }}
                />
              </div>
            </div>
            <div>{renderFollowerDetail}</div>
          </div>
        </div>
      )}{" "}
    </div>
  );
}

export default FollowerDetail;
