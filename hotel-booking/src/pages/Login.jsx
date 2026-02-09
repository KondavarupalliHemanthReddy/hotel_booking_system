import { useEffect, useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { loginUser, getCurrentUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
    useEffect(() => {
    if (getCurrentUser()) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await loginUser(email, password);
    navigate("/");
  } catch (err) {
    alert(err.message);
  }
};

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className="mb-3 shadow-lg border-0 rounded-4 p-4" style={{ width: "400px" }}>
        <h3 className="fw-bold mb-3 text-center">Login</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 rounded-pill">
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
