import { Container, Row, Col } from "react-bootstrap";
import HotelCard from "../components/HotelCard";
import { useEffect, useState } from "react";
const Home = () => {
const [hotels, setHotels] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/hotels")
    .then(res => res.json())
    .then(data => setHotels(data));
}, []);
  return (
    <>
      {/* Hero Section */}
      <div className="bg-light py-5 mb-4">
        <Container>
          <h1 className="fw-bold">Find your perfect stay</h1>
          <p className="text-muted">
            Discover hotels at the best prices
          </p>
        </Container>
      </div>

      {/* Hotel List */}
      <Container>
        <Row className="g-4">
          {hotels.map(hotel => (
            <Col key={hotel.id} md={4}>
              <HotelCard hotel={hotel} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
