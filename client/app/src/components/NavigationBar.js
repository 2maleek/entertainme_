import React, { useState } from "react";
import { Nav, FormControl, Navbar, Button, Form, Modal } from "react-bootstrap";
import { GET_MOVIES, ADD_MOVIE } from "../graphql/schemas/movieSchema";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

function NavigationBar(props) {
	const { crud } = props;
	const [show, setShow] = useState(false);
	const [title, setTitle] = useState("");
	const [overview, setOverview] = useState("");
	const [posterPath, setPosterPath] = useState("");
	const [popularity, setPopularity] = useState("");
	const [tags, setTags] = useState("");

	const [addMovie] = useMutation(ADD_MOVIE, {
		refetchQueries: [{ query: GET_MOVIES }]
	});

	function resetForm() {
		setTitle("");
		setOverview("");
		setPosterPath("");
		setPopularity(0);
		setTags("");
	}

	function saveNewData(e) {
		e.preventDefault();
		let InputMnT = {
			title,
			overview,
			poster_path: posterPath,
			popularity,
			tags
		};
		addMovie({ variables: { movie: InputMnT } });
		resetForm();
	}
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
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
					<FormControl type="text" placeholder="Search" className="mr-sm-2" />
					<Button variant="outline-info">Search</Button>
					{crud ? (
						<Button variant="success" className="ml-3" onClick={handleShow}>
							Add Movie
						</Button>
					) : (
						""
					)}
				</Form>
			</Navbar>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Movies</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={saveNewData}>
						<Form.Group>
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								placeholder="Title"
								onChange={e => setTitle(e.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Overview</Form.Label>
							<Form.Control
								as="textarea"
								rows="3"
								placeholder="Overview"
								onChange={e => setOverview(e.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Poster Path</Form.Label>
							<Form.Control
								type="text"
								placeholder="Poster Path"
								onChange={e => setPosterPath(e.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Popularity</Form.Label>
							<Form.Control
								type="text"
								placeholder="Popularity"
								onChange={e => {
									let value = parseFloat(e.target.value);
									setPopularity(value);
								}}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Tags</Form.Label>
							<Form.Control
								type="text"
								placeholder="Tags (separate with comma ','"
								onChange={e => {
									let value = e.target.value.split(",");
									setTags(value);
								}}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button
						variant="primary"
						onClick={e => {
							handleClose(e);
							saveNewData(e);
						}}
					>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default NavigationBar;
