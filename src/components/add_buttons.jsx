import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { useNavigate } from 'react-router-dom';

const AddButtons = () => {
   
   const navigate = useNavigate();
   const goToAddProduct = () => { navigate("/addproduct") };

   return (
      <div>
         <hr />
         <Container>
            <Row>
               <Col
                  className='d-flex align-itmes-center justify-content-center'
               >
                  <Button
                     type='button'
                     variant='success'
                     onClick={ goToAddProduct }
                  >
                     + Add Product
                  </Button>
               </Col>
               <Col
                  className='d-flex align-itmes-center justify-content-center'
               >
                  <Button
                     type='button'
                     variant='success'
                  >
                     + Add For Auction
                  </Button>
               </Col>
            </Row>
         </Container>
         <hr />
      </div>
   )
}

export default AddButtons