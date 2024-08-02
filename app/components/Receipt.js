import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import '../receipt.css';

const Receipt = ({ show, onHide, order = [], paymentReceived = 0, customerName = '', cashierName = '' }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    setUsername(storedUsername || '');
  }, []);

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
    <Modal show={show} onHide={onHide} dialogClassName="receipt-modal">
      <Modal.Header closeButton>
        <Modal.Title>Receipt</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="receipt-content">
          <div className="receipt-for">
            <h6>RECEIPT FOR: {customerName}</h6>
            <h6>THANK YOU FOR YOUR PURCHASE!</h6>
          </div>
          <div className="receipt-details">
            <p>Date: {new Date().toLocaleDateString()}</p>
            <p>Transaction Num: {Math.floor(Math.random() * 1000000)}</p>
            <p>Cashier: {username}</p>
          </div>
          <div className="receipt-items">
            <div className="receipt-item header">
              <span>QTY</span>
              <span>PRODUCT NAME</span>
              <span>PRICE</span>
              <span>TOTAL</span>
            </div>
            {order.map((item, index) => (
              <div key={index} className="receipt-item">
                <span>{item.quantity}</span>
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="receipt-summary">
            <div>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div>
              <span>VAT 12%</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div>
              <span>Payment Received</span>
              <span>${paymentReceived}</span>
            </div>
            <div>
              <span>Change</span>
              <span>${(parseFloat(paymentReceived) - total).toFixed(2)}</span>
            </div>
          </div>
          <div className="receipt-footer">
            <span>[F] NEW TRANSACTION</span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Receipt;
