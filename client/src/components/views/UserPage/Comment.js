import {
  HeartFilled,
  SaveOutlined,
  SendOutlined,
  HeartOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import Form from "antd/lib/form/Form";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReplyComment from "./ReplyComment";
import SingleComment from "./SingleComment";
import moment from "moment";
import "moment/locale/ko";
import Like from "../../../_utils/Like";
function Comment(props) {
  const postId = props.postId;
  const user = useSelector((state) => state.user);
  const [commentValue, setCommentValue] = useState("");
  const postDate = moment(props.post.createdAt).format("lll");

  const refreshFunction = (newLikes) => {
    console.log(newLikes);
  };

  console.log(postDate);
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
    <div style={{ borderTop: "1px solid black", height: 350 }}>
      {/* Comment Lists */}
      <div
        style={{
          height: 265,
          overflowY: "scroll",
          paddingLeft: 16,
        }}
      >
        {" "}
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
      </div>
      {/* 좋아요 폼 */}
      <div
        style={{
          height: 103,
          borderTop: "1px solid black",
          padding: "8 16",
          marginTop: 8,
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
            }}
          >
            <div>
              <Like refreshFunction={refreshFunction} postId={postId} />
              <MessageOutlined
                style={{ cursor: "pointer", marginLeft: 10, marginRight: 10 }}
              />
              <SendOutlined style={{ cursor: "pointer" }} />
            </div>{" "}
            <div>
              {" "}
              <SaveOutlined style={{ marginRight: 5 }} />
            </div>
          </div>{" "}
          <div style={{ marginLeft: 8 }}>
            <div>skynote_b님 외 10명이 좋아합니다.</div> <div>{postDate}</div>
          </div>
        </div>
      </div>
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
