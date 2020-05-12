import React from "react";
import { Card, Button, InputGroup } from "react-bootstrap";
import alertify from "alertifyjs";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_MOVIES, DELETE_MOVIE } from "../graphql/schemas/movieSchema";

function CardComponent(props) {
	const [deleteMovie] = useMutation(DELETE_MOVIE, {
		refetchQueries: [{ query: GET_MOVIES }]
	});

	function showModal(dataId) {
		alertify.alert("Alert Title", "Alert Message!", function() {
			alertify.success("Ok");
		});
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
	let crud = props.crud;
	return (
		<Card style={{ width: "18rem" }}>
			<Card.Img variant="top" src={props.data.poster_path} />
			<Card.Body>
				<Card.Title>{props.data.title}</Card.Title>
				<Card.Text>{props.data.overview}</Card.Text>
				<Card.Text>
					<em>Popularity : {props.data.popularity}</em>
				</Card.Text>
				<Card.Text>Tags: {props.data.tags}</Card.Text>

				{crud ? (
					<>
						<InputGroup.Append>
							<Button
								variant="primary"
								className="mr-2"
								onClick={() => showModal(props.data._id)}
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
	);
}

export default CardComponent;
