// OrderDetails.js
import React from 'react';
import '../order.css'; // Import the CSS file
import CheckoutButton from './Checkoutbutton';

const OrderDetails = ({ order, isDisabled, setShowPaymentModal }) => {
  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTax = (subtotal) => {
    const TAX_RATE = 0.12;
    return subtotal * TAX_RATE;
  };

  const subtotal = calculateTotal();
  const tax = calculateTax(subtotal);
  const total = subtotal + tax;

  return (
    <div className="order-details">
      {order.length === 0 ? (
        <div className="no-order-details">NO ORDER DETAILS</div>
      ) : (
        <>
          <div className="order-items">
            {order.map((item, index) => (
              <div key={index} className="order-item">
                <span>{item.name} {item.quantity}x</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="order-summary">
            <div>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div>
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <CheckoutButton 
            isDisabled={isDisabled}
            setShowPaymentModal={setShowPaymentModal} 
          />
        </>
      )}
    </div>
  );
};

export default OrderDetails;
