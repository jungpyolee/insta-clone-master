import React, { useEffect, useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import "./css/Like.css";
function Like(props) {
  const user = useSelector((state) => state.user);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [likeDetail, setLikeDetail] = useState([]);
  const postId = props.postId;
  const commentId = props.commentId;

  const onRefresh = (likes, likeDetail) => {
    props.refreshFunction(likes, likeDetail);
  };

  let variable = {};

  if (postId) {
    variable = { postId: postId, userId: user.userData?._id };
  } else {
    variable = { commentId: commentId, userId: user.userData?._id };
  }

  useEffect(() => {
    axios.get("/api/like/getLikes", { params: variable }).then((response) => {
      if (response.data.success) {
        //   좋아요수
        setLikes(response.data.likes.length);
        setLikeDetail(response.data.likes);
        onRefresh(response.data.likes.length, response.data.likes);

        response.data.likes.forEach((like) => {
          if (like.userId._id === user.userData?._id) {
            setLiked(true);
          }
        });
      } else {
        alert("좋아요정보가져오기실패");
      }
    });
  }, []);
  const onLiked = () => {
    if (liked === false) {
      axios.post("/api/like/uplike", variable).then((response) => {
        if (response.data.success) {
          setLikes(likes + 1);
          setLiked(true);
          onRefresh(likes + 1, response.data.result);
        } else {
          alert("좋아요실패");
        }
      });
    } else {
      axios.delete("/api/like/unlike", variable).then((response) => {
        if (response.data.success) {
          setLikes(likes - 1);
          setLiked(false);
          onRefresh(likes - 1);
          props.refreshUnlike(response.data.unlikeResult);
        } else {
          alert("좋아요취소실패");
        }
      });
    }
  };

  return (
    <div>
      {liked ? (
        <div className="filled">
          <HeartFilled
            style={{ color: "red", cursor: "pointer" }}
            onClick={onLiked}
          />
        </div>
      ) : (
        <div className="unfilled">
          <HeartOutlined style={{ cursor: "pointer" }} onClick={onLiked} />
        </div>
      )}
    </div>
  );
}

export default Like;
