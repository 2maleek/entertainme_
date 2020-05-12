import React from "react";
import { Nav, FormControl, Navbar, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar() {
	return (
		<>
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="#home">App</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav>
						<Link to="/">Home</Link>
					</Nav>
					<Nav className="ml-3">
						<Link to="/movies">Movies</Link>
					</Nav>
					<Nav className="ml-3">
						<Link to="/tvseries">Tv Series</Link>
					</Nav>
					<Nav className="ml-3">
						<Link to="/entertainme">Entertain</Link>
					</Nav>
					<Nav className="ml-3">
						<Link to="/favorites">Favorite</Link>
					</Nav>
				</Nav>
				<Form inline>
					<Button variant="outline-info">Search</Button>
				</Form>
			</Navbar>
		</>
	);
}

export default NavigationBar;
