import { Button } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./css/userHover.css";
import Follow from "./Follow/Follow";
import { Card } from "antd";

// UserHover  쓰는 곳?

// 1. postDetail페이지의 comment부분 닉넴hover

// 2. 랜딩페이지 게시글 아바타/ 닉넴  hover
// 3. 랜딩페이지 추천 계정 아바타/닉넴 hover

// 필요데이터
//1. 유저데이터
//2. 유저 포스트사이즈, 최신포스트3개

//3. 팔로워 수, 팔로잉 수 , 팔로우관계

function UserHover(props) {
  const user = useSelector((state) => state.user);
  // 누구에 대한정보냐? 부모컴포넌트에게 userId에 유저정보 다담아서 가져오기
  const userId = props.user;
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [postSize, setPostSize] = useState(0);
  const refreshFollower = (newFollower) => {
    setFollower(newFollower);
  };

  const refreshFollowing = (newFollowing) => {
    setFollowing(newFollowing);
  };

  useEffect(() => {
    //스킵 0 , 리밋3으로 가져오기
    let body = {
      skip: 0,
      limit: 3,
      id: userId?._id,
    };
    axios.get("/api/photo/photos", { params: body }).then((response) => {
      if (response.data.success) {
        setPhotos(response.data.photoInfo);

        setPostSize(response.data.postSize);
      } else {
        alert("사진을 가져오는데 실패했습니다.");
      }
    });
  }, [userId]);

  return (
    <div className="body">
      <div className="profile">
        {/* 유저데이터 */}

        <div className="profile_left">
          <Avatar
            src={`${userId?.image}`}
            style={{ marginTop: 5, width: 56, height: 56 }}
          />
        </div>
        <div className="profile_right">
          <div>
            <div>
              <b>{userId?.nickname}</b>
            </div>
            <div>{userId?.name}</div>
          </div>
          <br />
          <div className="profile_description">{userId?.description}</div>
        </div>
      </div>

      <div className="postsizeWithfollower">
        {/* 포스트사이즈, 팔로워 수  */}
        <div className="box">
          <div className="innerBox">
            <div className="innerTop">게시물</div>
            <div className="innerBottom">
              <b>{postSize}</b>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="innerBox">
            <div className="innerTop">팔로워</div>
            <div className="innerBottom">
              <b>{follower?.length}</b>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="innerBox">
            <div className="innerTop">팔로우</div>
            <div className="innerBottom">
              <b>{following?.length}</b>
            </div>
          </div>
        </div>
      </div>

      <div className="posts">
        {/* 최근 포스트 3개 */}
        {photos.map((photo, index) => (
          <div className="postbox" key={index}>
            <a href={`http://localhost:3000/post/${photo._id}`}>
              <Card
                bodyStyle={{ padding: 0 }}
                style={{ cursor: "pointer", width: 130, height: 130 }}
                cover={
                  <img
                    style={{ width: 130, height: 130, objectFit: "cover" }}
                    src={`http://localhost:5000/${photo.images[0]}`}
                    alt="사진"
                  />
                }
              ></Card>
            </a>
          </div>
        ))}
      </div>
      <div className="sendingMessageAndfollow">
        {user.userData?._id === userId?._id ? (
          <div className="settingbox">
            <Button style={{ width: "90%" }}>
              <Link to="/setting">
                <b>프로필 편집</b>
              </Link>
            </Button>
            <Follow
              style={{ width: "90%" }}
              refreshFollower={refreshFollower}
              refreshFollowing={refreshFollowing}
              userId={userId?._id}
            />
          </div>
        ) : (
          <div className="sendingMessageAndfollow">
            <div className="messagebox">
              {" "}
              <Button style={{ width: "90%" }}>
                <b>메시지 보내기</b>
              </Button>
            </div>{" "}
            <div className="followbox">
              <Follow
                style={{ width: "90%" }}
                refreshFollower={refreshFollower}
                refreshFollowing={refreshFollowing}
                userId={userId?._id}
              />
            </div>
          </div>
        )}
        {/* 메시지 보내기, 팔로우버튼 */}
      </div>
    </div>
  );
}

export default UserHover;
