import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { useFirebase } from '../../context/firebase';
import { useState } from 'react';
import Image from 'react-bootstrap/Image';
import { Container, Row, Col, Card } from 'react-bootstrap';
import addproduct from "../../assets/images/addproduct.jpeg";
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
   const navigate = useNavigate();
   const goToShop = () => { navigate("/shop"); }
   const firebase = useFirebase();

   const [error, setError] = useState('');
   const [productName, setProductName] = useState("");
   const [category, setCategory] = useState("");
   const [description, setDescription] = useState("");
   const [ price, setPrice ] = useState("");
   const [ quantity, setQuantity ] = useState("");
   const [ photo, setPhoto ] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      try {
         await firebase.addProducts( productName, category, description, price, quantity, photo );
         goToShop();
       } catch (error) {
         setError(error.message);
       }
   }
   
   return (
      <div className='container mt-5'>
         <Container>
             <Row>
               <Card className='align-items-center mb-5'
                  style={{maxWidth: "500px", borderRadius: "15px"}}
               >
                  <Col>
                     <div className='mt-3'>
                        <h1>Add Product</h1>
                        <Form onSubmit={handleSubmit}>
                           <Form.Group className="mb-3" controlId="product-name">
                              <Form.Label>Name of the Product</Form.Label>
                              <Form.Control 
                                 type="text"  
                                 onChange={(e) => setProductName(e.target.value)}
                                 value={productName}
                              />
                           </Form.Group>

                           <Dropdown className="mb-3">
                              <Dropdown.Toggle variant="success" id="dropdown">
                                 {category !=="" ? category : "Select Category of Product" }
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                 <Dropdown.Item onClick={()=>{setCategory("Vegetable")}}>
                                    Vegetable
                                 </Dropdown.Item>
                                 <Dropdown.Item onClick={()=>{setCategory("Fruits")}}>
                                    Fruit
                                 </Dropdown.Item>
                                 <Dropdown.Item onClick={()=>{setCategory("Grains")}}>
                                    Grains
                                 </Dropdown.Item>
                                 <Dropdown.Item onClick={()=>{setCategory("Pulses")}}>
                                    Pulses
                                 </Dropdown.Item>
                                 <Dropdown.Item onClick={()=>{setCategory("Dry Fruits")}}>
                                    Dry Fruits
                                 </Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                           
                           <Form.Group className="mb-3" controlId="price">
                              <Form.Label>Price</Form.Label>
                              <Form.Control 
                                 type="text"  
                                 onChange={(e) => setPrice(e.target.value)}
                                 value={price}
                              />
                           </Form.Group>
                           
                           <Form.Group className="mb-3" controlId="quantity">
                              <Form.Label>Quantity in KG's</Form.Label>
                              <Form.Control 
                                 type="text"  
                                 onChange={(e) => setQuantity(e.target.value)}
                                 value={quantity}
                              />
                           </Form.Group>
                           
                           <Form.Group className="mb-3" controlId="description">
                              <Form.Label>Description of the Product</Form.Label>
                              <Form.Control 
                                 type="text"  
                                 onChange={(e) => setDescription(e.target.value)}
                                 value={description}
                              />
                           </Form.Group>
                           
                           <Form.Group className="mb-3" controlId="image">
                              <Form.Label>Image of the Product</Form.Label>
                              <Form.Control 
                                 type="file"  
                                 onChange={(e) => setPhoto(e.target.files[0])}
                              />
                           </Form.Group>
                           
                           <Button className="mb-3" variant="primary" type="submit">
                              Add Product
                           </Button>
                        </Form>
                        { error !== "" ? <p style={{ color: "red" }}>{error}</p> : null }
                     </div>
                  </Col>
               </Card>
               <Col>
                  <Image
                     rounded 
                     src={addproduct} 
                     width={750}
                  />
               </Col>
             </Row>
         </Container> 
      </div>
   )
}

export default AddProductPage