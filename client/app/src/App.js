import React from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./graphql/schemas/favoriteSchema";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
	Entertainme,
	Movies,
	TvSeries,
	Favorites,
	Home,
	Detail
} from "./pages";
function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<Switch>
					<Route path="/detail/:movieId">
						<Detail />
					</Route>
					<Route path="/entertainme">
						<Entertainme />
					</Route>
					<Route path="/movies">
						<Movies />
					</Route>
					<Route path="/tvseries">
						<TvSeries />
					</Route>
					<Route path="/favorites">
						<Favorites />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</Router>
		</ApolloProvider>
	);
}

export default App;
