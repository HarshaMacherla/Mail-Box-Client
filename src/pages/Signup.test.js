import { render, screen } from "@testing-library/react";
import Signup from "./Signup";

describe("Signup Component", () => {
  test("renders 'Mail Box Client Registration'", () => {
    render(<Signup />);
    const signupHeading = screen.getByText("Mail Box Client Registration");
    expect(signupHeading).toBeInTheDocument();
  });

  test("renders 'Email'", () => {
    render(<Signup />);
    const emailElement = screen.getByText("Email");
    expect(emailElement).toBeInTheDocument();
  });

  test("renders 'Password'", () => {
    render(<Signup />);
    const passwordElement = screen.getByText("Password");
    expect(passwordElement).toBeInTheDocument();
  });

  test("renders 'Confirm Password'", () => {
    render(<Signup />);
    const confirmPasswordElement = screen.getByText(/confirm password/i);
    expect(confirmPasswordElement).toBeInTheDocument();
  });

  test("renders 'Login'", () => {
    render(<Signup />);
    const loginElement = screen.getByText(/signup/i);
    expect(loginElement).toBeInTheDocument();
  });
});
