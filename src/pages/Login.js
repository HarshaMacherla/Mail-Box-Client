import { useRef } from "react";
import { Form, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authActions } from "../store/AuthSlice";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const history = useHistory();

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBCxjcQDhQzoAPONn2lyB1YlxoU8sPPCYk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailRef.current.value.trim(),
            password: passwordRef.current.value.trim(),
          }),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error.message);
      }
      const responseData = await response.json();
      localStorage.setItem("idToken", responseData.idToken);
      dispatch(authActions.login());
      console.log("Login Successful!");
      console.log(responseData);
    } catch (error) {
      if (error.message === "EMAIL_NOT_FOUND") {
        alert("YOU HAVEN'T REGISTERED. PLEASE SIGNUP!");
      } else {
        alert(error.message);
      }
    }
  };

  const handleSwitchToSignup = () => {
    history.push("/signup");
  };

  return (
    <>
      <Container className="border border-dark rounded mt-5 p-4">
        <Form onSubmit={handleLogin}>
          <div className="container text-center pb-2">
            <h3>Mail Box Client Login</h3>
          </div>
          <div className="form-floating">
            <Form.Control
              type="email"
              id="email"
              className="form-control"
              placeholder="example@email.com"
              required
              ref={emailRef}
            />
            <label htmlFor="email">Email</label>
            <div className="invalid-feedback">Invalid email</div>
            <div className="valid-feedback">Valid email</div>
          </div>

          <div className="form-floating">
            <Form.Control
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              required
              ref={passwordRef}
            />
            <label htmlFor="password">Password</label>
          </div>

          <Container className="text-center mt-3">
            <button className="btn btn-dark" type="submit">
              Login
            </button>
          </Container>
        </Form>
      </Container>

      <Container className="d-grid gap-2 mt-4 mx-5 mx-auto">
        <button className="btn btn-dark" onClick={handleSwitchToSignup}>
          Don't have an account? SignUp
        </button>
      </Container>
    </>
  );
};

export default Login;
