import React from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import ProfileSetting from "./UserSettingOptions/ProfileSetting";

function UserSetting() {
  const [profileSetting, setProfileSetting] = useState(true);

  const onToggle = () => {
    setProfileSetting(!profileSetting);
  };
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        marginTop: "20px",
        // position: "relative",
        // zIndex: 5,
      }}
    >
      <div>
        {/* 설정 메뉴 */}
        <Menu
          style={{
            width: 256,
            backgroundColor: "white",
            border: "1px solid #dbdbdb",
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
        >
          <Menu.Item
            style={{ marginBottom: "15px" }}
            key="1"
            icon={<MailOutlined />}
            onClick={onToggle}
          >
            프로필 편집
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "15px" }}
            key="2"
            icon={<CalendarOutlined />}
          >
            프로페셔널 계정
          </Menu.Item>

          <Menu.Item
            style={{ marginBottom: "15px" }}
            icon={<AppstoreOutlined />}
            key="3"
          >
            비밀번호 변경
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "15px" }}
            icon={<SettingOutlined />}
            key="4"
          >
            앱 및 웹사이트
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "15px" }}
            icon={<MailOutlined />}
            key="5"
          >
            이메일 및 SMS
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "15px" }}
            icon={<MailOutlined />}
            key="6"
          >
            푸시 알림
          </Menu.Item>

          <Menu.Item
            style={{ marginBottom: "15px" }}
            icon={<MailOutlined />}
            key="7"
          >
            연락처 관리
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "15px" }}
            icon={<MailOutlined />}
            key="8"
          >
            공개 범위 및 보안
          </Menu.Item>
          <Menu.Item
            style={{ marginBottom: "15px" }}
            icon={<MailOutlined />}
            key="9"
          >
            로그인 활동
          </Menu.Item>

          <Menu.Item
            style={{ marginBottom: "15px" }}
            key="10"
            icon={<LinkOutlined />}
          >
            {" "}
            Instagram에서 보낸 이메일
          </Menu.Item>
        </Menu>
      </div>
      {/* 설정 우측 메뉴 */}
      <div
        style={{
          height: "556px",
          width: "719px",
          border: "1px solid #dbdbdb",
          borderLeft: "none",
          background: "white",
          paddingTop: "32px",
        }}
      >
        {/* ProfileSetting  */}
        <ProfileSetting />
        {/* 비밀번호 변경 */}
      </div>
    </div>
  );
}

export default UserSetting;
