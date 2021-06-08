import Avatar from "antd/lib/avatar/avatar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SideBar(props) {
  const user = useSelector((state) => state.user);
  const myFollowingIds = props.myFollowingIds;
  const [recommend, setRecommend] = useState([]);

  console.log(myFollowingIds);
  useEffect(() => {
    let body = { myFollowingIds: myFollowingIds };
    axios.post("/api/user/getRecommend", body).then((response) => {
      if (response.data.success) {
        setRecommend(response.data.user);
      } else {
        alert("추천유저가져오기실패");
      }
    });
  }, [myFollowingIds]);

  console.log(recommend);
  return (
    <div
      style={{
        width: 325,
        height: 291,
        padding: 16,
        background: "orange",
        position: "fixed",
        top: 110,
        right: 470,
      }}
    >
      <div style={{ display: "flex", height: 60 }}>
        {/* 유저 정보 */}
        <div>
          <Avatar
            src={user.userData?.image}
            style={{ width: 56, height: 56, border: "1px solid lightgray" }}
          />
        </div>
        <div>
          <div style={{ marginLeft: 10, marginTop: 10 }}>
            <p>
              <b style={{ fontSize: "1.2rem" }}>
                <Link to="/" style={{ color: "black" }}>
                  {user.userData?.nickname}
                </Link>
              </b>
              님 환영합니다
            </p>
          </div>
        </div>
      </div>
      <div>
        {/* 유저 추천 */}
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontWeight: 700, marginLeft: 1 }}>
            회원님을 위한 추천
          </div>{" "}
          <hr />
        </div>
        <div>
          <div>
            프사 닉넴 팔로우<div></div>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
