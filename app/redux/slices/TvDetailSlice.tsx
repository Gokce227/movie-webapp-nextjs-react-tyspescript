import {
     API_KEY,
     API_TV_DETAIL,
     TvDetail,
} from '@/app/constants'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



interface TvDetailState {
     tvDetail: TvDetail | null;
     status: 'idle' | 'loading' | 'succeeded' | 'failed';
     error: string | null | undefined;

}

const initialState: TvDetailState = {
     tvDetail: null,
     status: 'idle',
     error: null,

}

export const getTvDetailById = createAsyncThunk('getTvDetailById', async (id: string) => {
     const res = await axios.get(`${API_TV_DETAIL}/${id}?api_key=${API_KEY}`)
     return res.data;
})


export const tvDetailSlice = createSlice({
     name: 'tvDetail',
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder
               .addCase(getTvDetailById.pending, (state) => {
                    state.status = 'loading';
               })
               .addCase(getTvDetailById.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.tvDetail = action.payload;
               })
               .addCase(getTvDetailById.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
               });

     },
})

export default tvDetailSlice.reducer
