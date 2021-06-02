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
import React, { useEffect, useState } from "react";
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
  const [likes, setLikes] = useState(0);
  const [likey, setLikey] = useState(0);
  const [likeDetail, setLikeDetail] = useState([]);
  const postDate = moment(props.post.createdAt).format("lll");
  const refreshFunction = (newlikes) => {
    setLikes(newlikes);
    setLikey(newlikes - 1);
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
        console.log(response.data.result);
        props.refreshFunction(response.data.result);
        setCommentValue("");
      } else {
        alert("코멘트 저장실패");
      }
    });
  };

  console.log("comment", likeDetail);
  useEffect(() => {
    let variable = { postId: postId, userId: user.userData?._id };
    axios.post("/api/like/getLikes", variable).then((response) => {
      if (response.data.success) {
        //   좋아요수

        setLikeDetail(response.data.likes);
      } else {
        alert("좋아요정보가져오기실패");
      }
    });
  }, []);

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
                    likeDetail={likeDetail}
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
            <div style={{ display: "flex" }}>
              <Like refreshFunction={refreshFunction} postId={postId} />
              <div>
                <MessageOutlined
                  style={{ cursor: "pointer", marginLeft: 10, marginRight: 10 }}
                />
              </div>
              <div>
                <SendOutlined style={{ cursor: "pointer" }} />
              </div>
            </div>
            <div>
              <SaveOutlined style={{ marginRight: 5 }} />
            </div>
          </div>{" "}
          <div style={{ marginLeft: 8 }}>
            {likes === 1 ? (
              <div>
                <b>{user?.userData?.nickname}</b>님이 좋아합니다.
              </div>
            ) : null}
            {likes > 1 ? (
              <div>
                <b style={{ fontSize: "1.1rem" }}>
                  {likeDetail[0]?.userId.nickname}
                </b>
                님 <b>외 {likey}&nbsp;명</b>이 좋아합니다.
              </div>
            ) : null}
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
