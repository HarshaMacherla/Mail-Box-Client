import { Navbar, Container, NavLink } from "react-bootstrap";

const NavBar = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <NavLink to="/">Mail Box Client</NavLink>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
