import ApolloClient, { gql } from "apollo-boost";
import { GETFAVORITES } from "./schemas/favoriteSchema";

export default new ApolloClient({
	uri: "http://localhost:3001",
	clientState: {
		resolvers: {
			Mutation: {
				addFavorite(_, variables, client) {
					const { favorites } = client.cache.readQuery({
						query: GETFAVORITES
					});
					const newFavorite = {
						__typename: "favorite",
						title: variables.title
					};
					const newFavorites = favorites.concat(newFavorite);
					client.cache.writeData({ data: { favorites: newFavorites } });
					return newFavorite;
				}
			}
		}
	},
	defaults: {
		favorites: []
	}
});
