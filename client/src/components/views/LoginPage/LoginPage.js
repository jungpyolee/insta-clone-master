import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input, Button, Typography } from "antd";
import { useDispatch } from "react-redux";

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  // const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState("");
  // const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const initialEmail = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : "";

  // const LoginPageContainer = styled.div`
  //   background-color: #f8f9fa;
  // `;
  // const Container = styled.div`
  //   width: 203vh;
  //   display: flex;

  //   height: 80vh;
  //   position: relative;
  // `;

  // const LoginForm = styled.div`
  //   border: 1px solid #ced4da;
  //   border-radius: 4px;
  //   background-color: white;
  //   padding: 42px;
  //   padding-top: 62px;
  //   width: 100%;
  // `;

  // const LeftSide = styled.div`
  //   width: 30vh;

  //   margin-left: 70vh;
  //   margin-top: 26vh;
  //   background-image: url("https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg");
  //   background-repeat: no-repeat;
  // `;
  // const RightSide = styled.div`
  //   width: 40vh;
  //   margin-bottom: 40vh;
  // `;

  // const BottomSide = styled.div`
  //   display: flex;
  //   color: grey;
  //   font-size: 12px;
  //   width: 150vh;

  //   margin: 0 auto;
  //   justify-content: center;
  //   align-items: center;
  //   text-align: center;
  //   line-height: 1.5rem;
  // `;

  // const Fbb = styled.div`
  //   text-align: center;
  // `;
  // const Fb = styled.a`
  //   color: #339af0;
  //   font-weight: bold;
  //   font-size: 1.2rem;
  // `;
  return (
    <div style={{ backgroundColor: "#f8f9fa" }}>
      <div style={{ width: "203vh", display: "flex", height: "80vh" }}>
        <div
          style={{
            width: "30vh",
            marginLeft: "10vh",
            marginTop: "26vh",
            backgroundImage:
              'url("https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg")',
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div style={{ width: "40vh", marginBottom: "40vh" }}>
          <Formik
            initialValues={{
              email: initialEmail,
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Email is invalid")
                .required("Email is required"),
              password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                let dataToSubmit = {
                  email: values.email,
                  password: values.password,
                };
                dispatch(loginUser(dataToSubmit))
                  .then((response) => {
                    if (response.payload.loginSuccess) {
                      window.localStorage.setItem(
                        "userId",
                        response.payload.userId
                      );
                      // if (rememberMe === true) {
                      //   window.localStorage.setItem("rememberMe", values.id);
                      // } else {
                      //   localStorage.removeItem("rememberMe");
                      // }
                      props.history.push("/");
                    } else {
                      setFormErrorMessage(
                        "Check out your Account or Password again"
                      );
                    }
                  })
                  .catch((err) => {
                    setFormErrorMessage(
                      "Check out your Account or Password again"
                    );
                    setTimeout(() => {
                      setFormErrorMessage("");
                    }, 3000);
                  });
                setSubmitting(false);
              }, 500);
            }}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                // dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                // handleReset,
              } = props;
              return (
                <div className="app">
                  <div
                    style={{
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      backgroundColor: "white",
                      padding: "42px",
                      paddingTop: "62px",
                      width: "100%",
                    }}
                  >
                    <Title
                      style={{ display: "flex", justifyContent: "center" }}
                      level={2}
                    >
                      <i>Instagram</i>
                      {/* <img
                        src="https://logos-world.net/wp-content/uploads/2020/04/Instagram-Logo.png"
                        alt="Instagram"
                      ></img> */}
                    </Title>
                    <form onSubmit={handleSubmit} style={{ width: "300px" }}>
                      <Form.Item required>
                        <Input
                          id="email"
                          name="email"
                          // prefix={
                          //   // <Icon
                          //   //   type="user"
                          //   //   style={{ color: "rgba(0,0,0,.25)" }}
                          //   // />
                          // }
                          placeholder="전화번호, 사용자 이름 또는 이메일"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.email && touched.email
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        {errors.email && touched.email && (
                          <div className="input-feedback">{errors.email}</div>
                        )}
                      </Form.Item>
                      <Form.Item required>
                        <Input
                          id="password"
                          // prefix={
                          //   // <Icon
                          //   //   type="lock"
                          //   //   style={{ color: "rgba(0,0,0,.25)" }}
                          //   // />
                          // }
                          placeholder="비밀번호"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.password && touched.password
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        {errors.password && touched.password && (
                          <div className="input-feedback">
                            {errors.password}
                          </div>
                        )}
                      </Form.Item>
                      {formErrorMessage && (
                        <label>
                          <p
                            style={{
                              color: "#ff0000bf",
                              fontSize: "0.7rem",
                              border: "1px solid",
                              padding: "1rem",
                              borderRadius: "10px",
                            }}
                          >
                            {formErrorMessage}
                          </p>
                        </label>
                      )}
                      <div>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                          style={{ minWidth: "100%" }}
                          disabled={isSubmitting}
                          onSubmit={handleSubmit}
                        >
                          로그인
                        </Button>
                      </div>
                      <hr />
                      <div style={{ textAlign: "center" }}>
                        또는 &nbsp;&nbsp;
                        <a
                          style={{
                            color: "#339af0",
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                          }}
                          href="www.facebook.com"
                        >
                          Facebook으로 로그인
                        </a>
                      </div>
                    </form>
                  </div>
                  <form onSubmit={handleSubmit} style={{ width: "375px" }}>
                    <Form.Item
                      style={{
                        border: "1px solid #ced4da",
                        borderRadius: "4px",
                        display: "flex",
                        justifyContent: "center",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        marginTop: "10px",
                        background: "white",
                      }}
                    >
                      <div style={{ width: "375px", marginLeft: 60 }}>
                        계정이 없으신가요? &nbsp;
                        <a style={{ color: "#339af0" }} href="/register">
                          가입하기
                        </a>
                        <br />
                        &nbsp;&nbsp;
                        <a
                          style={{ color: "#2f80c2" }}
                          className="login-form-forgot"
                          href="/reset_user"
                        >
                          비밀번호를 잊으셨나요?
                        </a>
                      </div>
                    </Form.Item>
                  </form>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LoginPage);
