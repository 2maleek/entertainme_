import gql from "graphql-tag";

export const GET_ENTERTAINME = gql`
	query {
		tvSeries {
			_id
			title
			overview
			poster_path
			popularity
			tags
		}
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
