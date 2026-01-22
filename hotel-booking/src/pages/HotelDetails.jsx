import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/hotels/${id}`)
      .then(res => res.json())
      .then(data => {
        setHotel(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

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
    <Container className="py-4">
      {/* Image Banner */}
      <Card className="border-0 mb-4">
        <Card.Img
          src={hotel.image}
          style={{ height: "400px", objectFit: "cover" }}
          className="rounded-4"
        />
      </Card>

      <Row>
        <Col md={8}>
          <h2 className="fw-bold">{hotel.name}</h2>

          <p className="text-muted">
            {hotel.location} • ⭐ {hotel.rating || "4.5"}
          </p>

          <p>{hotel.description || "Comfortable stay with great amenities."}</p>

          {hotel.amenities && (
            <>
              <h5 className="fw-bold mt-4">Amenities</h5>
              <div className="d-flex flex-wrap gap-2">
                {hotel.amenities.map((amenity, index) => (
                  <Badge bg="secondary" key={index}>
                    {amenity}
                  </Badge>
                ))}
              </div>
            </>
          )}
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0 rounded-4 p-3">
            <h4 className="fw-bold">₹ {hotel.price}</h4>
            <p className="text-muted">per night</p>

            <Button
              variant="primary"
              className="w-100 rounded-pill"
              onClick={() => navigate(`/booking/${hotel.id}`)}
            >
              Book Now
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HotelDetails;
