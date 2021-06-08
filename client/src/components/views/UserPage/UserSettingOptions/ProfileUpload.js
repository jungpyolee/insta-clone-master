import axios from "axios";

import React, { useState } from "react";

import Dropzone from "react-dropzone";

function ProfileUpload(props) {
  const [images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();
    const config = { header: { "content-type": "multipart/form-data" } };

    formData.append("file", files[0]);
    axios.post("/api/photo/image", formData, config).then((response) => {
      if (response.data.success) {
        setImages(response.data.filePath);

        props.refreshFunction(response.data.filePath);
      } else {
        alert(" 사진 저장실패");
      }
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              marginTop: 7,
              width: 120,
              height: 20,
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <div style={{ cursor: "pointer", color: "#7870e0" }}>
              프로필사진 변경
            </div>{" "}
            {/* <UploadOutlined style={{ fontSize: "2rem" }} /> */}
          </div>
        )}
      </Dropzone>
    </div>
  );
}

export default ProfileUpload;
