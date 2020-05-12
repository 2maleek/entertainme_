import gql from "graphql-tag";

export const GET_TV_SERIES = gql`
	query {
		tvSeries {
			_id
			title
			overview
			poster_path
			popularity
			tags
		}
	}
`;
export const GET_TV_SERIE_BY_ID = gql`
	query {
		tvSeries {
			_id
			title
			overview
			poster_path
			popularity
			tags
		}
	}
`;
