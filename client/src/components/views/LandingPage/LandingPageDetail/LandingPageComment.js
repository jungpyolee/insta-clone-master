import { SaveOutlined, SendOutlined, MessageOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Form from "antd/lib/form/Form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "moment/locale/ko";
import Like from "../../../../_utils/Like";
import "./LandingPageComment.css";
import UserHover from "../../../../_utils/UserHover";
import { Link } from "react-router-dom";
import LikeDetail from "../../../../_utils/LikeDetail";
import LandingPageSingleComment from "./LandingPageSingleComment";
import timeBefore from "../../../../_utils/timeBefore";
function LandingPageComment(props) {
  const postId = props.postId;
  const post = props.post;
  const user = useSelector((state) => state.user);
  const [commentValue, setCommentValue] = useState("");
  const [likes, setLikes] = useState(0);
  const [likey, setLikey] = useState(0);
  const [likeDetail, setLikeDetail] = useState([]);
  const [likeDetailBox, setLikeDetailBox] = useState(false);
  const postWriterId = props.post.writer._id;
  const postWriter = props.post.writer;
  const postDescription = props.post.description;
  const onLikeDetail = () => {
    setLikeDetailBox(!likeDetailBox);
  };
  const refreshFunction = (newlikes, newLikeDetails) => {
    setLikes(newlikes);
    setLikey(newlikes - 1);
    setLikeDetail(likeDetail.concat(newLikeDetails));
  };

  const refreshUnlike = (unlikeResult) => {
    const currentIndex = likeDetail.indexOf(unlikeResult);

    let newLikeDetail = [...likeDetail];

    newLikeDetail.splice(currentIndex, 1);

    setLikeDetail(newLikeDetail);
  };
  const handleClick = (e) => {
    setCommentValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let variables = {
      content: commentValue,
      writer: user.userData._id,
      postId: postId,
    };

    axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        props.refreshFunction(response.data.result);

        setCommentValue("");

        let body = {
          userId: user.userData._id,
          commentId: response.data.result[0]._id,
          myId: postWriterId,
          notificationType: "comment",
          postId: postId,
        };
        axios.post("/api/comment/saveCommentNotify", body).then((response) => {
          if (response.data.success) {
          } else {
            alert("comment notify failed");
          }
        });
      } else {
        alert("????????? ????????????");
      }
    });
  };

  useEffect(() => {
    let variable = { postId: postId, userId: user.userData?._id };
    axios.get("/api/like/getLikes", { params: variable }).then((response) => {
      if (response.data.success) {
        //   ????????????

        setLikeDetail(response.data.likes);
      } else {
        alert("?????????????????????????????????");
      }
    });
  }, []);

  return (
    <div style={{ borderTop: "1px solid lightgrey", height: 350 }}>
      {/* ????????? ??? */}
      <div
        style={{
          height: 72,
          borderTop: "1px solid lightgray",
          padding: "8 16",
        }}
      >
        <div>
          {" "}
          <div
            style={{
              fontSize: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              padding: 5,
              paddingTop: 0,
            }}
          >
            <div style={{ display: "flex" }}>
              <Like
                refreshUnlike={refreshUnlike}
                refreshFunction={refreshFunction}
                postId={postId}
              />
              <Link to={`/post/${postId}`}>
                <div>
                  <MessageOutlined
                    style={{
                      color: "black",
                      cursor: "pointer",
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                  />
                </div>
              </Link>
              <div></div>
            </div>
            <div></div>
          </div>{" "}
          <div style={{ marginLeft: 8 }}>
            {likes === 0 ? <p>?????? ?????? ???????????? ???????????????!</p> : null}
            {likes === 1 ? (
              <div>
                <div className="tooltips">
                  <div className="nicknamebox">
                    <b className="nickname">
                      <Link to={`/user/${likeDetail[0]?.userId._id}`}>
                        <div style={{ color: "black" }}>
                          {likeDetail[0]?.userId.nickname}
                        </div>
                      </Link>
                    </b>
                    <div className="tooltipbox2">
                      <UserHover user={likeDetail[0]?.userId} />
                    </div>
                  </div>
                </div>
                ?????? ???????????????.
              </div>
            ) : null}
            {likes > 1 ? (
              <div>
                <div className="tooltips">
                  <div className="nicknamebox">
                    <b className="nickname">
                      <Link to={`/user/${likeDetail[0]?.userId._id}`}>
                        <div style={{ color: "black" }}>
                          {likeDetail[0]?.userId.nickname}
                        </div>
                      </Link>
                    </b>
                    <div className="tooltipbox2">
                      <UserHover user={likeDetail[0]?.userId} />
                    </div>
                  </div>
                </div>
                ???{" "}
                <b style={{ cursor: "pointer" }} onClick={onLikeDetail}>
                  ??? {likey}&nbsp;???
                </b>
                ??? ???????????????.
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {post && (
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <b style={{ marginLeft: 9, marginRight: 9 }}>
            <Link to={`/user/${post.writer._id}`}>{post.writer.nickname}</Link>
          </b>{" "}
          <div>{post.description}</div>{" "}
          <div
            style={{
              marginLeft: 9,
              paddingBottom: 1.5,
              fontSize: "0.7rem",
              color: "gray",
            }}
          >
            {timeBefore(post.createdAt)}
          </div>
        </div>
      )}
      {/* Comment Lists */}
      <div
        className="commentlist"
        style={{
          height: 78,
          overflowY: "hidden",
          paddingLeft: 5,
        }}
      >
        {" "}
        {props.commentLists &&
          props.commentLists.map(
            (comment, index) =>
              !comment.responseTo && (
                <div key={index}>
                  <LandingPageSingleComment
                    refreshFunction={props.refreshFunction}
                    comment={comment}
                    likeDetail={likeDetail}
                    postId={postId}
                  />
                </div>
              )
          )}
      </div>

      {/* Root Comment Form */}
      <div>
        <Form style={{ display: "flex" }} onSubmit={onSubmit}>
          <input
            style={{
              marginLeft: -1,
              width: "87%",
              borderRadius: "3px",
              border: "1px solid lightgray",
              borderLeft: "0.5px solid lightgray",
            }}
            onChange={handleClick}
            value={commentValue}
            placeholder=" ????????? ??????????????????"
          />
          <Button
            onClick={onSubmit}
            type="primary"
            style={{ marginLeft: 0, width: "15%", height: "52px" }}
          >
            {" "}
            <b>??????</b>
          </Button>
        </Form>

        {likeDetailBox && (
          <div
            id="likeDetailBox"
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
              e.target.id === "likeDetailBox" &&
                setLikeDetailBox(!likeDetailBox);
            }}
          >
            <LikeDetail likeDetail={likeDetail} openHandler={onLikeDetail} />
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPageComment;
