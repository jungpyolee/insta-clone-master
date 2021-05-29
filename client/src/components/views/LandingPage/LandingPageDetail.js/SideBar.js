import React from "react";

function SideBar() {
  return (
    <div style={{ width: 325, height: 291, padding: "8 0" }}>
      <div style={{ display: "flex" }}>
        {/* 유저 정보 */}
        <div>프사</div>
        <div>
          <div>닉넴</div>
          <div>소개</div>
        </div>
      </div>
      <div>
        {/* 유저 추천 */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>회원님을 위한 추천</div> <div>모두보기</div>
          <hr />
        </div>
        <div>
          <div>
            프사 닉넴 팔로우<div></div>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
