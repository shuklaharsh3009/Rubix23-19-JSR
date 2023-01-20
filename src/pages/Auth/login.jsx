import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../../context/firebase';
import { useState } from 'react';
import Image from 'react-bootstrap/Image';
import { Container, Row, Col, Card } from 'react-bootstrap';
import farmer from "../../assets/images/farmer.jpg";
import { useNavigate } from 'react-router-dom';

function Login() {
   const navigate = useNavigate();
   const goToRegisterPage = () => { navigate("/register"); }
   const goToShop = () => { navigate("/shop"); }
   const firebase = useFirebase();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      try {
         await firebase.logInUserWithEmailAndPassword( email, password );
         goToShop();
       } catch (error) {
         setError('Invalid login');
       }
   }

   console.log( firebase );

   return (
      <div className='container mt-5'>
         <Container>
             <Row>
               <Card className='align-items-center'
                  style={{maxWidth: "500px", borderRadius: "15px"}}
               >
                  <Col>
                     <div className='mt-5'>
                        <h1>Log In</h1>
                        <Form onSubmit={handleSubmit}>
                           <Form.Group className="mb-3" controlId="email-login">
                              <Form.Label>Email address</Form.Label>
                              <Form.Control 
                                 type="email"  
                                 onChange={(e) => setEmail(e.target.value)}
                                 value={email}
                              />
                           </Form.Group>

                           <Form.Group className="mb-3" controlId="password-login">
                              <Form.Label>Password</Form.Label>
                              <Form.Control 
                                 type="password"
                                 onChange={(e) => setPassword(e.target.value)}
                                 value={password}  
                              />
                           </Form.Group>
                           <Button variant="primary" type="submit">
                              Log In
                           </Button>
                        </Form>
                        { error !== "" ? <p style={{ color: "red" }}>{error}</p> : null }
                        <p className='mt-3'>
                           Don't Have an Account?  
                           <a onClick={goToRegisterPage}> Register Here</a>
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
      </div>
   );
}

export default Login;