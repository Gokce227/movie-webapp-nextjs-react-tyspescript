'use client';
import React, { useState, useEffect } from 'react';
import { BsSearch } from "react-icons/bs";
import { RiHeartFill } from "react-icons/ri";
import Link from 'next/link';
import { ROUTES } from '@/app/constants/index';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { getMovieSearchResults, setQuery } from '../redux/slices/SearchSlice';
import { useRouter } from "next/navigation";
import { FaRegBookmark } from "react-icons/fa6";

const Navbar = () => {

  // Butun favori ve kaydetme sayilari 
  const [favoriteCounter, setFavoriteCounter] = useState(0);
  const [saveCounter, setSaveCounter] = useState(0)
  const favoriteMoviesCount = useSelector((state: RootState) => state.favorite.favoriteMovies?.length || 0);
  const favoriteTvShowsCount = useSelector((state: RootState) => state.favorite.favoriteTvShows?.length || 0);
  const saveTVCount = useSelector((state: RootState) => state.favorite?.saveMovies.length|| 0); 
  const saveMovieCount = useSelector((state:RootState)=> state.favorite?.saveTV.length || 0);

  useEffect(() => {
    setFavoriteCounter(favoriteMoviesCount + favoriteTvShowsCount);
    setSaveCounter(saveMovieCount + saveTVCount);
  }, [favoriteMoviesCount, favoriteTvShowsCount,saveMovieCount, saveTVCount]); 

  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (searchText.trim().toLowerCase()) {
      dispatch(setQuery(searchText));
      dispatch(getMovieSearchResults(searchText));
      router.push(`${ROUTES.SEARCH}`);

      
      setTimeout(() => {
        setSearchText(''); // Arama tamamlandıktan sonra metni temizle
      }, 4000); // 5s sonra metni temizle
    }
  }, [searchText, dispatch, router]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    
  };

  return (
    <nav className="w-full flex flex-col items-center px-4 py-4 font-impact text-white bg-transparent">
      {/* Search */}
      <div className="flex items-center gap-2 w-full relative mt-2 mb-4 sm:px-4">
        <input
          type="text"
          placeholder="Film ara..."
          value={searchText}
          onChange={handleSearchChange}
          className="w-full h-10 sm:h-12 px-10 py-2 sm:py-3 
            border-b-4 border-transparent 
            focus:outline-none focus:ring-0 text-[#302b63] placeholder-white text-base sm:text-2xl
            transition duration-200
            bg-transparent
            focus:border-b-transparent
            border-b-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]"
        />
        <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#302b63] text-lg sm:text-xl" />
      </div>

      {/* Navigation Links */}
      <ul className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 text-lg sm:text-2xl">
        <li className="cursor-pointer bg-gradient-to-br from-[#4C6BA8] via-[#302b63] to-[#24243e] bg-clip-text text-transparent hover:text-[#1e3a8a] transition-colors duration-300">
          <Link href={ROUTES.HOME}>Home</Link>
        </li>
        <li className="cursor-pointer bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] bg-clip-text text-transparent hover:text-[#1e3a8a] transition-colors duration-300">
          <Link href={ROUTES.MOVIES}>Movies</Link>
        </li>
        <li className="cursor-pointer bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] bg-clip-text text-transparent hover:text-[#1e3a8a] transition-colors duration-300">
          <Link href={ROUTES.TVSeries}>TV Series</Link>
        </li>
        <li className="cursor-pointer relative group transition duration-300">
          <Link href={ROUTES.MYFAVORITELIST} className="flex items-center gap-1 relative">
            <span className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] bg-clip-text text-transparent group-hover:text-[#1e3a8a] transition duration-300">
              Favoriler
            </span>
            <div className="relative">
              <RiHeartFill className="text-xl sm:text-2xl bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] bg-clip-text text-transparent group-hover:text-[#1e3a8a]" />
              <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {favoriteCounter}
              </div>
            </div>
          </Link>
        </li>
        <li className="cursor-pointer relative group transition duration-300">
          <Link href={ROUTES.MYSAVEDLIST} className="flex items-center gap-1 relative">
            <span className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] bg-clip-text text-transparent group-hover:text-[#1e3a8a] transition duration-300">
              Saved
            </span>
            <div className="relative">
              <FaRegBookmark className="text-xl sm:text-2xl bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] bg-clip-text text-transparent group-hover:text-[#1e3a8a]" />
              <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                 {saveCounter}
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
