import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../services/authService";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const today = new Date().toISOString().split("T")[0];

  // Fetch hotel details
  useEffect(() => {
    fetch(`https://hotel-booking-system-vq5g.onrender.com/hotels/${id}`)
      .then(res => res.json())
      .then(data => {
        setHotel(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Handle booking → redirect to payment
  const handleBooking = (e) => {
    e.preventDefault();

    if (checkOut <= checkIn) {
      alert("Check-out must be after check-in");
      return;
    }

    const booking = {
      userId: user.id,
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelPrice: hotel.price,
      checkIn,
      checkOut,
      guests,
    
    };

    // 👉 Go to payment page instead of saving booking
    navigate("/payment", { state: booking });
  };

  // Loading state
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  // Hotel not found
  if (!hotel || !hotel.id) {
    return (
      <Container className="py-5">
        <h3>Hotel not found</h3>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card
        className="shadow-lg border-0 rounded-4 p-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <h3 className="fw-bold mb-3">Book {hotel.name}</h3>

        <Form onSubmit={handleBooking}>
          <Form.Group className="mb-3">
            <Form.Label>Check-in</Form.Label>
            <Form.Control
              type="date"
              min={today}
              required
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Check-out</Form.Label>
            <Form.Control
              type="date"
              min={checkIn}
              required
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Guests</Form.Label>
            <Form.Select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </Form.Select>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="w-100 rounded-pill"
          >
            Proceed to Payment
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Booking;
