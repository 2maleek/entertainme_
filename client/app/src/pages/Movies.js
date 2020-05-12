import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { GET_MOVIES, GET_MOVIE_BY_ID } from "../graphql/schemas/movieSchema";
import Card from "../components/Card";
import Navbar from "../components/NavigationBar";

function Movies() {
	const { loading, error, data } = useQuery(GET_MOVIES);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
	if (data)
		return (
			<>
				<Navbar crud={true} />
				<div className="container-fluid mt-5">
					<div className="row">
						{data.movies.map(movie => (
							<div className="cols col-sm-6 col-md-4 col-lg-3 " key={movie._id}>
								<Card data={movie} crud={true} />
							</div>
						))}
					</div>
				</div>
			</>
		);
}

export default Movies;
