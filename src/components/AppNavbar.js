import { Fragment, useContext } from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap'
import UserContext from './../UserContext'

export default function AppNavBar(){

	const { state } = useContext(UserContext)

	const NavLinks = () => {

		if(state === true){
			return(
				<Fragment>
					<Nav.Link 
		        		href="/cart" 
		        		className="text-light">Cart</Nav.Link>
					<Nav.Link 
						href="/logout" 
						className="text-light">Logout</Nav.Link>

				</Fragment>
			)
		} else {
			return(
				<Fragment>
				    <Nav.Link 
				        href="/login" 
				        className="text-light">Login</Nav.Link>
				    <Nav.Link 
				        href="/register" 
				        className="text-light">Register</Nav.Link>
				</Fragment>
			)
		}
	}

	return(
		<Navbar expand="lg">
		  <Container>
		    <Navbar.Toggle aria-controls="basic-navbar-nav" />
		    <Navbar.Collapse id="basic-navbar-nav">
		      	<Nav className="me-auto">
		        	<Nav.Link 
		        	href="/" 
		        	className="text-light">Home</Nav.Link>
		        	<Nav.Link 
		        	href="/products" 
		        	className="text-light">Products</Nav.Link>


		        <NavLinks />	

		        </Nav>
		    </Navbar.Collapse>
		  </Container>
		</Navbar>
	)
}