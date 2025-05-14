'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieGenre } from '../redux/slices/MovieGenreSlice';
import { RootState, AppDispatch } from '../redux/store';
import { useRouter } from 'next/navigation';

const Movies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { genres } = useSelector((state: RootState) => state.movieGenre);
  const router = useRouter();

  useEffect(() => {
    dispatch(getMovieGenre());
  }, [dispatch]);

  // Kategoriye tıklanıldığında yönlendirme işlemi
  const handleCategoryClick = (categoryId: number, categoryName: string) => {
    // Kategoriyi obje olarak yönlendirmek için JSON.stringify ile URL'ye ekliyoruz
    router.push(`/movies/${categoryId}?name=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {genres && genres.map((genre) => (
          <div
            key={genre.id}
            onClick={() => handleCategoryClick(genre.id, genre.name)} // İsim de ekleniyor
            className="bg-gradient-to-br from-[#392e9a] via-[#221d58] to-[#3b3b64] text-white py-12 px-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer text-center transform hover:shadow-2xl hover:bg-gradient-to-l"
          >
            <h2 className="text-xl font-semibold">{genre.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
