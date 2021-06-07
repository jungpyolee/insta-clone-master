import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Follow from "../../../../_utils/Follow/Follow";
import LandingPagePostDetail from "./LandingPagePostDetail";

function LandingPagePost(props) {
  const user = useSelector((state) => state.user);
  const [Photos, setPhotos] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(9);
  const [PostSize, setPostSize] = useState(0);
  const [postLength, setPostLength] = useState(0);
  const [myFollowingIds, setMyFollowingIds] = useState([]);
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);

  const refreshFollower = (newFollower) => {
    setFollower(newFollower);
  };

  const refreshFollowing = (newFollowing) => {
    setFollowing(newFollowing);
  };
  useEffect(() => {
    let body = { getFollowing: user.userData?._id };

    axios.post("/api/follow/getFollowing", body).then((response) => {
      if (response.data.success) {
        setMyFollowingIds(
          response.data.following.map((item) =>
            myFollowingIds.concat(item.followTo._id)
          )
        );
        if (myFollowingIds) {
          let variables = {
            id: response.data.following.map((item) =>
              myFollowingIds.concat(item.followTo._id)
            ),
          };
          axios
            .post("/api/photo/landingPagePhoto", variables)
            .then((response) => {
              if (response.data.success) {
                setPhotos(response.data.photoInfo);
              } else {
                alert("사진가져오기실패");
              }
            });
        }
      } else {
        alert("내팔로잉정보가져오기실패");
      }
    });
  }, [user]);

  const renderPosts = Photos.map((photo, index) => (
    <LandingPagePostDetail postId={photo._id} />
  ));
  console.log(myFollowingIds);
  console.log(Photos);
  return (
    <div
      style={{
        marginRight: 28,
      }}
    >
      <div>{renderPosts}</div>

      {/* <Follow
                  refreshFollower={refreshFollower}
                  refreshFollowing={refreshFollowing}
                  // userId={map해서 해당포스트주인의 id넣기}
                /> */}
    </div>
  );
}

export default LandingPagePost;