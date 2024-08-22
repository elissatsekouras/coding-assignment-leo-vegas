import Movie from './Movie'
import { useSelector } from 'react-redux'
import '../styles/movies.scss'
import { useEffect, useMemo, useRef } from 'react';

const Movies = ({ loadMoreMovies }) => {
    const movies = useSelector((state) => state.movies);
    const starredList = useSelector((state) => state.starred.starredMovies);
    const watchLaterList = useSelector((state) => state.watchLater.watchLaterMovies);
    const moreMoviesRef = useRef();

    const starredIds = useMemo(() => {
        return starredList.map(movie => movie.id)
    }, [starredList]);

    const watchLaterIds = useMemo(() => {
        return watchLaterList.map(movie => movie.id)
    }, [watchLaterList])

    useEffect(() => {
        const observer = new window.IntersectionObserver(loadMoreMovies);
    
        if (moreMoviesRef.current) {
          observer.observe(moreMoviesRef.current);
        }
    
        return () => {
          if (moreMoviesRef.current) {
            observer.unobserve(moreMoviesRef.current);
          }
        }
      }, [moreMoviesRef, loadMoreMovies, movies.fetchStatus])

    return (
        <>
            <div 
                data-testid="movies" 
                className="movie-grid"
            >
                {movies.list.map((movie) => {
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
            {movies.fetchStatus !== 'loading' && (
                <span ref={moreMoviesRef}>
                    Loading...
                </span>
            )}
        </>
    )
}

export default Movies
