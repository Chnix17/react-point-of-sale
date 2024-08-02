'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../sales.css'; 

const Sales = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [topSalesItems, setTopSalesItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const revenue = JSON.parse(sessionStorage.getItem('totalRevenue')) || 0;
    const orders = JSON.parse(sessionStorage.getItem('totalOrders')) || 0;
    const salesItems = JSON.parse(sessionStorage.getItem('topSalesItems')) || [];

    setTotalRevenue(revenue);
    setTotalOrders(orders);
    setTopSalesItems(salesItems);

  }, []);

  return (
    <Container className="sales-container">
      
      <Row className="my-4">
        <Col>
          <h1 className="text-center mb-4">Sales Summary</h1>
          <Row className="mb-4">
            <Col md={6}>
              <Card className="shadow-sm rounded border-0">
                <Card.Body>
                  <Card.Title className='text-center'>Total Revenue</Card.Title>
                  <Card.Text className="text-success text-center">${totalRevenue.toFixed(2)}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="shadow-sm rounded border-0">
                <Card.Body>
                  <Card.Title className='text-center'>Total Orders</Card.Title>
                  <Card.Text className="text-primary text=center">{totalOrders}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Card className="shadow-sm rounded border-0">
            <Card.Body>
              <Card.Title>Top Sales Items</Card.Title>
              {topSalesItems.length > 0 ? (
                <ul className="top-sales-list">
                  {topSalesItems.map((item, index) => (
                    <li key={index} className="top-sales-item">
                      <span>{item.name}</span>
                      <span>{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <Card.Text>No sales data available.</Card.Text>
              )}
            </Card.Body>
          </Card>
          <Button variant="secondary" className="mt-4 text" onClick={() => router.push('/dashboard')}>
            Back to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Sales;
