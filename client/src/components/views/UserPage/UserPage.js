import React, { useEffect, useState } from "react";
import { Button, Col, Row, Card } from "antd";
import { SettingFilled } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import axios from "axios";
function UserPage(props) {
  const [Photos, setPhotos] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(9);
  const [PostSize, setPostSize] = useState(0);

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getPhotos(body);
  }, []);

  const getPhotos = (body) => {
    axios.get("/api/photo/photos", { params: body }).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setPhotos([...Photos, ...response.data.photoInfo]);
        } else {
          setPhotos(response.data.photoInfo);
        }
        console.log(response.data);
        setPostSize(response.data.postSize);
      } else {
        alert("사진을 가져오는데 실패했습니다.");
      }
    });
  };

  const loadMoreHandler = () => {
    let skip = Skip + Limit;
    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };
    getPhotos(body);
    setSkip(skip);
  };

  const renderCards = Photos.map((photo, index) => {
    if (photo) {
      return (
        <Col lg={8} key={index}>
          <Card
            style={{ width: 293, height: 293 }}
            cover={
              <a href={`/photo/${photo._id}`}>
                <img
                  style={{ width: 293, height: 293, objectFit: "cover" }}
                  src={`http://localhost:5000/${photo.images}`}
                  alt="사진"
                />
              </a>
            }
          ></Card>
        </Col>
      );
    } else {
      return null;
    }
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
          {props.user && (
            <Avatar src={props.user.userData.image} size={130}></Avatar>
          )}
        </div>
        <div style={{ width: "66%" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {props.user.userData.nickname} <Button>프로필 편집</Button>{" "}
            <SettingFilled />
          </div>
          {/* 유저 이름 , 프로필 편집, 설정아이콘 */}
          {/* 게시물, 게시물수/ 팔로워, 팔로워 수 / 팔로우, 팔로우 수  */}
          <div>게시물 100 &nbsp;&nbsp;팔로워 100 &nbsp;&nbsp;팔로우 100</div>
          <br />
          <div>{props.user.userData.description}</div>{" "}
          <div>{props.user.userData.website}</div>
          {/* 유저 description */}
        </div>
      </div>

      {/*  hr 인데 아래 클릭된거에 따라 bold된곳이 달라짐*/}
      <hr />
      {/* ic 게시물, ic IGTV, ic 저장됨, ic 태그됨 */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        게시물&nbsp;&nbsp;IGTV&nbsp;&nbsp;저장됨&nbsp;&nbsp;태그됨
      </div>

      {/* 유저 게시물 map (3개씩) */}
      <Row
        style={{
          marginLeft: "0.5rem",
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
    </div>
  );
}

export default UserPage;
