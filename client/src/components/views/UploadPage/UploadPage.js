import React, { useState } from "react";
import axios from "axios";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "./FileUpload";

const { Title } = Typography;
const { TextArea } = Input;

const Private = [
  { value: 0, label: "공개" },
  { value: 1, label: "비공개" },
];

function UploadPage(props) {
  // const [images, setImages] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState(0);
  const [location, setLocation] = useState("");
  const [hashTags, setHashTags] = useState([]);
  const [images, setImages] = useState([]);
  const handleChangeLocation = (event) => {
    setLocation(event.currentTarget.value);
  };

  const handleChangeHashTags = (event) => {
    setHashTags(event.currentTarget.value);
  };

  const handleChangeDecsription = (event) => {
    setDescription(event.currentTarget.value);
  };

  const handleChangeOne = (event) => {
    setPrivacy(event.currentTarget.value);
  };

  const uploadImages = (newImages) => {
    setImages(newImages);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: props.user.userData._id,
      description: description,
      privacy: privacy,
      images: images,
      location: location,
      hashTags: hashTags,
    };

    axios.post("/api/photo/", variables).then((response) => {
      if (response.data.success) {
        alert("Photo Uploaded Successfully");
        props.history.push("/userpage");
      } else {
        alert("Failed to upload Photo");
      }
    });
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "2rem auto",
      }}
    >
      <Title level={2}> Upload Photo</Title>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}></div>

      <Form onSubmit={onSubmit}>
        <FileUpload refreshFunction={uploadImages}></FileUpload>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <br />
          <br />

          <br />
          <br />
          <label>사진 설명</label>
          <TextArea
            onChange={handleChangeDecsription}
            value={description}
            placeholder="문구 입력..."
          />
          <br />
          <br />
          <label>공개 여부</label>
          <select style={{ width: 200 }} onChange={handleChangeOne}>
            {Private.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <br />
          <br />

          <label>위치 추가</label>
          <Input onChange={handleChangeLocation} value={location} />

          <br />

          <label>해시태그 추가</label>
          <Input onChange={handleChangeHashTags} value={hashTags} />
          <br />
          <br />
          <Button type="primary" size="large" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default UploadPage;
