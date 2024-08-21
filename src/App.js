import { useCallback, useEffect, useState } from 'react'
import { Routes, Route, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import { fetchMovies } from './data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from './constants'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import './app.scss'
import TrailerModal from './components/TrailerModal'

const App = () => {

  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const currentMovieId = useSelector((state) => state.trailer.currentMovieId);

  useEffect(() => {
    getMovies(searchQuery)
  }, [searchQuery]);

  const getMovies = useCallback((searchQuery) => {
    if (searchQuery && searchQuery.trim().length > 0) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + searchQuery));
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
    }
  }, []);

  return (
    <div className="App">
      <Header />

      <div className="container">
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/starred" element={<Starred />} />
          <Route path="/watch-later" element={<WatchLater />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
       {currentMovieId && <TrailerModal 
          movieId={currentMovieId}
        />}
      </div>
    </div>
  )
}

export default App
