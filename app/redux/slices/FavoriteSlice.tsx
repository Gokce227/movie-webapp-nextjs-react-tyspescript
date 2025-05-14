'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieFavorite, TvFavorite } from '@/app/constants';

// LocalStorage'dan favori filmleri ve TV dizilerini çekme fonksiyonu
const getFavoritesFromStorage = () => {
     try {
          const storedFavorites = localStorage.getItem('favorites');
          return storedFavorites ? JSON.parse(storedFavorites) : { movies: [], tvShows: [] };
     } catch (error) {
          console.error('Parse Error', error);
          return { movies: [], tvShows: [] };
     }
};

const getSaveFromStorage = () => {
     try {     
          const storedSaves = localStorage.getItem('saved');
          const parsed = storedSaves ? JSON.parse(storedSaves) : {};
          return {
               moviesSave: Array.isArray(parsed.moviesSave) ? parsed.moviesSave : [], // Bos gelirse diye
               tvSave: Array.isArray(parsed.tvSave) ? parsed.tvSave : [],
          };
     } catch (error) {
          console.error('Parse Error', error);
          return { moviesSave: [], tvSave: [] };
     }
};
   

interface FavoriteState {
     favoriteMovies: MovieFavorite[] ;  
     favoriteTvShows: TvFavorite[] ; 
     saveMovies : MovieFavorite []; 
     saveTV: TvFavorite[];
     status: 'idle' | 'loading' | 'succeeded' | 'failed';
     error: string | null;
}

const initialState: FavoriteState = {
          favoriteMovies: getFavoritesFromStorage().movies ||  [] , // Eğer movies null veya undefined ise boş dizi olsun
          favoriteTvShows: getFavoritesFromStorage().tvShows || [], // Aynı şekilde tvShows
          saveMovies: getSaveFromStorage().moviesSave || [],
          saveTV: getSaveFromStorage().tvSave || [],
          status: 'idle',
          error: null,
     
};

// Favorileri LocalStorage'a kaydetme fonksiyonu
const writeFavoritesToStorage = (favorites: FavoriteState) => {
     try {
          localStorage.setItem('favorites', JSON.stringify({
               movies: favorites.favoriteMovies,
               tvShows: favorites.favoriteTvShows
          }));
     } catch (error) {
          console.log('save Error', error);
     }
};


const writeSaveToStorage = (saved: FavoriteState) => {
     try {
          localStorage.setItem('saved', JSON.stringify({
               moviesSave: saved.saveMovies,
               tvSave: saved.saveTV
          }));
     } catch (error) {
          console.log('save Error', error);
     }
};





export const favoriteSlice = createSlice({
     name: 'favoriteSlice',
     initialState,
     reducers: {

          // vorites
          addToFavoriteMovie: (state, action: PayloadAction<MovieFavorite>) => {
               const findMovie = state.favoriteMovies?.some((movie) => movie.id === action.payload.id);
               if (!findMovie) {
                    state.favoriteMovies = [...state.favoriteMovies, action.payload];
                    writeFavoritesToStorage(state);
               }
          },
          removeFromFavoriteMovie: (state, action: PayloadAction<{ id: number }>) => {
               state.favoriteMovies = state.favoriteMovies?.filter((movie) => movie.id !== action.payload.id);
               writeFavoritesToStorage(state);
          },
          addToFavoriteTv: (state, action: PayloadAction<TvFavorite>) => {
               const findTvShow = state.favoriteTvShows?.some((tvShow) => tvShow.id === action.payload.id);
               if (!findTvShow) {
                    state.favoriteTvShows = [...state.favoriteTvShows, action.payload];
                    writeFavoritesToStorage(state);
               }
          },
          removeFromFavoriteTv: (state, action: PayloadAction<{ id: number }>) => {
               state.favoriteTvShows = state.favoriteTvShows?.filter((tvShow) => tvShow.id !== action.payload.id);
               writeFavoritesToStorage(state);
          },

          //Saves
          addToSaveMovie: (state, action: PayloadAction<MovieFavorite>) => {
               const findMovie = state.saveMovies?.some((movie) => movie.id === action.payload.id);
               if (!findMovie) {
                    state.saveMovies = [...state.saveMovies, action.payload];
                    writeSaveToStorage(state);
               }
          },
          removeFromSaveMovie: (state, action: PayloadAction<{ id: number }>) => {
               state.saveMovies = state.saveMovies?.filter((movie) => movie.id !== action.payload.id);
               writeSaveToStorage(state);
          },
          addToSaveTv: (state, action: PayloadAction<TvFavorite>) => {
               const findTvSave = state.saveTV?.some((tv) => tv.id === action.payload.id);
               if (!findTvSave) {
                    state.saveTV = [...state.saveTV, action.payload];
                    writeSaveToStorage(state);
               }
          },
          removeFromSaveTv: (state, action: PayloadAction<{ id: number }>) => {
               state.saveTV= state.saveTV?.filter((tv) => tv.id !== action.payload.id);
               writeSaveToStorage(state);
          },

     },
});

export const { addToSaveMovie, removeFromSaveMovie, addToSaveTv, removeFromSaveTv , addToFavoriteMovie, addToFavoriteTv,removeFromFavoriteMovie ,removeFromFavoriteTv} = favoriteSlice.actions;
export default favoriteSlice.reducer;
