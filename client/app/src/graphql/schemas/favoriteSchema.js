import ApolloClient from "apollo-boost";
import { GETFAVORITES } from "../../pages/Favorites";

const client = new ApolloClient({
	uri: "http://localhost:3001",
	clientState: {
		resolvers: {
			Mutation: {
				addFav: (_, variables, client) => {
					const { favorites } = client.cache.readQuery({ query: GETFAVORITES });
					const movieFav = {
						_id: variables._id,
						title: variables.title,
						poster_path: variables.poster_path,
						__typename: "favorites"
					};
					console.log(favorites);
					const collections = [...favorites, movieFav];
					client.cache.writeData({ data: { favorites: collections } });
				}
			}
		},
		defaults: {
			favorites: []
		}
	}
});

export default client;
