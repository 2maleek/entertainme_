const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const movieUrl = "http://localhost:3001/movies/";
const tvSeriesUrl = "http://localhost:3002/tvseries/";

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input InputMovie {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String]!
  }

  type Query {
    movies: [Movie]
    movie(movieId: ID!): Movie
  }

  type Mutation {
    addMovie(movie: InputMovie): Movie
    updateMovie(movieId: ID!, movie: InputMovie): Movie
    deleteMovie(movieId: ID!): Movie
  }
`;

const resolvers = {
  Query: {
    movies: () => {
      return axios({
        method: "get",
        url: movieUrl
      })
        .then(({ data }) => {
          return data;
        })
        .catch(console.log);
    },
    movie: (_, args) => {
      const { movieId } = args;
      return axios({
        method: "get",
        url: movieUrl.concat(movieId)
      })
        .then(({ data }) => {
          return data;
        })
        .catch(console.log);
    }
  },
  Mutation: {
    addMovie: (_, args) => {
      let { title, overview, poster_path, popularity, tags } = args.movie;
      return axios({
        method: "post",
        url: movieUrl,
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags
        }
      })
        .then(({ data }) => {
          return data;
        })
        .catch(console.log);
    },
    updateMovie: (_, args) => {
      let { title, overview, poster_path, popularity, tags } = args.movie;
      const { movieId } = args;

      return axios({
        method: "put",
        url: movieUrl.concat(movieId),
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags
        }
      })
        .then(({ data }) => {
          return data;
        })
        .catch(console.log);
    },
    deleteMovie: (_, args) => {
      const { movieId } = args;

      return axios({
        method: "delete",
        url: movieUrl.concat(movieId)
      })
        .then(({ data }) => {
          console.log(data);
          return data;
        })
        .catch(console.log);
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
