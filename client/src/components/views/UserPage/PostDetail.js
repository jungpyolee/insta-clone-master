import axios from "axios";
import timeBefore from "../../../../src/_utils/timeBefore";
import React, { useEffect, useState } from "react";
import Avatar from "antd/lib/avatar/avatar";
import { Link } from "react-router-dom";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import Comment from "./Comment";
import PhotoSwiper from "../../../_utils/PhotoSwiper";
function PostDetail(props) {
  const postId = props.match.params.id;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const postDelete = () => {
    axios
      .delete("/api/photo/postDelete", { data: { id: postId } })
      .then((response) => {
        if (response.data.success) {
          props.history.goBack();
        } else {
          alert("삭제실패");
        }
      });
  };

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
  }, []);

  const refreshFunction = (newComment) => {
    setComments(comments.concat(newComment));
  };
  return (
    <div
      id="detail"
      style={{
        backgroundColor: "rgba(0,0,0,0.3)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 3,
      }}
      onClick={(e) => e.target.id === "detail" && props.history.goBack()}
    >
      <div
        style={{
          width: 975,
          height: 600,
          margin: "0 auto",
          marginTop: 167,
          marginBottom: 167,
          display: "flex",
        }}
      >
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
        {/* 위쪽 */}
        <div
          style={{
            width: 375,
            height: 600,
            background: "white",
          }}
        >
          {post && (
            <div
              style={{
                height: 72,
                padding: 16,
                display: "flex",
                borderBottom: "1px solid lightgray",
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
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
                <Link
                  style={{ color: "black" }}
                  to={`/user/${post.writer._id}`}
                >
                  {post.writer.nickname}
                  <br />
                  {post.location && (
                    <div style={{ fontSize: "0.8rem" }}>
                      장소:{post.location}
                    </div>
                  )}
                </Link>
              </div>

              <div style={{ fontSize: "1.2rem" }}>
                <DeleteOutlined onClick={postDelete} />
              </div>
            </div>
          )}

          {post && (
            <div
              style={{
                padding: 16,
                display: "flex",
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar src={post.writer.image} size="16"></Avatar>
              </div>
              <div
                style={{
                  marginLeft: 7,
                  fontSize: "1rem",
                  lineHeight: 1.3,
                  width: 300,
                  display: "block",
                  alignItems: "center",
                }}
              >
                <Link
                  style={{ color: "black", marginRight: 5 }}
                  to={`/user/${post.writer._id}`}
                >
                  {post.writer.nickname}
                </Link>

                <div style={{ marginTop: 3, marginBottom: 8 }}>
                  {post.description}
                </div>

                <div style={{ fontSize: "0.8rem" }}>
                  {" "}
                  {timeBefore(post.createdAt)}
                </div>
              </div>
            </div>
          )}

          {/* 댓글부분 */}
          {post && (
            <Comment
              refreshFunction={refreshFunction}
              commentLists={comments}
              postId={postId}
              post={post}
            >
              {" "}
            </Comment>
          )}
        </div>

        <CloseOutlined
          style={{
            color: "white",
            position: "fixed",
            right: 30,
            top: 30,
            cursor: "pointer",
            fontSize: 40,
          }}
          onClick={() => props.history.goBack()}
        />
      </div>
    </div>
  );
}

export default PostDetail;
