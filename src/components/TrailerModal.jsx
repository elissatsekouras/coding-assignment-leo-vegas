
import { useCallback, useEffect, useState } from 'react';
import '../styles/modal.scss';
import YoutubePlayer from './YoutubePlayer';
import { ENDPOINT, API_KEY } from '../constants'
import trailerSlice from '../data/trailerSlice';
import { useDispatch } from 'react-redux';

const TrailerModal = ({ movieId }) => {
  const [videoKey, setVideoKey] = useState();
  const { setCurrentMovieId } = trailerSlice.actions;
  const dispatch = useDispatch()

  useEffect(() => {
    const body = document.getElementsByTagName('body');
    body[0].classList.add("scroll-lock");

    return () => {
      body[0].classList.remove("scroll-lock");
    }
  }, [])

  useEffect(() => {
    getMovie(movieId);
  }, []);

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;
  
    setVideoKey(null);

    const videoData = await fetch(URL)
      .then((response) => response.json());
  
    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer');
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
    }
  };

  const closeModal = useCallback(() => {
    dispatch(setCurrentMovieId(null));
  }, []);

  return (
    <div 
      className="modal-background"
      onClick={closeModal}
    >
      <div className='model-container'>
        <button
          type='button'
          aria-label='Close'
          onClick={closeModal}
          className='btn btn-light close-modal-button'
        >
          <span>&times;</span>
        </button>
        {videoKey ? 
          (
            <YoutubePlayer
              videoKey={videoKey}
            />
          ) : (
            <div>
              <h6>no trailer available. Try another movie</h6>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default TrailerModal;