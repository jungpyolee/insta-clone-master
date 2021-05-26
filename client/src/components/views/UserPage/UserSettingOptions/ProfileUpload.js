import axios from "axios";

import React, { useState } from "react";

import Dropzone from "react-dropzone";
import { UploadOutlined } from "@ant-design/icons";

function ProfileUpload(props) {
  const [images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();
    const config = { header: { "content-type": "multipart/form-data" } };

    formData.append("file", files[0]);
    axios.post("/api/photo/image", formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);
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
              width: 30,
              height: 20,
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            사진 변경
            {/* <UploadOutlined style={{ fontSize: "2rem" }} /> */}
          </div>
        )}
      </Dropzone>
    </div>
  );
}

export default ProfileUpload;
