import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReplyComments, setOpenReplyComments] = useState(false);
  useEffect(() => {
    let commentNumber = 0;

    props.commentLists.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        return commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [props.commentLists, props.parentCommentId]);

  let renderReplyComment = (parentCommentId) =>
    props.commentLists.map((comment, index) => (
      <React.Fragment>
        {comment.responseTo === parentCommentId && (
          <div key={index} style={{ width: "80%", marginLeft: "20px" }}>
            <SingleComment
              refreshFunction={props.refreshFunction}
              comment={comment}
              postId={props.postId}
            />
            <ReplyComment
              commentLists={props.commentLists}
              refreshFunction={props.refreshFunction}
              postId={props.postId}
              parentCommentId={comment._id}
            />
          </div>
        )}
      </React.Fragment>
    ));
  const onHandleChange = () => {
    setOpenReplyComments(!openReplyComments);
  };
  return (
    <div>
      {childCommentNumber > 0 && (
        <p
          style={{
            fontSize: "14px",
            margin: 0,
            color: "gray",
            cursor: "pointer",
          }}
          onClick={onHandleChange}
        >
          {" "}
          {childCommentNumber}개의 답글 보기
        </p>
      )}
      {openReplyComments && renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;
