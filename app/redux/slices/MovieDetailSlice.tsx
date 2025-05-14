import {
     API_KEY,
     API_MOVIE_DETAIL,
     MovieDetail,
} from '@/app/constants'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



interface MovieDetailState {
     movieDetail: MovieDetail | null;
     status: 'idle' | 'loading' | 'succeeded' | 'failed';
     error: string | null | undefined;

}

const initialState: MovieDetailState = {
     movieDetail: null,
     status: 'idle',
     error: null,

}

export const getMovieDetailById = createAsyncThunk('getMovieDetailById', async (id:string) => {
     const res = await axios.get(`${API_MOVIE_DETAIL}/${id}?api_key=${API_KEY}`)
     return res.data;
})


export const movieDetailSlice = createSlice({
     name: 'movieDetail',
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder
               .addCase(getMovieDetailById.pending, (state) => {
                    state.status = 'loading';
               })
               .addCase(getMovieDetailById.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.movieDetail = action.payload;
               })
               .addCase(getMovieDetailById.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
               });
        
     },
})

export default movieDetailSlice.reducer
