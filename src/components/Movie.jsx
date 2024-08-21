import { useDispatch, useSelector } from 'react-redux'
import starredSlice from '../data/starredSlice'
import watchLaterSlice from '../data/watchLaterSlice'
import placeholder from '../assets/not-found-500X750.jpeg'
import { useCallback, useState } from 'react'
import trailerSlice from '../data/trailerSlice'

const Movie = ({ movie, isStarred, isOnWatchList }) => {

    const { starMovie, unstarMovie } = starredSlice.actions
    const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions
    const [isOpen, setOpen] = useState(false);
    const { setCurrentMovieId } = trailerSlice.actions;

    const dispatch = useDispatch()

    const onCloseCard = (e) => {
        e.stopPropagation() 
        setOpen(false);
    }

    const onOpenCard = useCallback(() => {
        setOpen(true)
    })

    const onViewTrailer = useCallback((movie) => {
        dispatch(setCurrentMovieId(movie.id));
    })

    return (
        <div className="wrapper">
        <div 
            className={`card ${isOpen && 'opened'}`}
            role='button'
            onClick={onOpenCard}
        >
            <div className="card-body text-center">
                <div className="overlay" />
                <div className="info_panel">
                    <div className="overview">{movie.overview}</div>
                    <div className="year">{movie.release_date?.substring(0, 4)}</div>
                    {isStarred ? (
                        <span className="btn-star" data-testid="unstar-link" onClick={() => dispatch(unstarMovie(movie))}>
                            <i className="bi bi-star-fill" data-testid="star-fill" />
                        </span>
                    ) : (
                        <span className="btn-star" data-testid="starred-link" onClick={() => dispatch(starMovie(movie))}>
                            <i className="bi bi-star" />
                        </span>
                    )}
                    {isOnWatchList ? (
                        <button type="button" data-testid="remove-watch-later" className="btn btn-light btn-watch-later blue" onClick={() => dispatch(removeFromWatchLater(movie))}><i className="bi bi-check"></i></button>
                    ) : (
                        <button type="button" data-testid="watch-later" className="btn btn-light btn-watch-later" onClick={() => dispatch(addToWatchLater(movie))}>Watch Later</button>
                    )}
                    <button type="button" className="btn btn-dark" onClick={() => onViewTrailer(movie)}>View Trailer</button>                                                
                </div>
                <img className="center-block" src={(movie.poster_path) ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : placeholder} alt="Movie poster" />
            </div>
            <h6 className="title mobile-card">{movie.title}</h6>
            <h6 className="title">{movie.title}</h6>
            <button type="button" className="close" onClick={(e) => onCloseCard(e)} aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>        
    )
}

export default Movie