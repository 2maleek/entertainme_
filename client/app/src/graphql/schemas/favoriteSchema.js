import gql from "graphql-tag";

export const GET_FAVORITES = gql`
	query {
		favorites @client {
			title
		}
	}
`;

export const ADD_FAVORITE = gql`
	mutation AddFavorite($title: String) {
		addFavorite(title: $title) @client
	}
`;
