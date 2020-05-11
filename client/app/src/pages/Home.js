import React from "react";
import logo from "../logo.svg";
import "../App.css";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
function Home() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<Nav className="justify-content-center" activeKey="/home">
					<Nav.Item>
						<Link to="/entertainme">
							<Nav>Entertainme</Nav>
						</Link>
					</Nav.Item>
					<Nav.Item>
						<Link to="/movies">
							<Nav className="ml-5">Movies</Nav>
						</Link>
					</Nav.Item>
					<Nav.Item>
						<Link to="/tvseries">
							<Nav className="ml-5">TV Series</Nav>
						</Link>
					</Nav.Item>
					<Nav.Item>
						<Link to="/favorites">
							<Nav className="ml-5">Favorites</Nav>
						</Link>
					</Nav.Item>
				</Nav>
			</header>
		</div>
	);
}

export default Home;
