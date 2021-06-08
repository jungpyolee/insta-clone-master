import axios from "axios";
import timeBefore from "../../../../../src/_utils/timeBefore";
import React, { useEffect, useState } from "react";
import Avatar from "antd/lib/avatar/avatar";
import { Link } from "react-router-dom";

import PhotoSwiper from "../../../../_utils/PhotoSwiper";
import LandingPageComment from "./LandingPageComment";
function LandingPagePostDetail(props) {
  const postId = props.postId;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let body = {
      postId: postId,
    };

    axios.post("/api/photo/detail", body).then((response) => {
      if (response.data.success) {
        setPost(response.data.photoinfo[0]);
      } else {
        alert("사진가져오기 실패");
      }
    });

    axios.post("/api/comment/getComments", body).then((response) => {
      if (response.data.success) {
        setComments(response.data.comments);
      } else {
        alert("코멘트 가져오기실패");
      }
    });
  }, [postId]);

  const refreshFunction = (newComment) => {
    setComments(comments.concat(newComment));
  };
  return (
    <div
      style={{
        width: 600,
        height: 600,

        marginTop: 37,
        marginBottom: 320,
      }}
    >
      {" "}
      {post && (
        <div
          style={{
            width: 600,
            height: 60,
            padding: 16,
            display: "flex",
            border: "1px solid lightgray",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 12,
            }}
          >
            <Avatar src={post.writer.image} size="16"></Avatar>
          </div>
          <div
            style={{
              marginLeft: 7,
              fontSize: "1rem",
              lineHeight: 1.2,
              width: 300,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link style={{ color: "black" }} to={`/user/${post.writer._id}`}>
              {post.writer.nickname}
              <br />
              {post.location && (
                <div style={{ fontSize: "0.8rem" }}>&nbsp;{post.location}</div>
              )}
            </Link>
          </div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          padding: "auto 0",
          width: 600,
          backgroundColor: "black",
        }}
      >
        {post && <PhotoSwiper post={post} />}
      </div>
      {/* description */}
      <div
        style={{
          width: 600,
          height: 200,
          background: "white",
          border: "1px solid lightgray",
          borderTop: "none",
        }}
      >
        {/* 댓글부분 */}
        {post && (
          <LandingPageComment
            refreshFunction={refreshFunction}
            commentLists={comments}
            postId={postId}
            post={post}
          />
        )}
      </div>
    </div>
  );
}

export default LandingPagePostDetail;
