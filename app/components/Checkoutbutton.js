import React from 'react';

const CheckoutButton = ({ isDisabled, setShowPaymentModal }) => {
  return (
    <button 
      onClick={() => setShowPaymentModal(true)}
      className="checkout-button"
      disabled={isDisabled}
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
