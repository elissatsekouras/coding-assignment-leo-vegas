import { Routes, Route, useSearchParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import Header from './components/Header'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import './app.scss'
import TrailerModal from './components/TrailerModal'
import Discover from './components/Discover'

const App = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const currentMovieId = useSelector((state) => state.trailer.currentMovieId);

  return (
    <div className="App">
      <Header />

      <div className="container">
        <Routes>
          <Route path="/" element={<Discover searchQuery={searchQuery} />} />
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
