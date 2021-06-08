import React, { useEffect, useState } from "react";
import { Button, Col, Row, Card } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import axios from "axios";
import { Link } from "react-router-dom";
import Follow from "../../../_utils/Follow/Follow";
import "./UserPageStyle/UserPage.css";
import FollowerDetail from "../../../_utils/Follow/FollowerDetail";
import FollowingDetail from "../../../_utils/Follow/FollowingDetail";
function UserPage(props) {
  const [Photos, setPhotos] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(9);
  const [PostSize, setPostSize] = useState(0);
  const [postLength, setPostLength] = useState(0);
  const [userInfo, setUserInfo] = useState("");
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followerBox, setFollowerBox] = useState(false);
  const [followingBox, setFollowingBox] = useState(false);

  const onFollowerBox = () => {
    setFollowerBox(!followerBox);
  };

  const onFollowingBox = () => {
    setFollowingBox(!followingBox);
  };

  const userPageId = props.match.params.id;

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
      id: userPageId,
    };
    getUser(body);
    getPhotos(body);

    getPostLength(body);
  }, [userPageId]);

  const getUser = (body) => {
    axios.post("/api/users/getUser", body).then((response) => {
      if (response.data.success) {
        setUserInfo(response.data.userInfo);
      } else {
        alert("유저정보가져오기실패");
      }
    });
  };

  const getPhotos = (body) => {
    axios.get("/api/photo/photos", { params: body }).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setPhotos([...Photos, ...response.data.photoInfo]);
        } else {
          setPhotos(response.data.photoInfo);
        }

        setPostSize(response.data.postSize);
      } else {
        alert("사진을 가져오는데 실패했습니다.");
      }
    });
  };

  const getPostLength = (body) => {
    axios.post("/api/photo/postLength", body).then((response) => {
      if (response.data.success) {
        setPostLength(response.data.postLength);
      } else {
        alert("게시물수 조회 실패");
      }
    });
  };
  const loadMoreHandler = () => {
    let skip = Skip + Limit;
    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
      id: userPageId,
    };
    getPhotos(body);
    setSkip(skip);
  };

  const refreshFollower = (newFollower) => {
    setFollower(newFollower);
  };

  const refreshFollowing = (newFollowing) => {
    setFollowing(newFollowing);
  };
  const renderCards = Photos.map((photo, index) => {
    return (
      <Col lg={8} key={index}>
        <Link to={`/post/${photo._id}`}>
          <Card
            style={{ cursor: "pointer", width: 293, height: 293 }}
            cover={
              <img
                className="post_image"
                style={{ width: 293, height: 293, objectFit: "cover" }}
                src={`http://localhost:5000/${photo.images[0]}`}
                alt="사진"
              />
            }
          ></Card>
        </Link>
      </Col>
    );
  });
  return (
    <div style={{ width: "975px", margin: "0 auto" }}>
      <div style={{ height: 200, display: "flex", paddingTop: 40 }}>
        {" "}
        {/* 유저 사진  */}
        <div
          style={{
            width: "33%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Avatar src={userInfo?.image} size={160}></Avatar>
        </div>
        <div style={{ width: "66%" }}>
          <div
            style={{ display: "flex", fontSize: "1.7rem", fontWeight: "bold" }}
          >
            <div style={{ marginTop: 5, marginRight: 5 }}>
              {userInfo?.nickname}
            </div>
            {userPageId === props.user.userData?._id ? (
              <div style={{ marginLeft: 5 }}>
                <Button>
                  <Link to="/setting">프로필 편집</Link>
                </Button>
                <Follow
                  refreshFollower={refreshFollower}
                  refreshFollowing={refreshFollowing}
                  userId={userPageId}
                />
              </div>
            ) : (
              <div>
                <Follow
                  refreshFollower={refreshFollower}
                  refreshFollowing={refreshFollowing}
                  userId={userPageId}
                />
              </div>
            )}
            {/* <SettingFilled /> */}
          </div>
          {/* 유저 이름 , 프로필 편집, 설정아이콘 */}
          {/* 게시물, 게시물수/ 팔로워, 팔로워 수 / 팔로우, 팔로우 수  */}
          <br />
          <div>
            <span>
              게시물 <b>{postLength}</b>
            </span>
            &nbsp;&nbsp;
            <span style={{ cursor: "pointer" }} onClick={onFollowerBox}>
              팔로워 <b>{follower.length}</b>
            </span>
            &nbsp;&nbsp;
            <span style={{ cursor: "pointer" }} onClick={onFollowingBox}>
              팔로우 <b>{following.length}</b>
            </span>
          </div>
          <br />
          <div style={{ fontSize: "1.2rem" }}>
            <b>{userInfo?.name}</b>
          </div>{" "}
          <div style={{ width: 320, fontSize: "1.1rem" }}>
            {userInfo?.description}
          </div>
          {/* 유저 description */}
        </div>
      </div>

      {/*  hr 인데 아래 클릭된거에 따라 bold된곳이 달라짐*/}
      <br />
      <hr />
      {/* ic 게시물, ic IGTV, ic 저장됨, ic 태그됨 */}

      {/* 유저 게시물 map (3개씩) */}
      <Row
        style={{
          marginLeft: "0.5rem",
          marginTop: 25,
        }}
        gutter={[16, 16]}
      >
        {renderCards}
      </Row>

      <br />
      <br />
      <br />
      {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      )}

      {followerBox && (
        <div
          id="followerBox"
          style={{
            backgroundColor: "rgba(0,0,0,0.9)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
          }}
          onClick={(e) => {
            e.target.id === "followerBox" && setFollowerBox(!followerBox);
          }}
        >
          <FollowerDetail
            followerDetail={follower}
            openHandler={onFollowerBox}
          />
        </div>
      )}
      {followingBox && (
        <div
          id="followingBox"
          style={{
            backgroundColor: "rgba(0,0,0,0.9)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
          }}
          onClick={(e) => {
            e.target.id === "followingBox" && setFollowingBox(!followingBox);
          }}
        >
          <FollowingDetail
            followingDetail={following}
            openHandler={onFollowingBox}
          />
        </div>
      )}
    </div>
  );
}

export default UserPage;
