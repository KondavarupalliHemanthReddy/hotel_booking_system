import { Container, Row, Col,Spinner } from "react-bootstrap";
import HotelCard from "../components/HotelCard";
import { useEffect, useState } from "react";
const Home = () => {
const [hotels, setHotels] = useState([]);
const [loading,setLoading]=useState(true)

useEffect(() => {
  fetch("https://hotel-booking-system-vq5g.onrender.com/hotels")
    .then(res => res.json())
    .then(data => {setHotels(data);
      setLoading(false);
    }); 

}, []);

if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }
  return (
    <>
      {/* Hero Section */}
      <div className="bg-light py-5 mb-4">
        <Container>
          <h1 className="fw-bold">Find your perfect stay</h1>
          <p className="text-muted">
            Discover hotels at the best prices in india
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
