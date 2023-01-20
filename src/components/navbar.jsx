import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../assets/images/logo.png"
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';

function NavbarElement() {

   const navigate = useNavigate();

   const goToLoginPage = () => { navigate("/login"); }
   const goToRegisterPage = () => { navigate("/register"); }

   const firebase = useFirebase();

   const logInSignUpButtons = (
      <>
         <Nav.Link onClick={goToLoginPage} >Log In</Nav.Link>
         <Nav.Link onClick={goToRegisterPage} >Sign Up</Nav.Link>
      </>
   );

   const logOutButton = <Nav.Link onClick={() => {
      firebase.logOut();
      goToLoginPage();
   }} >Sign Out</Nav.Link>;

   return (
      <>
         <Navbar bg="light" variant="light">
            <Container>
               <Navbar.Brand href="/login">
                  <img src={logo}
                     style={{ maxHeight: "40px" }}
                     alt=''
                  />
               </Navbar.Brand>
               <Nav className="me-auto">
                  <Nav.Link > Live Auction </Nav.Link>
                  <Nav.Link href="/shop"> Shop </Nav.Link>
                  <Nav.Link >Nearby Markets</Nav.Link>
                  <Nav.Link href="#features"> My Cart </Nav.Link>
                  {firebase.isFarmer ? <Nav.Link href="/guidlines"> Guidlines </Nav.Link> : null}
               </Nav>
               <Nav className="mr-auto">
                  {firebase.isLoggedIn ? logOutButton : logInSignUpButtons}
               </Nav>
            </Container>
         </Navbar>
      </>
   );
}

export default NavbarElement;