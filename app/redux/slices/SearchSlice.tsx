import { API_MOVIE_SEARCH , API_KEY, API_TV_SEARCH} from '@/app/constants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



interface searchState {
    query:string;
    movieResults: any[];
    tvResults: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined
     
}

const initialState: searchState = {
    query: '',
    movieResults: [],
    tvResults: [],
     status: 'idle',
     error: null,
}


export const getMovieSearchResults = createAsyncThunk('getMovieSearchResults', async (query:string) => {
    const res = await axios.get(`${API_MOVIE_SEARCH}?api_key=${API_KEY}&query=${query}`)
    console.log('gelen movie veri',res.data);
    return res.data.results
})

export const getTvSearchResults = createAsyncThunk('getTvSearchResults', async (query: string) => {
    const res = await axios.get(`${API_TV_SEARCH}?api_key=${API_KEY}&query=${query}`)
    console.log('gelen Tv veri', res.data);
    return res.data.results
})

//export const  getTvSearchResults = 

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setQuery: (state ,action) => {
            state.query= action.payload;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(getMovieSearchResults.pending, (state) => { // Bekleme durumunda 
                            state.status = 'loading'
                            state.error = null
                       })
                       .addCase(getMovieSearchResults.fulfilled, (state, action) => {
                            state.movieResults = action.payload
                            state.status = 'succeeded'
                       })
                       .addCase(getMovieSearchResults.rejected, (state, action) => {
                            state.status = 'failed'
                            state.error = action.error.message || 'Bir hata oluştu'
                       })
            .addCase(getTvSearchResults.pending, (state) => { // Bekleme durumunda 
                state.status = 'loading'
                state.error = null
            })
            .addCase(getTvSearchResults.fulfilled, (state, action) => {
                state.tvResults = action.payload
                state.status = 'succeeded'
            })
            .addCase(getTvSearchResults.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'Bir hata oluştu'
            })
    },



})

export const {  setQuery } = searchSlice.actions

export default searchSlice.reducer