export const ROUTES = {
     HOME : '/', 
     MOVIES :'/movies',
     TVSeries : '/TVSeries',
     MOVIE: '/movie',
     MYFAVORITELIST:'/MyFavoriteList',
     SEARCH : '/search',
     TV: '/TV',
     MYSAVEDLIST :'/MySavedList'
};

export interface Movie { // TV
     id: number; 
     title: string;
     poster_path: string;
     overview: string;
     release_date: string;
     vote_average: number; // Apiden donen veriler eklendi
     
}


export interface MovieFavorite {
     id: number;
     title: string;
     poster_path: string;
     vote_average: number;
     // diğer alanlar olabilir
}


export interface TvFavorite {
     id: number;
     name: string;
     poster_path: string;
     vote_average: number;
}

export interface MovieDetail {
     id: number;
     title: string;
     overview: string;
     vote_average: number;
     backdrop_path: string;
     poster_path: string;
     genres: { id: number; name: string }[];
     spoken_languages: { english_name: string }[];
     release_date: string;
   }



export interface TvDetail {
     id: number;
     title: string;
     overview: string;
     vote_average: number;
     backdrop_path: string;
     poster_path: string;
     genres: { id: number; name: string }[];
     spoken_languages: { english_name: string }[];
     release_date: string;
}


export interface Genre {
     id: number;
     name: string;
}
   
//APIKEY
export const API_KEY = "0a2f094239b9785bbdba45fb6e37a9a1"

export const API_IMG = "https://image.tmdb.org/t/p/original"


//Movie API
export const API_MOVIEGENRE = "https://api.themoviedb.org/3/genre/movie/list"

export const API_MOVIE_NEWPLAYING = "https://api.themoviedb.org/3/movie/now_playing"
export const API_MOVIE_POPULAR = "https://api.themoviedb.org/3/movie/popular"
export const API_TOP_RATED = "https://api.themoviedb.org/3/movie/top_rated"
export const API_MOVIE_UPCOMING = "https://api.themoviedb.org/3/movie/upcoming"
export const API_MOVIE_DISCOVER = "https://api.themoviedb.org/3/discover/movie"
export const API_MOVIE_DETAIL = "https://api.themoviedb.org/3/movie"
export const API_MOVIE_SEARCH = "https://api.themoviedb.org/3/search/movie"


//TV API
export const API_TVGENRE = "https://api.themoviedb.org/3/genre/tv/list"
export const API_TV_AIRINGTODAY = "https://api.themoviedb.org/3/tv/airing_today"
export const API_TV_ONTHEAIR = "https://api.themoviedb.org/3/tv/on_the_air"
export const API_TV_POPULAR = "https://api.themoviedb.org/3/tv/popular"
export const API_TV_TOPRATED = "https://api.themoviedb.org/3/tv/top_rated"
export const API_TV_DISCOVER = "https://api.themoviedb.org/3/discover/tv"
export const API_TV_DETAIL = "https://api.themoviedb.org/3/tv"
export const API_TV_SEARCH = "https://api.themoviedb.org/3/search/tv" 