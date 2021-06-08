import Avatar from "antd/lib/avatar/avatar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Follow from "../../../../_utils/Follow/Follow";
import Skeleton from "react-loading-skeleton";

function SideBar(props) {
  const user = useSelector((state) => state.user);
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const myFollowingIds = props.myFollowingIds;
  const [recommend, setRecommend] = useState([]);
  const [loading, setLoading] = useState(true);
  const refreshFollower = (newFollower) => {
    setFollower(newFollower);
  };

  const refreshFollowing = (newFollowing) => {
    setFollowing(newFollowing);
  };

  useEffect(() => {
    getRecommend(myFollowingIds);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [myFollowingIds]);

  const getRecommend = (ids) => {
    let body = { myFollowingIds: ids };
    axios.post("/api/users/getRecommend", body).then((response) => {
      if (response.data.success) {
        setRecommend(response.data.user);
      } else {
        alert("추천유저가져오기실패");
      }
    });
  };
  return (
    <div>
      {loading && <Skeleton />}
      {!loading && (
        <div
          style={{
            width: 325,
            height: 291,
            padding: 16,
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
              }}
            >
              <div style={{ color: "gray", fontWeight: 700, marginLeft: 1 }}>
                회원님을 위한 추천
              </div>{" "}
              <hr />
              {recommend.map((user, index) => (
                <div
                  style={{
                    height: 40,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  key={index}
                >
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: 10 }}>
                      <Avatar src={user.image} />
                    </div>
                    <div style={{ marginTop: 4 }}>{user.nickname}</div>
                  </div>
                  <div style={{}}>
                    <Follow
                      refreshFollower={refreshFollower}
                      refreshFollowing={refreshFollowing}
                      userId={user._id}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div>
                <div />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
