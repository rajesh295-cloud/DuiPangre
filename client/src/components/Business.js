import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Business(props) {
  const { business } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (bsuiness) => {
    const existItem = cartItems.find((x) => x._id === business._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/businesses/${business._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...business, quantity },
    });
  };

  return (
    <Card>
        
        <img src={business.image} className="card-img-top" alt={business.name} />
    
      <Card.Body>
        <Link to={`/business/${business.slug}`}>
          <Card.Title>{business.name}</Card.Title>
        </Link>
        {/* <Rating rating={business.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
        )} */}
      </Card.Body>
    </Card>
  );
}
export default Business;
