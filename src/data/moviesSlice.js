import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
    const response = await fetch(apiUrl)
    return response.json()
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        list: [],
        fetchStatus: '',
        page: 1,
        // TODO: include totalPages in the state.
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            const loadedPage = action.payload.page

            if (loadedPage === 1) {
                state.list = action.payload.results
            } else {
                state.list = [ ...state.list, ...action.payload.results ]
            }

            state.page = loadedPage
            state.fetchStatus = 'success'
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        })
    }
})

export default moviesSlice
