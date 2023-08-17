import { Navbar, Container, Button, NavLink } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authActions } from "../store/AuthSlice";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("emailId");
    localStorage.removeItem("userId");
    dispatch(authActions.logout());
  };

  return (
    <>
      <Navbar className="bg-body-secondary">
        <Container fluid>
          <Navbar.Brand>
            <NavLink to="/">Mail Box Client</NavLink>
          </Navbar.Brand>
        </Container>

        <Container className="d-flex justify-content-end">
          <Button variant="outline-dark" onClick={handleLogout}>
            Logout
          </Button>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
