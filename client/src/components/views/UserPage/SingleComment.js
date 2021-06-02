import React, { useState } from "react";
import { Form, Comment, Avatar, Button, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import timeBefore from "../../../../src/_utils/timeBefore";

import Like from "../../../_utils/Like";
import { CloseOutlined } from "@ant-design/icons";
function SingleComment(props) {
  const { TextArea } = Input;
  const postId = props.postId;
  const user = useSelector((state) => state.user);
  const [likes, setLikes] = useState(0);
  const [openReply, setOpenReply] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [openLikes, setOpenLikes] = useState(false);

  const refreshFunction = (newLikes) => {
    setLikes(newLikes);
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
        console.log(response.data.result);
        props.refreshFunction(response.data.result);
        setCommentValue("");
        setOpenReply(false);
      } else {
        alert("코멘트 저장실패");
      }
    });
  };

  const onHandleChange = (e) => {
    setCommentValue(e.target.value);
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Comment
          style={{ width: "80%", marginLeft: 3 }}
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
            console.log(e.target);
            e.target.id === "openLikes" && setOpenLikes(!openLikes);
          }}
        >
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
              <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>좋아요</div>
              <div
                style={{ fontSize: "1.4rem", position: "absolute", right: 20 }}
              >
                <CloseOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setOpenLikes(!openLikes);
                  }}
                />
              </div>
            </div>

            {/* map */}
            <div> 프사 아이디 소개</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleComment;
