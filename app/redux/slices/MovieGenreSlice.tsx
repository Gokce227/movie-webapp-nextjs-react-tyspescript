
import { API_MOVIEGENRE, API_KEY } from '@/app/constants'
import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface GenreState{
     genres : [],
}

const initialState: GenreState = {
     genres: [], // baslangic degerini boz bir dizi olarak verdim
}

export const getMovieGenre = createAsyncThunk('getGenre', async () => {
     const res = await axios.get(`${API_MOVIEGENRE}?api_key=${API_KEY}`)
     console.log(res.data.genres);
     return  res.data.genres;
})

export const movieGenreSlice = createSlice({
     name: 'movieGenre',
     initialState,
     reducers: {},
     extraReducers: (builder) => { // HTTPM istekleri icin burayi
          builder.addCase(getMovieGenre.fulfilled, (state, action) => {
                    state.genres = action.payload // apiden gelen istek action payload
               })
              
               
     },
})

export const { } = movieGenreSlice.actions



export default movieGenreSlice.reducer