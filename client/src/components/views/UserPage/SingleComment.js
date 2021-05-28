import React, { useState } from "react";
import { Form, Comment, Avatar, Button, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
function SingleComment(props) {
  const { TextArea } = Input;
  const postId = props.postId;
  const user = useSelector((state) => state.user);

  const [openReply, setOpenReply] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const actions = [
    <span
      onClick={() => {
        setOpenReply(!openReply);
      }}
      key="comment-basic-reply-to"
    >
      Reply to
    </span>,
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
      <Comment
        actions={actions}
        author={props.comment.writer.nickname}
        avatar={<Avatar src={props.comment.writer.image} alt="image" />}
        content={<p>{props.comment.content}</p>}
      />
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
