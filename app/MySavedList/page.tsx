'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';
import TVCard from '../components/TVCard'

const MyList = () => {

     // Daha Sonra Kaydet Page
     const { saveMovies, saveTV } = useSelector((state: RootState) => state.favorite);
     console.log(saveTV)
     console.log(saveMovies)

     return (
          <div className="p-4 bg-white/40 backdrop-blur-md rounded-lg ">
               <h1 className="text-3xl font-semibold text-[#1C398E]  text-center border-b-1 border-black mb-4 py-2">Saved</h1>

               {/* Film Listesi */}
               <h2 className="text-xl font-semibold text-gray-800 mb-3">Saved Movies</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center">
                    {
                         saveMovies?.length > 0 ? (
                              saveMovies.map((movie) => (
                                   <MovieCard key={movie.id} movie={movie} />
                              ))
                         ) : (
                                   <div className="text-md text-gray-500 text-center w-full">You don't have save movies</div>
                         )
                    }
               </div>

               {/* TV Dizisi Listesi */}
               <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Save TV Series</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center">
                    {
                         saveTV?.length > 0 ? (
                            saveTV.map((tv) => (
                                   <TVCard key={tv.id} tv={tv} />
                              ))
                         ) : (
                               <div className="text-md text-gray-500 text-center w-full">You don't have any Save TV series</div>
                         )
                    }
               </div>
          </div>
     );
};

export default MyList;
