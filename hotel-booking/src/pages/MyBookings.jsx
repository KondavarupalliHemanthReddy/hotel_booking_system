import { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
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

  const handleCancel = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    await fetch(
      `https://hotel-booking-system-vq5g.onrender.com/bookings/${bookingId}`,
      {
        method: "DELETE"
      }
    );

    // Update UI instantly
    setBookings(prev =>
      prev.filter(booking => booking.id !== bookingId)
    );
  };

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
            className="mb-3 shadow-lg border-0 rounded-4"
          >
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="fw-bold text-dark">
                  {booking.hotelName}
                </h5>

                <p className="mb-1 text-secondary">
                  📅 {booking.checkIn} → {booking.checkOut}
                </p>

                <p className="mb-0 text-muted">
                  👤 Guests:{" "}
                  <span className="fw-semibold">
                    {booking.guests}
                  </span>
                </p>
              </div>

              <Button
                variant="outline-danger"
                className="rounded-pill px-4"
                onClick={() => handleCancel(booking.id)}
              >
                Cancel
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default MyBookings;
