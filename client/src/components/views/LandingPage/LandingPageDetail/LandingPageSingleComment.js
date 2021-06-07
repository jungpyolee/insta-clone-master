import React, { useState } from "react";

import { useSelector } from "react-redux";

import Like from "../../../../_utils/Like";
function LandingPageSingleComment(props) {
  const [likes, setLikes] = useState(0);

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
