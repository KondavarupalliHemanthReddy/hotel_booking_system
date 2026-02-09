import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

const Confirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <Container className="py-5">
        <h3>No booking found</h3>
      </Container>
    );
  }

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card className="mb-3 shadow-lg border-0 rounded-4 p-4 text-center" style={{ maxWidth: "500px" }}>
        <h2 className="text-success mb-3">🎉 Booking Confirmed!</h2>

        <p><strong>Hotel:</strong> {state.hotelName}</p>
        <p><strong>Check-in:</strong> {state.checkIn}</p>
        <p><strong>Check-out:</strong> {state.checkOut}</p>
        <p><strong>Guests:</strong> {state.guests}</p>

        <Button
          variant="primary"
          className="rounded-pill mt-3"
          onClick={() => navigate("/")}
        >
          Go to Home
        </Button>
      </Card>
    </Container>
  );
};

export default Confirmation;
