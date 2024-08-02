'use client';//must be on top
import React from 'react'
import { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

const Home = () => {
  

  const [sal, setSal] = useState (0);
  const [overT, setOveT] = useState (0);
  const [rate, setRate] = useState (0);
  const [grossPay, setGrossPay] = useState (0);
  const [sss, setSSS] = useState (0);
  const [pagIbig, setpagIbig] = useState (0);
  const [philHealth, setphilHealth] = useState (0);
  const [totalD, settotalD] = useState (0);
  const [totalN, settotalN] = useState (0);


  const compute = (e) => {

    e.preventDefault();

    const a = parseFloat(sal);
    const b = parseFloat(overT);
    const c = parseFloat(rate);

    const half = sal / 2;
    const total_ot = b * c;
    const kk = half + total_ot;

    setGrossPay(kk);

    const aa = parseFloat(sss);
    const bb = parseFloat(pagIbig);
    const cc = parseFloat(philHealth);

    const ded = aa + bb + cc;
    settotalD(ded);

    const np = kk - ded;
    settotalN(np);




  }

  const pprint = (e) => {
    const p = parseFloat(totalN)

    alert("Your net pay is: "+p);
  }




  return (
    <>
    <body className='red-color'>

      <Container>

        <Row >

          <Col lg={6}>

          <div class="form-container">
        <form action="#" method="post">
            <h2 className='center'>Payroll Calculator</h2>
            <div className="form-group">
                <label for="name">Basic Salary </label>
                <input type="number" id="name" name="name" value={sal} onChange={(e)=>{setSal(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label for="email">OT RATE </label>
                <input type="number" id="email" name="email" value={overT} onChange={(e)=>{setOveT(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label for="name">OT HOURS </label>
                <input type="number" id="name" name="name" value={rate} onChange={(e)=>{setRate(e.target.value)}}/>
            </div>
            
            
            <h1>GROSS PAY:     {grossPay}  </h1>

            <br />

            <h1>Less</h1>

            <div className="form-group">
                <label for="name">SSS </label>
                <input type="number" id="name" name="name"value={sss} onChange={(e)=>{setSSS(e.target.value)}}/>
            </div>

            <div className="form-group">
                <label for="name">PAG-IBIG </label>
                <input type="number" id="name" name="name" value={pagIbig} onChange={(e)=>{setpagIbig(e.target.value)}}/>
            </div>

            <div className="form-group">
                <label for="name">PHILHEALTH </label>
                <input type="number" id="name" name="name" value={philHealth} onChange={(e)=>{setphilHealth(e.target.value)}}/>
            </div>

            
            <button onClick={compute}>Compute</button>
        </form>
    </div>
          
          
          </Col>

          <Col lg={6}>

<div class="form-container">
<form action="#" method="post">
  <h2 className='center'>Payroll Calculator</h2>
  <div className="form-group">
      <label for="name">Basic Salary: {sal} </label>
      
  </div>
  <div className="form-group">
      <label for="email">OT RATE: {overT}  </label>
      
      
  </div>
  <div className="form-group">
      <label for="name">OT HOURS: {rate} </label>
    
  </div>
  
  <h1>GROSS PAY:   {grossPay}   </h1>

  <br />

  <h1>Less</h1>

  <div className="form-group">
      <label for="name">SSS: {sss} </label>
     
  </div>

  <div className="form-group">
      <label for="name">PAG-IBIG: {pagIbig} </label>
      
  </div>

  <div className="form-group">
      <label for="name">PHILHEALTH: {philHealth}</label>
     
  </div>

  <p>TOTAL DEDUCTION:     {totalD}  </p>

  <p>NET PAY:     {totalN}  </p>

  
  <button onClick={pprint}>Print</button>
</form>
</div>


</Col>




        </Row>


     

    </Container>

   

    </body>
    
    
    </>
  )
};

export default Home;