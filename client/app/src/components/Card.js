import React from "react";
import { Card, Button } from "react-bootstrap";
function CardComponent(props) {
	return (
		<Card style={{ width: "18rem" }}>
			<Card.Img variant="top" src={props.movie.poster_path} />
			<Card.Body>
				<Card.Title>{props.movie.title}</Card.Title>
				<Card.Text>{props.movie.overview}</Card.Text>
				<Card.Text>
					<em>Popularity : {props.movie.popularity}</em>
				</Card.Text>
				<Card.Text>Tags: {props.movie.tags}</Card.Text>

				<Button variant="primary">Go somewhere</Button>
			</Card.Body>
		</Card>
	);
}

export default CardComponent;
