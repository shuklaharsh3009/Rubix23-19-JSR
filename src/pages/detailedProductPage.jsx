import React, { useState, useEffect } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';


const DetailedProductPage = (props) => {
   const [url, setUrl] = useState(null);
   const navigate = useNavigate();
   const firebase = useFirebase();

   const orderPageRoute = () => {
      navigate("/orderplace")
   };

   useEffect(() => {
      firebase.imageUrl(props.photoUrl).then((url) => setUrl(url));
   }, [])

   return (
      <div>
         <Container className='mt-5 d-flex align-items-center justigy-content-center'>
            <Row>
               <Col>
                  <Image src={url} />
                  < br />
                  < br />
                  <h5>Category: {props.category}</h5>
                  <h5>Rs. {props.price}</h5>
                  <h5>Quantity: {props.quantity}</h5>
               </Col>
               <Col>
                  <h5>{props.productName}</h5>
                  < br />
                  <text>Description:</text>
                  <h5>{props.description}</h5>
                  < br />
                  < br />
                  < br />
                  {firebase.isFarmer ? null : <Button onClick={orderPageRoute} variant="warning" type='submit' >Buy Now</Button> }
               </Col>
            </Row>
         </Container>
         < br />
      </div>
   )
}

export default DetailedProductPage;