import {
     API_KEY,
     API_TV_AIRINGTODAY,
     API_TV_POPULAR,
     API_TV_TOPRATED,
     API_TV_ONTHEAIR,
     API_TV_DISCOVER,
} from '@/app/constants'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Movie } from '@/app/constants'

interface MovieListState {
     airRingToday: Movie[]
     popular: Movie[]
     topRated: Movie[]
     onTheAir: Movie[]
     status: 'idle' | 'loading' | 'succeeded' | 'failed'
     error: string | null | undefined
     genreTv: Movie[],
}

const initialState: MovieListState = {
     airRingToday: [],
     popular: [],
     topRated: [],
     onTheAir: [],
     status: 'idle',
     error: null,
     genreTv: [],
}

export const getAirRingToday = createAsyncThunk('getAirRingToday', async () => {
     const res = await axios.get(`${API_TV_AIRINGTODAY}?api_key=${API_KEY}`)
     return res.data.results
})

export const getPopular = createAsyncThunk('getPopular', async () => {
     const res = await axios.get(`${API_TV_POPULAR}?api_key=${API_KEY}`)
     return res.data.results
})

export const getTopRated = createAsyncThunk('getTopRated', async () => {
     const res = await axios.get(`${API_TV_TOPRATED}?api_key=${API_KEY}`)
     return res.data.results
})

export const getOnTheAir = createAsyncThunk('getOnTheAir', async () => {
     const res = await axios.get(`${API_TV_ONTHEAIR}?api_key=${API_KEY}`)
     return res.data.results
})

export const getTvListByGenre = createAsyncThunk('getTvListByGenre', async (id) => {
     const res = await axios.get(`${API_TV_DISCOVER}?api_key=${API_KEY}&with_genres=${id}`)
     return res.data.results;
})

export const tvListSlice = createSlice({
     name: 'tvList',
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder
               // Now Playing
               .addCase(getAirRingToday.pending, (state) => { // Bekleme durumunda 
                    state.status = 'loading'
                    state.error = null
               })
               .addCase(getAirRingToday.fulfilled, (state, action) => {
                    state.airRingToday = action.payload
                    state.status = 'succeeded'
               })
               .addCase(getAirRingToday.rejected, (state, action) => {
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
               .addCase(getOnTheAir.pending, (state) => {
                    state.status = 'loading'
                    state.error = null
               })
               .addCase(getOnTheAir.fulfilled, (state, action) => {
                    state.onTheAir = action.payload
                    state.status = 'succeeded'
               })
               .addCase(getOnTheAir.rejected, (state, action) => {
                    state.status = 'failed'
                    state.error = action.error.message || 'Bir hata oluştu'
               })

               .addCase(getTvListByGenre.pending, (state) => {
                    state.status = 'loading';
               })
               .addCase(getTvListByGenre.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.genreTv = action.payload;
               })
               .addCase(getTvListByGenre.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message || 'Bir hata oluştu';
               });
     },
})

export default tvListSlice.reducer
