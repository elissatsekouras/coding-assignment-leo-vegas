import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import starredSlice from '../data/starredSlice'
import '../styles/starred.scss'
import Movies from './Movies'

const Starred = () => {

    const starredList = useSelector((state) => state.starred.starredMovies)
    const { clearAllStarred } = starredSlice.actions
    const dispatch = useDispatch()

  return (
    <div className="starred" data-testid="starred">
      {starredList.length > 0 && (<div data-testid="starred-movies" className="starred-movies">
        <h6 className="header">Starred movies</h6>
        <Movies 
          movies={starredList}
        />
        <footer className="text-center">
          <button className="btn btn-primary" onClick={() => dispatch(clearAllStarred())}>Remove all starred</button>
        </footer>
      </div>)}

      {starredList.length === 0 && (<div className="text-center empty-cart">
        <i className="bi bi-star" />
        <p>There are no starred movies.</p>
        <p>Go to <Link to='/'>Home</Link></p>
      </div>)}
    </div>
  )
}

export default Starred
