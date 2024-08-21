import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import '../styles/header.scss'
import { useCallback } from "react"

const Header = () => {
  
  const navigate = useNavigate();
  const starredList = useSelector((state) => state.starred.starredMovies)
  const [searchParams, setSearchParams] = useSearchParams();

  const searchMovies = useCallback((query) => {
    navigate('/');
    setSearchParams({
      search: query
    });
  }, []);

  return (
    <header>
      <Link to="/" data-testid="home" onClick={() => searchMovies()}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredList.length > 0 ? (
            <>
            <i className="bi bi-star-fill bi-star-fill-white" />
            <sup className="star-number">{starredList.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded"> 
        <input type="search" data-testid="search-movies"
          onChange={(e) => searchMovies(e.target.value)} 
          value={searchParams.get('search') || ''}
          className="form-control rounded" 
          placeholder="Search movies..." 
          aria-label="Search movies" 
          aria-describedby="search-addon" 
        />
      </div>      
    </header>
  )
}

export default Header
