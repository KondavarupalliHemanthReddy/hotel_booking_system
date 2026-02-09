import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (password!=confirmPassword){
    alert("passwords didn't match")
    return 
  }

  try {
    await registerUser({
      name,
      email,
      password
    });
    navigate("/login");
  } catch (err) {
    alert(err.message);
  }
};
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className="mb-3 shadow-lg border-0 rounded-4 p-4" style={{ width: "400px" }}>
        <h3 className="fw-bold mb-2 text-center">Register</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group >
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group >
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 rounded-pill">
            Create Account
          </Button>
        
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
