import React, { useState } from "react";
import { Form, Comment, Avatar, Button, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import timeBefore from "../../../../src/_utils/timeBefore";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import Like from "../../../_utils/Like";
function SingleComment(props) {
  const { TextArea } = Input;
  const postId = props.postId;
  const user = useSelector((state) => state.user);

  const [openReply, setOpenReply] = useState(false);
  const [commentValue, setCommentValue] = useState("");

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
          <Like commentId={props.comment._id} />
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
    </div>
  );
}

export default SingleComment;
