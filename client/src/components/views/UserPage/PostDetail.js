import axios from "axios";

import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { Link } from "react-router-dom";
function PostDetail(props) {
  const postId = props.match.params.id;
  const [post, setPost] = useState(null);
  console.log(post);
  useEffect(() => {
    let body = {
      postId: postId,
    };

    axios.post("/api/photo/detail", body).then((response) => {
      if (response.data.success) {
        setPost(response.data.photoinfo[0]);
        console.log(response.data);
      } else {
        alert("사진가져오기 실패");
      }
    });
  }, []);
  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.3)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
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
        <div style={{ width: 600 }}>
          {post && (
            <Carousel autoplay>
              {post.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={`http://localhost:5000/${image}`}
                    alt="상세사진"
                    style={{ width: 600, maxHeight: "600px" }}
                  ></img>
                </div>
              ))}
            </Carousel>
          )}
        </div>
        {/* 위쪽 */}
        <div
          style={{
            width: 375,
            height: 600,
            background: "white",
            display: "flex",
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
                  fontSize: "1.2rem",

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
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 댓글부분 */}
      </div>
    </div>
  );
}

export default PostDetail;
