import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../App.css"
const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  return (
    <Card className="shadow-sm border-0 rounded-4 h-100 hover">
      <Card.Img
        variant="top"
        src={hotel.image}
        style={{ height: "200px", objectFit: "cover" }}
      />

      <Card.Body>
        <Badge bg="secondary" className="mb-2">
          {hotel.location}
        </Badge>

        <Card.Title className="fw-bold">
          {hotel.name}
        </Card.Title>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <span>⭐ {hotel.rating}</span>
          <span className="fw-bold">₹ {hotel.price}</span>
        </div>

        <Button
          variant="primary"
          className="w-100 rounded-pill px-4"
          onClick={() => navigate(`/hotel/${hotel.id}`)} // ✅ now works
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default HotelCard;
