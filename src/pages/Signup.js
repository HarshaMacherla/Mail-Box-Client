import { useRef } from "react";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (
      passwordRef.current.value.trim() !==
      confirmPasswordRef.current.value.trim()
    ) {
      alert("Passwords didn't match");
      return;
    }

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=        AIzaSyBCxjcQDhQzoAPONn2lyB1YlxoU8sPPCYk",
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
      console.log("Registered Successfully!");
      console.log(responseData);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="container border rounded mt-5 p-4">
        <form onSubmit={handleSignUp}>
          <div className="container text-center pb-2">
            <h3>Mail Box Client Registration</h3>
          </div>
          <div className="form-floating">
            <input
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
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Create a Password"
              required
              ref={passwordRef}
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              id="confirm-password"
              className="form-control"
              placeholder="Confirm Password"
              required
              ref={confirmPasswordRef}
            />
            <label htmlFor="confirm-password">Confirm Password</label>
          </div>

          <div className="container text-center mt-3">
            <button className="btn btn-dark" type="submit">
              SignUp
            </button>
          </div>
        </form>
      </div>

      <div className="container d-grid gap-2 mt-4 mx-5 mx-auto">
        <button className="btn btn-outline-dark">Have an account? Login</button>
      </div>
    </>
  );
};

export default Signup;
