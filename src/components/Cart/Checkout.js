import React, { useContext } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import Button from '@material-ui/core/Button';

import AppContext from '../../AppContext';
const stripePromise = loadStripe(
  'pk_test_51ITHCBF1Ikr3hcxKaG1RteN9KpssC8rFAXKy1xLattO8xWVyGOXr6jT156VTKztkGox8JcKptiEUlIhxuT9R49HA00dfcXjX5f'
);

function Checkout({ totalAmount }) {
  const { appDispatch } = useContext(AppContext);
  // const [checkoutProcessing, setCheckoutProcessing] = useState(false);

  const handleClick = async () => {
    appDispatch({ type: 'processing', payload: true });
    const stripe = await stripePromise;

    const res = await axios.post('/my-orders/checkout');

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: res.data.session.id
    });
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      alert(result.error.message);
      appDispatch({ type: 'processing', payload: false });
    }
  };

  const badgeStyle = {
    display: 'inline-block',
    background: '#1eb11e',
    color: '#fff',
    borderRadius: '4px',
    padding: '0.25rem 0.5rem',
    margin: '0.5rem 0',
    fontSize: '0.8rem'
  };

  return (
    <div className='d-flex flex-column align-items-end cart-checkout'>
      <h3>Total amount: &#8377;{totalAmount.toLocaleString()}</h3>
      {totalAmount >= 1000 && (
        <span style={badgeStyle}>Free Delivery available</span>
      )}

      <Button
        variant='contained'
        color='secondary'
        size='large'
        onClick={handleClick}
        style={{ marginTop: '0.5rem' }}
      >
        Checkout
      </Button>
    </div>
  );
}

export default Checkout;
