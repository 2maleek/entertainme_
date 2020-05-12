import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { GET_ENTERTAINME } from "../graphql/schemas/entertainmeSchema";
import Card from "../components/Card";
import Navbar from "../components/NavigationBar";

function Entertainme() {
	const { loading, error, data } = useQuery(GET_ENTERTAINME);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
	if (data)
		return (
			<>
				<Navbar />
				<div className="container">
					<div className="row">
						{data.tvSeries.map(tvSerie => (
							<div className="col-md-3" key={tvSerie._id}>
								<Card data={tvSerie} />
							</div>
						))}
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

export default Entertainme;
