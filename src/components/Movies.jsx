import Movie from './Movie'
import { useSelector } from 'react-redux'
import '../styles/movies.scss'

const Movies = ({ viewTrailer }) => {
    const movies = useSelector((state) => state.movies)

    return (
        <div data-testid="movies">
            {movies.movies.results?.map((movie) => {
                return (
                    <Movie 
                        movie={movie} 
                        key={movie.id}
                        viewTrailer={viewTrailer}
                    />
                )
            })}
        </div>
    )
}

export default Movies
