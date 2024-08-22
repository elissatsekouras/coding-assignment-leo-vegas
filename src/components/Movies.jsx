import Movie from './Movie'
import { useSelector } from 'react-redux'
import '../styles/movies.scss'
import { useMemo, useRef } from 'react';

const Movies = ({ movies }) => {
    const starredList = useSelector((state) => state.starred.starredMovies);
    const watchLaterList = useSelector((state) => state.watchLater.watchLaterMovies);

    const starredIds = useMemo(() => {
        return starredList.map(movie => movie.id)
    }, [starredList]);

    const watchLaterIds = useMemo(() => {
        return watchLaterList.map(movie => movie.id)
    }, [watchLaterList])

    return (
        <>
            <div 
                data-testid="movies" 
                className="movie-grid"
            >
                {movies.map((movie) => {
                    return (
                        <Movie 
                            movie={movie} 
                            key={movie.id}
                            isStarred={starredIds.includes(movie.id)}
                            isOnWatchList={watchLaterIds.includes(movie.id)}
                        />
                    )
                })}
            </div>
        </>
    )
}

export default Movies
