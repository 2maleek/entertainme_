import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
	GET_MOVIES,
	GET_MOVIE_BY_ID,
	ADD_MOVIE
} from "../graphql/schemas/movieSchema";
import Card from "../components/Card";

function Movies() {
	const { loading, error, data } = useQuery(GET_MOVIES);
	const [addMovie] = useMutation(ADD_MOVIE);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
	if (data)
		return data.movies.map(movie => (
			<div key={movie._id}>
				<Card movie={movie} />
			</div>
		));
}

export default Movies;
