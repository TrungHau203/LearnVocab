import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer";
import { useLoginMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import "./LoginScreen.scss"
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  // console.log(login);
  const { userInfor } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfor) {
      if (userInfor?.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [navigate, userInfor]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      const errName = err.data.message || err.data.error[0].path;
      console.log("msg:" + err);
      const errMsg =
        errName == err.data.message ? `${errName} không hợp lệ` : errName;
      toast.error(errMsg);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {isLoading && <Loading />}

        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link to={`/register`}>Register</Link>
        </Col>
      </Row>
      {/* <div className="text-center loginScreen">
        <div className="login__boxTitle">
          <p>Đăng nhập tài khoản học CamCam</p>
        </div>
        <div className="google button__social">
          <div className="google__box button__social__box">
            <img src="" />
            <p>Đăng nhập với G+</p>
          </div>
          <p className="login__switch">HOẶC</p>
          <div className="login__boxInput">
            <div className="input__group">
              <input
                type="text"
                placeholder="Nhập email tài khoản học"
                className="form-control "
              />
            </div>
            <div className="input__group">
              <div>
                <input
                  type="password"
                  placeholder="Nhập chính xác mật khẩu của bạn"
                  className="form-control "
                />
              </div>
            </div>
          </div>
          <div className="login__action">
            <div className="button__action button__action--inactive">
              <p>Đăng nhập</p>
            </div>
          </div>
          <p className="login__title__forgotPw">Quên mật khẩu?</p>
          <p >
            <span>Chưa có tài khoản? </span>
            <a href="/">
              <span className="login__title__register">Tạo tài khoản học mới</span>
            </a>
          </p>
        </div>
      </div> */}
    </FormContainer>
  );
};

export default LoginScreen;
