import {
     API_MOVIE_NEWPLAYING,
     API_KEY,
     API_MOVIE_POPULAR,
     API_TOP_RATED,
     API_MOVIE_UPCOMING,
     API_MOVIE_DISCOVER,
} from '@/app/constants'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Movie } from '@/app/constants'

interface MovieListState {
     nowPlaying: Movie[]
     popular: Movie[]
     topRated: Movie[]
     upComing: Movie[]
     status: 'idle' | 'loading' | 'succeeded' | 'failed'
     error: string | null | undefined
     genreMovies: Movie[],
}

const initialState: MovieListState = {
     nowPlaying: [],
     popular: [],
     topRated: [],
     upComing: [],
     status: 'idle',
     error: null,
     genreMovies: [],
}

export const getNowPlaying = createAsyncThunk('getNowPlaying', async () => {
     const res = await axios.get(`${API_MOVIE_NEWPLAYING}?api_key=${API_KEY}`)
     return res.data.results
})

export const getPopular = createAsyncThunk('getPopular', async () => {
     const res = await axios.get(`${API_MOVIE_POPULAR}?api_key=${API_KEY}`)
     return res.data.results
})

export const getTopRated = createAsyncThunk('getTopRated', async () => {
     const res = await axios.get(`${API_TOP_RATED}?api_key=${API_KEY}`)
     return res.data.results
})

export const getUpComing = createAsyncThunk('getUpComing', async () => {
     const res = await axios.get(`${API_MOVIE_UPCOMING}?api_key=${API_KEY}`)
     return res.data.results
})

export const getMovieListByGenre = createAsyncThunk('getMovieListByGenre', async (id) => {
     const res = await axios.get(`${API_MOVIE_DISCOVER}?api_key=${API_KEY}&with_genres=${id}`)
     return res.data.results;
})

export const movieListSlice = createSlice({
     name: 'movieList',
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder
               // Now Playing
               .addCase(getNowPlaying.pending, (state) => { // Bekleme durumunda 
                    state.status = 'loading'
                    state.error = null
               })
               .addCase(getNowPlaying.fulfilled, (state, action) => {
                    state.nowPlaying = action.payload
                    state.status = 'succeeded'
               })
               .addCase(getNowPlaying.rejected, (state, action) => {
                    state.status = 'failed'
                    state.error = action.error.message || 'Bir hata oluştu'
               })

               // Popular
               .addCase(getPopular.pending, (state) => {
                    state.status = 'loading'
                    state.error = null
               })
               .addCase(getPopular.fulfilled, (state, action) => {
                    state.popular = action.payload
                    state.status = 'succeeded'
               })
               .addCase(getPopular.rejected, (state, action) => {
                    state.status = 'failed'
                    state.error = action.error.message || 'Bir hata oluştu'
               })

               // Top Rated
               .addCase(getTopRated.pending, (state) => {
                    state.status = 'loading'
                    state.error = null
               })
               .addCase(getTopRated.fulfilled, (state, action) => {
                    state.topRated = action.payload
                    state.status = 'succeeded'
               })
               .addCase(getTopRated.rejected, (state, action) => {
                    state.status = 'failed'
                    state.error = action.error.message || 'Bir hata oluştu'
               })

               // Upcoming
               .addCase(getUpComing.pending, (state) => {
                    state.status = 'loading'
                    state.error = null
               })
               .addCase(getUpComing.fulfilled, (state, action) => {
                    state.upComing = action.payload
                    state.status = 'succeeded'
               })
               .addCase(getUpComing.rejected, (state, action) => {
                    state.status = 'failed'
                    state.error = action.error.message || 'Bir hata oluştu'
               })

               .addCase(getMovieListByGenre.pending, (state) => {
                    state.status = 'loading';
               })
               .addCase(getMovieListByGenre.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.genreMovies = action.payload;
               })
               .addCase(getMovieListByGenre.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message || 'Bir hata oluştu';
               });
     },
})

export default movieListSlice.reducer
