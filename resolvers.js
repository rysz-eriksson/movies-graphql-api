import { Movies } from "./db.js";

export const resolvers = {
    Query: {
        movie: (root, {id}) => Movies.findById(id),
        movies: () => Movies.findAll()
    },
  };