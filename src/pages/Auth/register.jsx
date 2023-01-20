import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { useFirebase } from '../../context/firebase';
import { useState } from 'react';
import Image from 'react-bootstrap/Image';
import { Container, Row, Col, Card } from 'react-bootstrap';
import farmer from "../../assets/images/farmer.jpg";
import { useNavigate } from 'react-router-dom';

const Register = () => {

   const navigate = useNavigate();
   const goToLoginPage = () => { navigate("/login"); }
   const goToShop = () => { navigate("/shop"); }
   const firebase = useFirebase();

   const [userName, setUserName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isFarmer, setIsFarmer] = useState(false);
   const [isCustomer, setIsCustomer] = useState(false);
   const [district, setDistrict ] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();
      await firebase.signUpUserWithEmailAndPassword( userName, email, password, isFarmer, isCustomer, district );
      goToShop();
   }

   return (
      <div className='container mt-5'>
         <Container>
             <Row>
               <Card className='align-items-center mb-5'
                  style={{maxWidth: "500px", borderRadius: "15px"}}
               >
                  <Col>
                     <div className='mt-4'>
                        <h1>Sign Up</h1>
                        <Form onSubmit={handleSubmit}>
                           <Form.Group className="mb-3" controlId="name-register">
                              <Form.Label>Full Name</Form.Label>
                              <Form.Control 
                                 type="text"  
                                 onChange={(e) => setUserName(e.target.value)}
                                 value={userName}
                              />
                           </Form.Group>

                           <Form.Group className="mb-3" controlId="email-register">
                              <Form.Label>Email address</Form.Label>
                              <Form.Control 
                                 type="email"  
                                 onChange={(e) => setEmail(e.target.value)}
                                 value={email}
                              />
                           </Form.Group>

                           <Form.Group className="mb-3" controlId="password-register">
                              <Form.Label>Password</Form.Label>
                              <Form.Control 
                                 type="password"
                                 onChange={(e) => setPassword(e.target.value)}
                                 value={password}  
                              />
                           </Form.Group>

                           <Dropdown>
                              <Dropdown.Toggle variant="success" id="dropdown">
                                 { isFarmer || isCustomer ? null : "Buyer or Seller"}
                                 {isFarmer? "Farmer/Seller" : null }
                                 {isCustomer? "Customer/Buyer" : null }
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                 <Dropdown.Item onClick={()=>{setIsFarmer(true)}}>
                                    Farmer/Seller
                                 </Dropdown.Item>
                                 <Dropdown.Item onClick={()=>{setIsCustomer(true)}}>
                                    Customer/Buyer
                                 </Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>

                           <Form.Group className="mb-3 mt-3" controlId="district-register">
                              <Form.Label>District Name</Form.Label>
                              <Form.Control 
                                 type="text"  
                                 onChange={(e) => setDistrict(e.target.value)}
                                 value={district}
                              />
                           </Form.Group>

                           <Button variant="primary" type="submit">
                              Sign Up
                           </Button>
                        </Form>
                        <p className='mt-3 mb-3'>
                           Already Have an Account?  
                           <a onClick={goToLoginPage}> Log In Here</a>
                        </p>
                     </div>
                  </Col>
               </Card>
               <Col>
                  <Image
                     rounded 
                     src={farmer} 
                     height={500}
                  />
               </Col>
             </Row>
         </Container>
         {/* <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email-register">
               <Form.Label>Email address</Form.Label>
               <Form.Control 
                  type="email"  
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
               />
               <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
               </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password-register">
               <Form.Label>Password</Form.Label>
               <Form.Control 
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}  
               />
            </Form.Group>
            <Button variant="primary" type="submit">
               Sign Up
            </Button>
         </Form>  */}
      </div>
   );
}

export default Register;