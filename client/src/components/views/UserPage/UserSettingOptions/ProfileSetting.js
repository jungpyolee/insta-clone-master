import React, { useState, useEffect } from "react";
import { Form, Button, Avatar, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { settingUser } from "../../../../_actions/user_actions";
import ProfileUpload from "./ProfileUpload";
function ProfileSetting(props) {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const [description, setDescription] = useState("");
  const [nickname, setNickname] = useState("");
  const [website, setWebsite] = useState("");
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");

  const [newDescription, setNewDescription] = useState(description);
  const [newNickname, setNewNickname] = useState(nickname);
  const [newWebsite, setNewWebsite] = useState(website);
  const [newAvatar, setNewAvatar] = useState(null);
  const [newUsername, setNewUsername] = useState(username);
  const handleChangeUsername = (event) => {
    setNewUsername(event.currentTarget.value);
  };
  const handleChangeDecsription = (event) => {
    setNewDescription(event.currentTarget.value);
  };

  const handleChangeNickname = (event) => {
    setNewNickname(event.currentTarget.value);
  };

  const handleChangeWebsite = (event) => {
    setNewWebsite(event.currentTarget.value);
  };

  const onSubmit = () => {
    if (newAvatar) {
      let body = {
        username: newUsername,
        nickname: newNickname,
        website: newWebsite,
        description: newDescription,
        image: `http://localhost:5000/${newAvatar}`,
      };

      dispatch(settingUser(body)).then((response) => {
        if (response.payload.success) {
        }
      });
    } else {
      let body = {
        username: newUsername,
        nickname: newNickname,
        website: newWebsite,
        description: newDescription,
        image: avatar,
      };

      dispatch(settingUser(body)).then((response) => {
        if (response.payload.success) {
        }
      });
    }
  };

  useEffect(() => {
    if (user.userData) {
      setAvatar(user.userData.image);
      setUsername(user.userData.name);
      setNickname(user.userData.nickname);
      setDescription(user.userData.description);
      setWebsite(user.userData.website);
      setNewWebsite(user.userData.website);
      setNewNickname(user.userData.nickname);
      setNewDescription(user.userData.description);
      setNewUsername(user.userData.name);
      // setNewAvatar(user.userData.image);
    }
  }, [user]);

  const avatarHandler = (image) => {
    setNewAvatar(image);
  };
  return (
    <div
      className="profileform"
      style={{ marginRight: "300px", marginTop: "30px" }}
    >
      <Form
        colon={false}
        {...layout}
        name="nest-messages"
        validateMessages={validateMessages}
        onSubmit={onSubmit}
      >
        {/* 프편 상단 */}
        <div style={{ marginLeft: "90px" }}>
          <div style={{ display: "flex" }}>
            {
              <Avatar
                src={newAvatar ? `http://localhost:5000/${newAvatar}` : avatar}
                size={40}
              ></Avatar>
            }
            <div style={{ marginLeft: "30px" }}>
              <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                {user?.userData?.nickname}
              </div>

              <div>
                <ProfileUpload refreshFunction={avatarHandler} />
              </div>
            </div>
          </div>
        </div>
        <br />
        <Form.Item
          style={{ marginBottom: 10 }}
          name={["user", "name"]}
          label={<b>이름</b>}
        >
          <Input
            value={newUsername}
            onChange={handleChangeUsername}
            placeholder={username}
            style={{ width: "355px" }}
          ></Input>
        </Form.Item>
        <p
          style={{
            display: "block",
            width: "355px",
            marginLeft: "140px",
            lineHeight: "0.9rem",
            fontSize: "0.75rem",
            color: "gray",
          }}
        >
          사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을
          사용하여 회원님의 계정을 찾을 수 있도록 도와주세요. <br />
          <br /> 이름은 14일 안에 두 번만 변경할 수 있습니다.
        </p>

        <Form.Item
          style={{ marginBottom: 10 }}
          name={["user", "nickname"]}
          label={<b>사용자 이름</b>}
        >
          <Input
            value={newNickname}
            onChange={handleChangeNickname}
            placeholder={nickname}
            style={{ width: "355px" }}
          />
        </Form.Item>
        <p
          style={{
            display: "block",
            width: "355px",
            marginLeft: "140px",
            lineHeight: "0.9rem",
            fontSize: "0.75rem",
            color: "gray",
            marginBottom: 20,
          }}
        >
          대부분의 경우 14일 이내에 사용자 이름을 다시 {nickname}(으)로 변경할
          수 있습니다.
        </p>
        <Form.Item name={["user", "website"]} label={<b>웹사이트</b>}>
          <Input
            value={newWebsite}
            onChange={handleChangeWebsite}
            style={{ width: "355px" }}
            placeholder={website}
          />
        </Form.Item>
        <Form.Item name={["user", "introduction"]} label={<b>소개</b>}>
          <Input.TextArea
            value={newDescription}
            onChange={handleChangeDecsription}
            style={{ width: "355px", maxWidth: "500px" }}
            placeholder={description}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          {/* <a href={`/user/${user.userData._Id}`}> */}

          <Button type="primary" htmlType="submit" onClick={onSubmit}>
            <a href={`/user/${user.userData?._id}`}>Submit </a>
          </Button>

          {/* </a> */}
        </Form.Item>
      </Form>
    </div>
  );
}

export default ProfileSetting;
