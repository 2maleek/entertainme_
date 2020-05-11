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

export const ADD_MOVIE = gql`
	mutation AddMovie(
		$title: String
		$overview: String
		$poster_path: String
		$popularity: Float
		$tags: [String]
	) {
		addMovie(
			title: $title
			overview: $overview
			poster_path: $poster_path
			popularity: $popularity
			tags: $tags
		) {
			title
		}
	}
`;
