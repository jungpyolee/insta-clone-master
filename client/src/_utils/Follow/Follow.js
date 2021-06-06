import React, { useEffect, useState } from "react";
import { Button } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
function Follow(props) {
  const user = useSelector((state) => state.user);
  const followTo = props.userId;
  const followFrom = user.userData?._id;

  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(0);

  useEffect(() => {
    if (followTo && followFrom) {
      getFollower();
    } else {
      return;
    }
  }, [followTo, followFrom]);

  const getFollower = () => {
    let body = {
      getFollower: followTo,
      getFollowing: followTo,
      pageId: followTo,
      userId: followFrom,
    };
    axios.post("/api/follow/doIfollowyou", body).then((response) => {
      if (response.data.success) {
        if (response.data.yesorno === 1) {
          console.log("나는 너 팔로우함 근데 넌하는지볼까??");

          axios.post("/api/follow/doyoufollowme", body).then((response) => {
            if (response.data.success) {
              if (response.data.yesorno === 1) {
                console.log("우리 맞팔임^^ ");
                setIsFollowing(4);
              } else {
                console.log("나만 팔로우중;");
                setIsFollowing(3);
              }
            } else {
              alert("관계조회실패");
            }
          });
        } else {
          console.log("난 안하는데 넌하는지 볼까?");
          axios.post("/api/follow/doyoufollowme", body).then((response) => {
            if (response.data.success) {
              if (response.data.yesorno === 1) {
                console.log("너만 나 팔로우하네 ");
                setIsFollowing(2);
              } else {
                console.log("둘다 팔로우안하네");
                setIsFollowing(1);
              }
            } else {
              alert("관계조회실패");
            }
          });
        }
      }

      if (followTo === followFrom) {
        setIsFollowing(0);
      }
    });
    axios.post("/api/follow/getFollower", body).then((response) => {
      if (response.data.success) {
        setFollower(response.data.follower);
        props.refreshFollower(response.data.follower);
      } else alert("팔로워 가져오기실패");
    });

    axios.post("/api/follow/getFollowing", body).then((response) => {
      if (response.data.success) {
        setFollowing(response.data.following);
        props.refreshFollowing(response.data.following);
      } else alert("팔로잉 가져오기실패");
    });
  };

  const follow = () => {
    let body = { followTo: followTo, followFrom: followFrom };
    axios.post("/api/follow/follow", body).then((response) => {
      if (response.data.success) {
        getFollower();
      } else alert("팔로우 실패");
    });
  };

  const unfollow = () => {
    let body = { followTo: followTo, followFrom: followFrom };
    axios.delete("/api/follow/unfollow", body).then((response) => {
      if (response.data.success) {
        getFollower();
      } else alert("언팔 실패");
    });
  };

  if (isFollowing === 1 && followTo === followFrom) {
    return <div></div>;
  } else if (isFollowing === 1) {
    return (
      <Button type="primary" onClick={follow}>
        <b>팔로우</b>
      </Button>
    );
  } else if (isFollowing === 2) {
    return (
      <Button type="primary" onClick={follow}>
        <b>맞팔로우하기</b>
      </Button>
    );
  } else if (isFollowing === 3) {
    return (
      <Button type="primary" onClick={unfollow}>
        <b>언팔로우</b>
      </Button>
    );
  } else if (isFollowing === 4) {
    return (
      <Button type="primary" onClick={unfollow}>
        <b>언팔로우(맞팔상태)</b>
      </Button>
    );
  } else return <div></div>;
}
export default Follow;
