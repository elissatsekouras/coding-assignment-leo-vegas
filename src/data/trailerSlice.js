import { createSlice } from "@reduxjs/toolkit";

const trailerSlice = createSlice({
    name: 'trailer',
    initialState: {
      currentMovieId: null,
    },
    reducers: {
      setCurrentMovieId: (state, action) => {
        return { 
          ...state, 
          currentMovieId: action.payload,
        }
      }
    },
})

export default trailerSlice;