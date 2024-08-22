import { useDispatch, useSelector } from 'react-redux'
import '../styles/movies.scss'
import { useCallback, useEffect, useRef } from 'react';
import Movies from './Movies';
import { fetchMovies } from '../data/moviesSlice';
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../constants';

const Discover = ({ searchQuery }) => {
  const movies = useSelector((state) => state.movies);
  const moreMoviesRef = useRef();
  const dispatch = useDispatch();
  const page  = movies.page;

  useEffect(() => {
    getMovies(searchQuery)
  }, [searchQuery]);

  const loadMoreMovies = useCallback((entries) => {
    if (entries[0].isIntersecting) {
      getMovies(searchQuery, page + 1);
    }
  }, [searchQuery, page])

  const getMovies = useCallback((searchQuery, page = 1) => {
    if (searchQuery && searchQuery.trim().length > 0) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&page=${page}&query=` + searchQuery));
    } else {
      dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=${page}`));
    }
  }, []);

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
        <Movies 
          movies={movies.list}
        />
        {movies.fetchStatus !== 'loading' && (
          <span ref={moreMoviesRef}>
            Loading...
          </span>
        )}
      </>
    )
}

export default Discover;
