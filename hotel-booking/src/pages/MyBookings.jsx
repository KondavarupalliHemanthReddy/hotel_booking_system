import { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { getCurrentUser } from "../services/authService";

const MyBookings = () => {
  const user = getCurrentUser();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(
      `https://hotel-booking-system-vq5g.onrender.com/bookings?userId=${user.id}`
    )
      .then(res => res.json())
      .then(data => setBookings(data));
  }, [user.id]);

  return (
    <Container className="py-4">
      <h2 className="fw-bold mb-4">My Bookings</h2>

      {bookings.length === 0 ? (
        <Card className="p-4 text-center shadow-sm border-0">
          No bookings yet
        </Card>
      ) : (
        bookings.map(booking => (
          <Card
            key={booking.id}
            className="mb-3 shadow-sm border-0 rounded-4"
          >
            <Card.Body>
              <h5 className="fw-bold">{booking.hotelName}</h5>
              <p className="mb-1">
                {booking.checkIn} → {booking.checkOut}
              </p>
              <p className="text-muted">
                Guests: {booking.guests}
              </p>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default MyBookings;
