import React from "react";

function FollowDetail() {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          zIndex: 11,
          top: 270,
          left: 770,

          width: 400,
          height: 400,
          backgroundColor: "white",
          borderRadius: 12,
        }}
      >
        <div
          style={{
            height: 42,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "1px solid black",
            position: "relative",
          }}
        >
          <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>좋아요</div>
          <div style={{ fontSize: "1.4rem", position: "absolute", right: 20 }}>
            <CloseOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpenLikes(!openLikes);
              }}
            />
          </div>
        </div>

        {/* map */}
        <div> 프사 아이디 소개</div>
      </div>
    </div>
  );
}

export default FollowDetail;
