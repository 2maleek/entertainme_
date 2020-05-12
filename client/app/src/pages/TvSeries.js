import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { GET_TV_SERIES, GET_TV_SERIE_BY_ID } from "../graphql/schemas/tvSchema";
import Card from "../components/Card";
import Navbar from "../components/NavigationBar";

function TvSeries() {
	const { loading, error, data } = useQuery(GET_TV_SERIES);

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
					</div>
				</div>
			</>
		);
}

export default TvSeries;
