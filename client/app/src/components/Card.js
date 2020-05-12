import React, { useState } from "react";
import { Card, Button, InputGroup, Modal, Form } from "react-bootstrap";
import alertify from "alertifyjs";
import gql from "graphql-tag";

import { useQuery, useMutation } from "@apollo/react-hooks";
import {
	GET_MOVIES,
	DELETE_MOVIE,
	UPDATE_MOVIE
} from "../graphql/schemas/movieSchema";
import Detail from "../pages/Detail";
import { Switch, Route, Link } from "react-router-dom";
function CardComponent(props) {
	let crud = props.crud;
	const ADDFAVORITES = gql`
		mutation addFav($_id: ID, $title: String, $poster_path: String) {
			addFav(_id: $_id, title: $title, poster_path: $poster_path) @client {
				_id
				title
				poster_path
			}
		}
	`;
	const [movieId, setMovieId] = useState(null);
	const [show, setShow] = useState(false);
	const [title, setTitle] = useState("");
	const [overview, setOverview] = useState("");
	const [posterPath, setPosterPath] = useState("");
	const [popularity, setPopularity] = useState("");
	const [tags, setTags] = useState("");

	const [deleteMovie] = useMutation(DELETE_MOVIE, {
		refetchQueries: [{ query: GET_MOVIES }]
	});

	const [updateMovie] = useMutation(UPDATE_MOVIE, {
		refetchQueries: [{ query: GET_MOVIES }]
	});

	function resetForm() {
		setTitle("");
		setOverview("");
		setPosterPath("");
		setPopularity(0);
		setTags("");
	}

	function showModal(dataId, movie) {
		handleShow();
		setMovieId(dataId);
		setTitle(movie.title);
		setOverview(movie.overview);
		setPosterPath(movie.poster_path);
		setPopularity(movie.popularity);
		setTags(movie.tags);
	}
	function showConfirm(dataId) {
		alertify.confirm(
			"Confirm Title",
			"Confirm Message",
			function() {
				deleteMovie({ variables: { movieId: dataId } });
				alertify.success("Deleted");
			},
			function() {
				alertify.error("Cancel");
			}
		);
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
		updateMovie({ variables: { movieId: movieId, movie: InputMnT } });
		resetForm();
	}
	const [dataToFav] = useMutation(ADDFAVORITES);

	const addToFav = () => {
		dataToFav({
			variables: {
				_id: props.data._id,
				title: props.data.title,
				poster_path: props.data.poster_path
			}
		});
	};

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const url = "/detail/".concat(props.data._id);
	return (
		<>
			<Card style={{ width: "15rem" }}>
				<Link to={url}>
					<Card.Img variant="top" src={props.data.poster_path} />
				</Link>
				<Card.Body>
					<Card.Title>{props.data.title}</Card.Title>
					<Card.Text>{props.data.overview}</Card.Text>
					<Card.Text>
						<em>Popularity : {props.data.popularity}</em>
					</Card.Text>
					<Card.Text>Tags: {props.data.tags}</Card.Text>

					<Button variant="warning" className="mr-2" onClick={addToFav}>
						Add Favorite
					</Button>
					{crud ? (
						<>
							<InputGroup.Append>
								<Button
									variant="primary"
									className="mr-2"
									onClick={() => showModal(props.data._id, props.data)}
								>
									Edit
								</Button>
								<Button
									variant="danger"
									onClick={() => showConfirm(props.data._id)}
								>
									Delete
								</Button>
							</InputGroup.Append>
						</>
					) : (
						""
					)}
				</Card.Body>
			</Card>
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
								value={title}
								onChange={e => setTitle(e.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Overview</Form.Label>
							<Form.Control
								as="textarea"
								rows="3"
								placeholder="Overview"
								value={overview}
								onChange={e => setOverview(e.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Poster Path</Form.Label>
							<Form.Control
								type="text"
								placeholder="Poster Path"
								value={posterPath}
								onChange={e => setPosterPath(e.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Popularity</Form.Label>
							<Form.Control
								type="text"
								placeholder="Popularity"
								value={popularity}
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
								value={tags}
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
			<Switch>
				<Route path={"detail/:movieId"}>
					<Detail />
				</Route>
			</Switch>
		</>
	);
}

export default CardComponent;
