import React from "react";
import { useParams } from "react-router-dom";
import { GET_MOVIE_BY_ID } from "../graphql/schemas/movieSchema";
import { GET_TV_SERIE_BY_ID } from "../graphql/schemas/tvSchema";
import { useQuery } from "@apollo/react-hooks";

function Detail(props) {
	const { movieId } = useParams();
	const { loading, error, data } = useQuery(GET_MOVIE_BY_ID, {
		variables: { movieId: movieId }
	});

	if (loading) return <p>Loading ...</p>;
	if (error) return <h1>Error!</h1>;
	if (data) return <p>{JSON.stringify(data)}</p>;
}

export default Detail;
