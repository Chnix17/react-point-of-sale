import React, { useState, useEffect, useRef } from 'react';
import '../dash.css';
import ProductList from '../components/Productlist';
import OrderDetails from '../components/Orderdetails';
import Receipt from '../components/Receipt';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const App = () => {
  const [order, setOrder] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showVoidModal, setShowVoidModal] = useState(false);
  const [voidPassword, setVoidPassword] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductIndex, setDeleteProductIndex] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [customerName, setCustomerName] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentReceived, setPaymentReceived] = useState('');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showCustomerNameModal, setShowCustomerNameModal] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [topSalesItems, setTopSalesItems] = useState([]);
  const quantityInputRef = useRef(null);
  const router = useRouter();

  const products = [
    { name: 'Bulad', price: 100, picture: '[1]' },
    { name: 'shampoo', price: 100, picture: '[2]' },
    { name: 'coke', price: 100, picture: '[3]' },
    { name: 'tissue', price: 100, picture: '[4]' },
    { name: 'ice candy', price: 100, picture: '[6]' },
    { name: 'biscuit', price: 100, picture: '[5]' },
    { name: 'surf powder', price: 100, picture: '[7]' },
    { name: 'pizza', price: 100, picture: '[8]' },
  ];

  const addToOrder = (product, quantity) => {
    setOrder((prevOrder) => {
      const existingProductIndex = prevOrder.findIndex((item) => item.name === product.name);
      if (existingProductIndex !== -1) {
        const updatedOrder = [...prevOrder];
        updatedOrder[existingProductIndex].quantity += quantity;
        return updatedOrder;
      } else {
        return [...prevOrder, { ...product, quantity }];
      }
    });
  };

  const handleProductClick = (product) => {
    if (!isDisabled) {
      setSelectedProduct(product);
      setShowModal(true);
      setQuantity(1);
    }
  };

  const handleSave = () => {
    if (selectedProduct && quantity > 0) {
      addToOrder(selectedProduct, quantity);
      setShowModal(false);
    }
  };

  const handleSearch = () => {
    if (!isDisabled) {
      const product = products.find((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (product) {
        handleProductClick(product);
      }
      setShowSearchModal(false);
      setSearchQuery('');
    }
  };

  const handleVoid = () => {
    if (!isDisabled) {
      setShowVoidModal(true);
    }
  };

  const handleVoidPasswordSubmit = async () => {
    try {
      const response = await axios.get('http://localhost/coc/api/hello.php', {
        params: {
          password: voidPassword,
        },
      });

      console.log(response.data);

      if (voidPassword === '0889markiechan') {
        setOrder([]);
        alert('Order has been voided.');
      } else {
        alert('Incorrect password.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while attempting to void the order.');
    }

    setShowVoidModal(false);
    setVoidPassword('');
  };

  const handleDelete = (index) => {
    setOrder((prevOrder) => prevOrder.filter((_, i) => i !== index));
    setShowDeleteModal(false);
    setDeleteProductIndex(null);
  };

  const handlePaymentSubmit = () => {
    const totalAmount = order.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const payment = parseFloat(paymentAmount);

    if (isNaN(payment) || payment <= 0) {
      alert('Please enter a valid amount.');
    } else if (payment < totalAmount) {
      alert('Insufficient payment. Please enter an amount greater than or equal to the total.');
    } else {
      setPaymentReceived(paymentAmount);
      setShowReceiptModal(true);
      setOrder([]); // Clear the order details
    }

    setShowPaymentModal(false);
    setPaymentAmount('');
  };

  const handlePaymentModalClose = () => {
    setShowPaymentModal(false);
    setPaymentAmount('');
  };

  useEffect(() => {
    const formatTime = (date) => {
      const hours12 = date.getHours() % 12 || 12;
      const minutes = date.getMinutes();
      const isAm = date.getHours() < 12;
      return `${hours12.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${isAm ? "AM" : "PM"}`;
    };

    const formatDate = (date) => {
      const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
    };

    const updateTimeAndDate = () => {
      const now = new Date();
      setCurrentTime(formatTime(now));
      setCurrentDate(formatDate(now));
    };

    updateTimeAndDate();
    const intervalId = setInterval(updateTimeAndDate, 200);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let keyBuffer = '';
    let timer;

    const handleKeyPress = (event) => {
      if (event.key >= '0' && event.key <= '9') {
        keyBuffer += event.key;
        clearTimeout(timer);

        timer = setTimeout(() => {
          if (keyBuffer.length > 0) {
            const productIndex = parseInt(keyBuffer, 10) - 1;
            if (productIndex >= 0 && productIndex < products.length) {
              handleProductClick(products[productIndex]);
            }
            keyBuffer = '';
          }
        }, 500);
      } else if (event.key === 'F6') {
        event.preventDefault();
        if (order.length > 0) {
          setShowDeleteModal(true);
        }
      } else if (event.key === 'F7') {
        event.preventDefault();
        setShowCustomerNameModal(true);
      } else if (event.key === 'F2') {
        event.preventDefault();
        setShowSearchModal(true);
      } else if (event.key === 'F3') {
        event.preventDefault();
        handleVoid();
      } else if (event.key === 'F4') {
        event.preventDefault();
        handleShiftOut();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      clearTimeout(timer);
    };
  }, [products, order]);

  const handleShiftOut = () => {
    const revenue = order.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const orders = order.length;

    const itemCounts = order.reduce((acc, item) => {
      acc[item.name] = (acc[item.name] || 0) + item.quantity;
      return acc;
    }, {});

    const topItems = Object.entries(itemCounts)
      .map(([name, quantity]) => ({ name, quantity }))
      .sort((a, b) => b.quantity - a.quantity);

    // Update state variables
    setTotalRevenue(revenue);
    setTotalOrders(orders);
    setTopSalesItems(topItems);

    // Save to session storage
    sessionStorage.setItem('totalRevenue', revenue.toString());
    sessionStorage.setItem('totalOrders', orders.toString());
    sessionStorage.setItem('topSalesItems', JSON.stringify(topItems));

    // Navigate to /sales
    router.push('/sales');
  };

  const enableUI = (customerName) => {
    setCustomerName(customerName);
    setIsDisabled(false);
    setShowCustomerNameModal(false);
  };

  return (
    <div className="app">
      <div className="main-content">
        <div className="left-panel">
          <div className="product-list">
            {products.length > 0 ? (
              products.map((product, index) => (
                <div className="card" key={index} onClick={() => addToOrder(product)}>
                  <div className="content">
                    <div className="name">{product.name}</div>
                    <div className="handle">{product.picture}</div>
                    <div className="title">Price: ${product.price}</div>
                  </div>
                  <div className="dots orange-dots"></div>
                  <div className="dots pink-dots"></div>
                </div>
              ))
            ) : (
              <div className="no-products">No products to display.</div>
            )}
          </div>
        </div>
        <div className="order-details">
          <OrderDetails
            order={order}
            isDisabled={isDisabled}
            setShowPaymentModal={setShowPaymentModal} // Pass the setShowPaymentModal function
          />
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedProduct ? selectedProduct.name : ''}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                value={selectedProduct ? selectedProduct.price : ''}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                ref={quantityInputRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSearchModal} onHide={() => setShowSearchModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Search Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="searchQuery">
              <Form.Label>Enter Product Name</Form.Label>
              <Form.Control
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSearchModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showVoidModal} onHide={() => setShowVoidModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Password to Void</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="voidPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={voidPassword}
              onChange={(e) => setVoidPassword(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowVoidModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleVoidPasswordSubmit}>
            Void Order
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product from the order?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(deleteProductIndex)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPaymentModal} onHide={handlePaymentModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Payment Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="paymentAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="text"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePaymentModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePaymentSubmit}>
            Submit Payment
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCustomerNameModal} onHide={() => setShowCustomerNameModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Customer Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="customerName">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCustomerNameModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            setIsDisabled(false);
            setShowCustomerNameModal(false);
          }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      
      <Receipt 
        show={showReceiptModal} 
        onHide={() => setShowReceiptModal(false)} 
        order={order} 
        paymentReceived={paymentReceived} 
        customerName={customerName} 
      />
    </div>
  );
};

export default App;
