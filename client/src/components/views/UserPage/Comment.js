import { PropertySafetyTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import Form from "antd/lib/form/Form";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReplyComment from "./ReplyComment";
import SingleComment from "./SingleComment";

function Comment(props) {
  const postId = props.postId;
  const user = useSelector((state) => state.user);
  const [commentValue, setCommentValue] = useState("");

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
        console.log(response.data.result);
        props.refreshFunction(response.data.result);
        setCommentValue("");
      } else {
        alert("코멘트 저장실패");
      }
    });
  };
  return (
    <div>
      <p>Replies</p>
      <hr />

      {/* Comment Lists */}

      {props.commentLists &&
        props.commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <div>
                <SingleComment
                  refreshFunction={props.refreshFunction}
                  comment={comment}
                  postId={postId}
                />
                <ReplyComment
                  parentCommentId={comment._id}
                  refreshFunction={props.refreshFunction}
                  postId={postId}
                  commentLists={props.commentLists}
                />
              </div>
            )
        )}

      {/* Root Comment Form */}
      <div>
        <Form style={{ display: "flex" }} onSubmit={onSubmit}>
          <textarea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={handleClick}
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
      </div>
    </div>
  );
}

export default Comment;
