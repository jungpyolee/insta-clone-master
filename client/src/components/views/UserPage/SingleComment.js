import React, { useState } from "react";
import { Form, Comment, Avatar, Button, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import timeBefore from "../../../../src/_utils/timeBefore";

import Like from "../../../_utils/Like";
import LikeDetail from "../../../_utils/LikeDetail";
function SingleComment(props) {
  const { TextArea } = Input;
  const postId = props.postId;
  const user = useSelector((state) => state.user);
  const [likes, setLikes] = useState(0);
  const [openReply, setOpenReply] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [openLikes, setOpenLikes] = useState(false);
  const [likeDetail, setLikeDetail] = useState([]);
  const refreshFunction = (newLikes, newLikeDetail) => {
    setLikes(newLikes);
    setLikeDetail(likeDetail.concat(newLikeDetail));
  };

  const refreshUnlike = (unlikeResult) => {
    const currentIndex = likeDetail.indexOf(unlikeResult);

    let newLikeDetail = [...likeDetail];

    newLikeDetail.splice(currentIndex, 1);

    setLikeDetail(newLikeDetail);
  };
  const actions = [
    <div
      style={{
        display: "flex",
        fontSize: 10,
        lineHeight: 0.5,
        fontWeight: "bold",
      }}
    >
      <p>{timeBefore(props.comment.createdAt)}</p> &nbsp;&nbsp;
      {likes > 0 && (
        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            setOpenLikes(!openLikes);
          }}
        >
          좋아요 {likes}개
        </p>
      )}
      &nbsp;
      <p
        style={{ cursor: "pointer" }}
        onClick={() => {
          setOpenReply(!openReply);
        }}
        key="comment-basic-reply-to"
      >
        답글 달기
      </p>
    </div>,
  ];
  const onSubmit = (e) => {
    e.preventDefault();
    let variables = {
      content: commentValue,
      writer: user.userData._id,
      postId: postId,
      responseTo: props.comment._id,
    };

    axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        props.refreshFunction(response.data.result);
        setCommentValue("");
        setOpenReply(false);
      } else {
        alert("코멘트 저장실패");
      }
    });
  };

  const openHandler = () => {
    setOpenLikes(!openLikes);
  };
  const onHandleChange = (e) => {
    setCommentValue(e.target.value);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Comment
          style={{ width: "100%", marginLeft: 3 }}
          actions={actions}
          author={props.comment.writer.nickname}
          avatar={<Avatar src={props.comment.writer.image} alt="image" />}
          content={<p>{props.comment.content}</p>}
        />

        <div
          style={{
            width: "20%",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 16,
          }}
        >
          <Like
            commentId={props.comment._id}
            refreshFunction={refreshFunction}
            refreshUnlike={refreshUnlike}
          />
        </div>
      </div>
      {openReply && (
        <Form style={{ display: "flex" }} onSubmit={onSubmit}>
          <TextArea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={onHandleChange}
            value={commentValue}
            placeholder="댓글을 작성해주세요"
          />
          <Button
            onClick={onSubmit}
            type="primary"
            style={{ width: "20%", height: "52px" }}
          >
            {" "}
            게시
          </Button>
        </Form>
      )}
      {openLikes && (
        <div
          id="openLikes"
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
            e.target.id === "openLikes" && setOpenLikes(!openLikes);
          }}
        >
          <LikeDetail likeDetail={likeDetail} openHandler={openHandler} />
        </div>
      )}
    </div>
  );
}

export default SingleComment;
