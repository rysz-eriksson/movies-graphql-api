import { Movies } from "./db.js";

const filterByGenre = (movies, byGenre) => {
    if (byGenre === "All")
        return movies
    else
        return movies.filter(({genres}) => genres.includes(byGenre) )
    }
    
// by title
const filterByTitle = (movies, byTitle) => {
    if (!byTitle)
        return movies
    else
        return movies.filter(({title}) => title.toLowerCase().includes(byTitle.toLowerCase()))
    }

const getFiltered = (_movies, _filter) => {
    if (!_filter) return _movies
    const moviesByGenre = filterByGenre(_movies, _filter.byGenre)
    return filterByTitle(moviesByGenre, _filter.byTitle)
}

const getSorted = (_movies, _sort) => {
    if (_sort === 'RUNTIME')
        _movies.sort((a, b) => b.runtime - a.runtime)
    else {
        const getParsedDate = date => Date.parse(date)
        _movies.sort((a, b) => getParsedDate(a.release_date) - getParsedDate(b.release_date))
    }
    return _movies
}

export const resolvers = {
    Query: {
        movie: (root, {id}) => Movies.findById(id),
        movies: (root, {input}) => {
            if (!input) {
                return Movies.findAll()
            }
            const {filterBy, sortBy} = input
                return Movies.findAll().then(movies => getFiltered(movies, filterBy))
                .then(filteredMovies => getSorted(filteredMovies, sortBy))
        }
        
    },

    Mutation: {
        addMovie: (_root, {input}) => {
            return Movies.create(input)
        },
        deleteMovie: async (_root, { id }) => {
            return Movies.delete(id);
          },
        editMovie: async (_root, {input}) => {
            return Movies.update(input)
        }
    }
  };