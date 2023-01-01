import axios from "axios";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Rating from "../components/Rating";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { Store } from "../Store";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case "REFRESH_BUSINESS":
      return { ...state, business: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreateReview: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreateReview: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreateReview: false };
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, business: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function SingleBusinessScreen() {
 
  let reviewsRef = useRef();

  const [selectedImage, setSelectedImage] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, business, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      business: [],
      loading: true,
      error: "",
    });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/businesses/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    let { mobile, datetime, address } = e.target.elements;
    mobile = mobile.value;
    address = address.value;
    datetime = datetime.value.split("T");

    if (new Date(datetime).getTime() < Date.now() + 60 * 15 * 1000) {
      alert("Old date and time is not allowed");
      return;
    }
    const { data } = await axios.post(
      "/api/booking/",
      {
        businessid: business._id,
        mobile,
        address,
        date: datetime[0],
        time: datetime[1],
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    console.log(data);
    if (data) {
      alert("Booking Successful");
      navigate(`/my-bookings`);
    } else {
      alert("Failed to apply booking");
    }
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={4}>
          <img
            className="img-large"
            src={selectedImage || business.image}
            alt={business.name}
          ></img>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{business.name}</title>
              </Helmet>
              <h1>{business.name}</h1>
            </ListGroup.Item>

            <ListGroup.Item>
              Description:
              <p>{business.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Booking Date</Form.Label>
                    <Form.Control
                      name="datetime"
                      type="datetime-local"
                      required
                      min={new Date()}
                    />
                  </Form.Group>
                  {/* <Form.Group className="mb-3" controlId="email">
          <Form.Label>Booking Time</Form.Label>
          <Form.Control
            type="date"

            required
          />
        </Form.Group> */}

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control name="mobile" type="number" required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Pickup Address</Form.Label>
                    <Form.Control name="address" type="text" required />
                  </Form.Group>
                  <Button type="submit" variant="primary">
                    Book Appointment
                  </Button>
                </Form>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default SingleBusinessScreen;
