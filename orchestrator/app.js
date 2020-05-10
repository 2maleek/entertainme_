const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const movieUrl = "http://localhost:3001/movies/";
const tvSeriesUrl = "http://localhost:3002/tvseries/";
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type TvSerie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input InputMnT {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String]!
  }

  type Query {
    movies: [Movie]
    movie(movieId: ID!): Movie
    tvSeries: [TvSerie]
    tvSerie(serieId: ID!): TvSerie
  }

  type Mutation {
    addMovie(movie: InputMnT): Movie
    updateMovie(movieId: ID!, movie: InputMnT): Movie
    deleteMovie(movieId: ID!): Movie
    addTvSerie(tvSerie: InputMnT): TvSerie
    updateTvSerie(serieId: ID!, tvSerie: InputMnT): TvSerie
    deleteTvSerie(serieId: ID!): TvSerie
  }
`;

const resolvers = {
  Query: {
    movies: async () => {
      try {
        movies = JSON.parse(await redis.get("movies"));
        if (movies) return movies;

        let { data } = await axios({
          method: "get",
          url: movieUrl
        });
        redis.set("movies", JSON.stringify(data));
        return data;
      } catch (error) {
        console.log(err);
      }
    },
    movie: async (_, args) => {
      try {
        const { movieId } = args;
        movie = JSON.parse(await redis.get("movie".concat(movieId)));
        if (movie) return movie;

        const { data } = await axios({
          method: "get",
          url: movieUrl.concat(movieId)
        });
        redis.set("movie".concat(movieId), JSON.stringify(data), "EX", 300);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    tvSeries: async () => {
      try {
        tvSeries = JSON.parse(await redis.get("tv-series"));
        if (tvSeries) return tvSeries;

        const { data } = await axios({
          method: "get",
          url: tvSeriesUrl
        });
        redis.set("tv-series", JSON.stringify(data));
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    tvSerie: async (_, args) => {
      try {
        const { serieId } = args;
        const tvSerie = JSON.parse(await redis.get("tv-serie".concat(serieId)));
        if (tvSerie) return tvSerie;

        const { data } = await axios({
          method: "get",
          url: tvSeriesUrl.concat(serieId)
        });
        redis.set("tv-serie".concat(serieId), JSON.stringify(data), "EX", 300);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  },
  Mutation: {
    addMovie: async (_, args) => {
      let { title, overview, poster_path, popularity, tags } = args.movie;
      try {
        const { data } = await axios({
          method: "post",
          url: movieUrl,
          data: {
            title,
            overview,
            poster_path,
            popularity,
            tags
          }
        });
        const movies = JSON.parse(await redis.get("movies"));

        if (movies) {
          movies.push(data);
          redis.set("movies", JSON.stringify(movies));
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    updateMovie: async (_, args) => {
      try {
        let { title, overview, poster_path, popularity, tags } = args.movie;
        const { movieId } = args;

        const { data } = await axios({
          method: "put",
          url: movieUrl.concat(movieId),
          data: {
            title,
            overview,
            poster_path,
            popularity,
            tags
          }
        });

        const movie = JSON.parse(await redis.get("movie".concat(movieId)));

        redis.del("movies");
        if (movie) {
          redis.set("movie".concat(movieId), JSON.stringify(data));
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteMovie: async (_, args) => {
      try {
        const { movieId } = args;
        const { data } = await axios({
          method: "delete",
          url: movieUrl.concat(movieId)
        });

        redis.del("movies");
        redis.del("movie".concat(movieId));
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    addTvSerie: async (_, args) => {
      try {
        let { title, overview, poster_path, popularity, tags } = args.tvSerie;

        const { data } = await axios({
          method: "post",
          url: tvSeriesUrl,
          data: {
            title,
            overview,
            poster_path,
            popularity,
            tags
          }
        });

        const tvSeries = JSON.parse(await redis.get("tv-series"));
        if (tvSeries) {
          tvSeries.push(data);
          redis.set("tv-series", JSON.stringify(tvSeries));
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    updateTvSerie: async (_, args) => {
      try {
        const { serieId, tvSerie } = args;
        let { title, overview, poster_path, popularity, tags } = tvSerie;

        const { data } = await axios({
          method: "put",
          url: tvSeriesUrl.concat(serieId),
          data: {
            title,
            overview,
            poster_path,
            popularity,
            tags
          }
        });

        const Serie = JSON.parse(await redis.get("tv-serie".concat(serieId)));

        redis.del("tv-series");
        if (Serie) {
          redis.set(
            "tv-serie".concat(serieId),
            JSON.stringify(data),
            "EX",
            300
          );
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteTvSerie: async (_, args) => {
      try {
        const { serieId } = args;

        const { data } = await axios({
          method: "delete",
          url: tvSeriesUrl.concat(serieId)
        });

        redis.del("tv-series");
        redis.del("tv-serie".concat(serieId));
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
