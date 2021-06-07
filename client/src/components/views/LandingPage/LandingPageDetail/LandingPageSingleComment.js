import React, { useState } from "react";
import { Form, Comment, Avatar, Button, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import timeBefore from "../../../../../src/_utils/timeBefore";

import Like from "../../../../_utils/Like";
import LikeDetail from "../../../../_utils/LikeDetail";
function LandingPageSingleComment(props) {
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

  const openHandler = () => {
    setOpenLikes(!openLikes);
  };
  const onHandleChange = (e) => {
    setCommentValue(e.target.value);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "100%", marginLeft: 3 }}>
          <p style={{ marginBottom: 3 }}>
            <b>{props.comment.writer.nickname}</b> &nbsp;{" "}
            {props.comment.content}
          </p>
        </div>

        <div
          style={{
            width: "20%",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 14,
            height: 20,
            marginRight: -30,
          }}
        >
          <Like
            commentId={props.comment._id}
            refreshFunction={refreshFunction}
            refreshUnlike={refreshUnlike}
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPageSingleComment;
