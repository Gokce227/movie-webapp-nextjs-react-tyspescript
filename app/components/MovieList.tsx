'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../redux/store'
import {
  getPopular,
  getNowPlaying,
  getTopRated,
  getUpComing,
  getMovieListByGenre,
} from '../redux/slices/MovieListSlice'
import MovieCard from './MovieCard'
import Loading from '../loading'
import Error from '../error'
import { Genre } from '@/app/constants'


interface MovieListProps {
  selectedGenre: Genre | null // Hata almamak icin boyle yazdik
}

const MovieList: React.FC<MovieListProps> = ({ selectedGenre }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { nowPlaying, popular, topRated, upComing, genreMovies, status, error } = useSelector(
    (state: RootState) => state.movieList // Stateden verileri cektik
  )

  
  useEffect(() => {
    if (selectedGenre?.id) {
      dispatch(getMovieListByGenre(selectedGenre.id)) // sadece id'yi gönderiyoruz
    } else {
      dispatch(getNowPlaying())
      dispatch(getPopular())
      dispatch(getTopRated())
      dispatch(getUpComing())
    }
  }, [dispatch, selectedGenre])

  console.log('Selected Genre:', selectedGenre); 
  console.log('Genre Movies:', genreMovies); 

  console.log(genreMovies);  //
  if (status === 'loading') return <Loading />
  if (status === 'failed') return <Error error={error} />

  return (
    <div className="mb-12">
      {selectedGenre ? (
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] bg-clip-text text-transparent mb-3">
            Movies in {selectedGenre.name} {/* Kategori adını doğru şekilde yazdırıyoruz */}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {genreMovies && genreMovies.slice(0, 12).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Now Playing Section */}
          <div className="mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] bg-clip-text text-transparent mb-3">Now Playing</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {nowPlaying && nowPlaying.slice(0, 5).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>

          {/* Popular Movies Section */}
          <div className="mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] bg-clip-text text-transparent mb-3">Popular</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {popular && popular.slice(0, 5).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>

          {/* Top Rated Movies Section */}
          <div className="mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] bg-clip-text text-transparent mb-3">Top Rated</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {topRated && topRated.slice(0, 5).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>

          {/* Upcoming Movies Section */}
          <div className="mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] bg-clip-text text-transparent mb-3">Upcoming</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {upComing && upComing.slice(0, 5).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MovieList
