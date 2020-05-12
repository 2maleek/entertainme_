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
	const [show, setShow] = useState(false);
	const [title, setTitle] = useState("");
	const [overview, setOverview] = useState("");
	const [posterPath, setPosterPath] = useState("");
	const [popularity, setPopularity] = useState("");
	const [tags, setTags] = useState("");

	const { loading, error, data } = useQuery(GET_MOVIES);
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
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
	if (data)
		return (
			<>
				<Navbar />
				<Button variant="primary" type="button" onClick={handleShow}>
					Add New Movie
				</Button>
				<div className="container">
					<div className="row">
						{data.movies.map(movie => (
							<div className="col-md-3" key={movie._id}>
								<Card data={movie} crud={true} />
							</div>
						))}
					</div>
				</div>
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

export default Movies;
