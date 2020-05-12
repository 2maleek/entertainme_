import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
	GET_MOVIES,
	GET_MOVIE_BY_ID,
	ADD_MOVIE
} from "../graphql/schemas/movieSchema";
import Card from "../components/Card";
import Navbar from "../components/NavigationBar";
import { Button, Modal, Form } from "react-bootstrap";

function Movies() {
	const { loading, error, data } = useQuery(GET_MOVIES);
	const [addMovie] = useMutation(ADD_MOVIE);
	const [show, setShow] = useState(false);
	const [title, setTitle] = useState("");
	const [overview, setOverview] = useState("");
	const [posterPath, setPosterPath] = useState("");
	const [popularity, setPopularity] = useState("");
	const [tags, setTags] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
	if (data)
		return (
			<>
				<Navbar />
				<Button variant="primary" onClick={handleShow}>
					Add New Movie
				</Button>

				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Movies</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Label>Title</Form.Label>
								<Form.Control type="text" placeholder="Title" />
							</Form.Group>
							<Form.Group>
								<Form.Label>Overview</Form.Label>
								<Form.Control as="textarea" rows="3" placeholder="Overview" />
							</Form.Group>
							<Form.Group>
								<Form.Label>Poster Path</Form.Label>
								<Form.Control type="text" placeholder="Poster Path" />
							</Form.Group>
							<Form.Group>
								<Form.Label>Popularity</Form.Label>
								<Form.Control type="text" placeholder="Popularity" />
							</Form.Group>
							<Form.Group>
								<Form.Label>Tags</Form.Label>
								<Form.Control
									type="text"
									placeholder="Tags (separate with comma ','"
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" onClick={handleClose}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
				<div className="container">
					<div className="row">
						{data.movies.map(movie => (
							<div className="col-md-3" key={movie._id}>
								<Card data={movie} crud={true} />
							</div>
						))}
					</div>
				</div>
			</>
		);
}

export default Movies;
