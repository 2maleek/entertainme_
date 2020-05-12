import React from "react";
import Navigation from "../components/NavigationBar";
import Card from "../components/Card";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const GETFAVORITES = gql`
	{
		favorites @client {
			_id
			title
			poster_path
		}
	}
`;

function Favorite() {
	const { loading, error, data } = useQuery(GETFAVORITES);

	if (loading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <p>{error}</p>;
	}
	return (
		<>
			<Navigation isButtonAdd={"add"} />
			<h1 style={{ textAlign: "center", marginTop: 10 }}>My Favorites</h1>
			<div className="d-flex justify-content mx-3">
				<div className="row">
					{data.favorites.map(fav => {
						return <Card key={fav._id} file={fav} isButtonView={false} />;
					})}
				</div>
			</div>
		</>
	);
}

export default Favorite;
