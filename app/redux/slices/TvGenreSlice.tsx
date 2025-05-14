import { API_TVGENRE, API_KEY } from '@/app/constants'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface GenreState {
     genres: [],
}

const initialState: GenreState = {
     genres: [], // baslangic degerini boz bir dizi olarak verdim
}

export const getTvGenre = createAsyncThunk('getGenre', async () => {
     const res = await axios.get(`${API_TVGENRE}?api_key=${API_KEY}`)
     console.log(res)
     return res.data.genres;
})

export const tvGenreSlice = createSlice({
     name: 'tvGenre',
     initialState,
     reducers: {},
     extraReducers: (builder) => { // HTTPM istekleri icin burayi
          builder.addCase(getTvGenre.fulfilled, (state, action) => {
               state.genres = action.payload // apiden gelen istek action payload
          })


     },
})

export const { } = tvGenreSlice.actions


export default tvGenreSlice.reducer