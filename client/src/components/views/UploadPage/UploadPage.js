import React, { useState } from "react";
import axios from "axios";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "./FileUpload";
import { Formik } from "formik";

const { Title } = Typography;
const { TextArea } = Input;

const Private = [
  { value: 0, label: "공개" },
  { value: 1, label: "비공개" },
];

function UploadPage(props) {
  const [images, setImages] = useState([]);

  const uploadImages = (newImages) => {
    setImages(newImages);
  };
  const onSubmit = (values) => {
    if (images.length === 0) {
      return alert("사진을 추가해주세요!");
    } else {
      const variables = {
        writer: props.user.userData._id,
        description: values.description,
        privacy: values.privacy,
        images: images,
        location: values.location,
        hashTags: values.hashTags,
      };

      axios.post("/api/photo/", variables).then((response) => {
        if (response.data.success) {
          alert("포스트 작성 완료!");
          props.history.push(`/user/${props.user.userData._id}`);
        } else {
          alert("Failed to upload Photo");
        }
      });
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "2rem auto",
      }}
    >
      <Title level={2}> Upload Photo</Title>
      <Formik
        initialValues={{
          description: "",
          privacy: 0,
          location: "",
          hashtags: [],
        }}
        onSubmit={onSubmit}
      >
        {(props) => {
          const { values, handleChange, handleSubmit } = props;
          return (
            <Form onSubmit={handleSubmit}>
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
                <Form.Item label="사진 설명">
                  <TextArea
                    id="description"
                    onChange={handleChange}
                    value={values.description}
                    placeholder="사진을 설명해주세요"
                  />
                </Form.Item>

                <Form.Item label="공개 여부">
                  <select
                    id="privacy"
                    value={values.privacy}
                    style={{ width: 200 }}
                    onChange={handleChange}
                  >
                    {Private.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </Form.Item>
                <Form.Item label="위치 추가">
                  <Input
                    id="location"
                    value={values.location}
                    onChange={handleChange}
                  ></Input>
                </Form.Item>
                <Form.Item label="해시태그 추가">
                  <Input
                    id="hashtags"
                    value={values.hashtags}
                    onChange={handleChange}
                  ></Input>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" size="large" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default UploadPage;
