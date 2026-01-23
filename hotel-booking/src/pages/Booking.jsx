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

  useEffect(() => {
    fetch(`https://hotel-booking-system-vq5g.onrender.com/hotels/${id}`)
      .then(res => res.json())
      .then(data => {
        setHotel(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (checkOut <= checkIn) {
      alert("Check-out must be after check-in");
      return;
    }

    const booking = {
      userId: user.id,
      hotelId: hotel.id,
      hotelName: hotel.name,
      checkIn,
      checkOut,
      guests
    };

    try {
      await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(booking)
      });

      navigate("/confirmation", { state: booking });
    } catch (error) {
      alert("Booking failed");
    }
  };

  // ⏳ Loading state
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  // ❌ Hotel not found
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
        className="shadow-sm border-0 rounded-4 p-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <h3 className="fw-bold mb-3">Book {hotel.name}</h3>

        <Form onSubmit={handleBooking}>
          <Form.Group className="mb-3">
            <Form.Label>Check-in</Form.Label>
            <Form.Control
              type="date"
              required
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Check-out</Form.Label>
            <Form.Control
              type="date"
              required
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Guests</Form.Label>
            <Form.Select onChange={(e) => setGuests(e.target.value)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 rounded-pill">
            Confirm Booking
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Booking;
