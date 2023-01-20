import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';
import DetailedProductPage from '../pages/detailedProductPage';

function ProductCard( props ) {
   const [url, setUrl ] = useState(null);
   const navigate = useNavigate();
   const firebase = useFirebase();

   useEffect(() => {
     firebase.imageUrl(props.photoUrl).then((url)=>setUrl(url));
   }, [])

   const orderPageRoute = () => {
      navigate("/orderplace")
   };

  const detailedProductPage = () => {
    firebase.setPropsDetailedProduct(props)
    navigate("/detailedproductpage")
  };
   
  return (
    <Card style={{ width: '18rem', marginLeft: "30px" }} onClick={detailedProductPage}>
      <Card.Img variant="top" src={url} style={{ maxHeight: "200px"}}/>
      <Card.Body>
        <Card.Title>{props.productName}</Card.Title>
        <Card.Text>Category: {props.category}</Card.Text>
        <Card.Text>
          {props.description}
        </Card.Text>
        <Container>
         <Row>
            <Col>
               <Card.Text>{props.quantity} Kg</Card.Text>
            </Col>
            <Col className='justify-items-end'>
               <Card.Text>Rs. {props.price}</Card.Text>
            </Col>
         </Row>
        </Container>
        {firebase.isFarmer ? null : <Button onClick={orderPageRoute} className='mt-2' variant="warning" type='submit' >Buy Now</Button> }
      </Card.Body>
    </Card>
  );
}

export default ProductCard;