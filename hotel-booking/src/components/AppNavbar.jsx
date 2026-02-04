import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../services/authService";

const AppNavbar = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
     let sure=confirm("are you really want to logout")
  if (sure){
    logoutUser();
    navigate("/login");}
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          🏨 Book My Hotel
        </Navbar.Brand>

        <Nav className="ms-auto">
          {user ? (
            <>
             <Button as={Link} to="/my-bookings" variant="primary" className="me-3">
    My Bookings
  </Button>
              <Navbar.Text className="me-3">
                Hi, {user.name}
              </Navbar.Text>
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} to="/login" variant="outline-primary" className="me-2">
                Login
              </Button>
              <Button as={Link} to="/register" variant="primary">
                Register
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
