import Movie from './Movie'
import { useSelector } from 'react-redux'
import '../styles/movies.scss'
import { useMemo } from 'react';

const Movies = ({ viewTrailer }) => {
    const movies = useSelector((state) => state.movies);
    const starredList = useSelector((state) => state.starred.starredMovies);
    const watchLaterList = useSelector((state) => state.watchLater.watchLaterMovies);

    const starredIds = useMemo(() => {
        return starredList.map(movie => movie.id)
    }, [starredList]);

    const watchLaterIds = useMemo(() => {
        return watchLaterList.map(movie => movie.id)
    }, [watchLaterList])

    return (
        <div data-testid="movies">
            {movies.movies.results?.map((movie) => {
                return (
                    <Movie 
                        movie={movie} 
                        key={movie.id}
                        viewTrailer={viewTrailer}
                        isStarred={starredIds.includes(movie.id)}
                        isOnWatchList={watchLaterIds.includes(movie.id)}
                    />
                )
            })}
        </div>
    )
}

export default Movies
