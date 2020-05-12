import gql from "graphql-tag";

export const GET_MOVIES = gql`
	query {
		movies {
			_id
			title
			overview
			poster_path
			popularity
			tags
		}
	}
`;
// export const GET_MOVIE_BY_ID = gql`
// 	query {
// 		Movie($movieId: ID) {
// 			movie(movieId: $movieID){
// 				_id
// 				title
// 				overview
// 				poster_path
// 				popularity
// 				tags
// 			}
// 		}
// 	}
// `;

export const ADD_MOVIE = gql`
	mutation AddMovie($movie: InputMnT) {
		addMovie(movie: $movie) {
			title
		}
	}
`;

export const DELETE_MOVIE = gql`
	mutation DeleteMovie($movieId: ID!) {
		deleteMovie(movieId: $movieId) {
			title
		}
	}
`;
