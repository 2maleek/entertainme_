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
export const GET_MOVIE_BY_ID = gql`
	query Movie($movieId: ID!) {
		movie(movieId: $movieId) {
			_id
			title
			overview
			poster_path
			popularity
			tags
		}
	}
`;

export const ADD_MOVIE = gql`
	mutation AddMovie($movie: InputMnT) {
		addMovie(movie: $movie) {
			_id
			title
			overview
			poster_path
			popularity
			tags
		}
	}
`;

export const UPDATE_MOVIE = gql`
	mutation UpdateMovie($movieId: ID!, $movie: InputMnT) {
		updateMovie(movieId: $movieId, movie: $movie) {
			_id
			title
			overview
			poster_path
			popularity
			tags
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
