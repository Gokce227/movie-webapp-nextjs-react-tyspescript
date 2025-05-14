// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import movieGenreReducer from "./slices/MovieGenreSlice";
import tvGenreReducer from "./slices/TvGenreSlice"
import movieListReducer from './slices/MovieListSlice'
import movieDetailReducer from './slices/MovieDetailSlice';
import  favoriteReducer  from "./slices/FavoriteSlice";
import searchReducer from './slices/SearchSlice'
import tvListReducer from './slices/TvListSlice'
import tvDetailReducer  from "./slices/TvDetailSlice";

export const store = configureStore({
    reducer: {
        movieGenre: movieGenreReducer,
        tvGenre: tvGenreReducer,
        movieList : movieListReducer,
        movieDetail: movieDetailReducer, 
        favorite : favoriteReducer, 
        search: searchReducer,
        tvList : tvListReducer, 
        tvDetail : tvDetailReducer,
    },
});

// Tipleri export et, burasi onemli
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
