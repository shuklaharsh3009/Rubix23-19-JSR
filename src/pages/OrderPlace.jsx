import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/firebase';
import { useState } from 'react';
import Image from 'react-bootstrap/Image';
import { Container, Row, Col, Card } from 'react-bootstrap';
import thankyou from "../assets/images/thankyou.png";
import { useNavigate } from 'react-router-dom';

const OrderPlace = () => {
   const navigate = useNavigate();
   const goToShop = () => { navigate("/shop"); }
   const firebase = useFirebase();

   const [error, setError] = useState('');
   const [address, setAddress] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      try {
         
         goToShop();
      } catch (error) {
         setError("Order Not Placed");
      }
   }

   return (
      <div className='container mt-5'>
         {
            firebase.isLoggedIn ? 
            <Container>
            <Row>
               <Card className='align-items-center mb-5'
                  style={{ maxWidth: "500px", borderRadius: "15px" }}
               >
                  <Col>
                     <div className='mt-3'>
                        <h1>Place Order</h1>
                        <Form onSubmit={handleSubmit}>
                           <Form.Group className="mb-3" controlId="address">
                              <Form.Label>Delivery Address</Form.Label>
                              <Form.Control
                                 type="text"
                                 onChange={(e) => setAddress(e.target.value)}
                                 value={address}
                              />
                           </Form.Group>

                           <Button className="mb-3" variant="warning" type="submit">
                              Place Order
                           </Button>
                        </Form>
                        {error !== "" ? <p style={{ color: "red" }}>{error}</p> : null}
                     </div>
                  </Col>
               </Card>
               <Col>
                  <Image
                     rounded
                     src={thankyou}
                     width={700}
                  />
               </Col>
            </Row>
         </Container> :
         <div className='justify-content-center align-items-center'>
            <h2>Please Login, to Place the Order</h2>
            <Button className="mb-3" variant="warning" type="submit" href='/login'>
                              Log In
                           </Button>
         </div>
         }
      </div>
   )
}

export default OrderPlace