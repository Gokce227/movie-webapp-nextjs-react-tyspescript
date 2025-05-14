'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { useParams } from 'next/navigation';
import { getTvDetailById } from '@/app/redux/slices/TvDetailSlice';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { API_IMG, TvFavorite } from '@/app/constants';
import Loading from '@/app/loading';
import Error from '@/app/error';
import { addToFavoriteTv, removeFromFavoriteTv, addToSaveTv, removeFromSaveTv } from '@/app/redux/slices/FavoriteSlice';
import { Heart, HeartOff } from 'lucide-react';
import { FaRegBookmark } from "react-icons/fa6";


const TvDetailPage = () => {
     const dispatch = useDispatch<AppDispatch>();
     const { tvDetail, status, error } = useSelector((state: RootState) => state.tvDetail);
     const { favoriteTvShows , saveTV  } = useSelector((state: RootState) => state.favorite);


     const params = useParams();
     const id = Array.isArray(params.id) ? params.id[0] : params.id;

     useEffect(() => {
          if (id) {
               dispatch(getTvDetailById(id));
               console.log('Updated saveTv state:', saveTV);
          }
     }, [id, dispatch, saveTV]);

     if (status === 'loading') return <Loading />;
     if (status === 'failed') return <Error error={error} />;

     const {
          name,
          overview,
          vote_average,
          backdrop_path,
          poster_path,
          genres = [],
          spoken_languages = [],
          release_date,
     } = tvDetail || {};

     const release_year = new Date(release_date);

//---------------------------------------------------------Favorite-------------------------

     const isFavorite = favoriteTvShows?.some((tv) => tv.id === Number(id));

     const handleAddFavorite = () => {
          if (!name || !poster_path || vote_average === undefined) return;

          const payload: TvFavorite = {
               id: Number(id),
               name,
               poster_path,
               vote_average,
          };

          if (!favoriteTvShows.some((tv) => tv.id === Number(id))) {
               dispatch(addToFavoriteTv(payload));
          }
     };

     const handleRemoveFavorite = () => {
          dispatch(removeFromFavoriteTv({ id: Number(id) }));

     };


     

//----------------------------------------------------Saved---------------------------------
         const isSaved = saveTV?.some((tv) => tv.id === Number(id));
     
         const handleAddSave = () => {
             if (!name|| !poster_path || vote_average === undefined) return;
     
             const payload: TvFavorite = {
                 id: Number(id),
                 name,
                 poster_path,
                 vote_average,
             };
     
              if (saveTV && !saveTV.some((tv) => tv.id === Number(id))) {
                 dispatch(addToSaveTv(payload)); // optional: favoriyle aynıysa kaldırabilirsin
             }
         };
     
         const handleRemoveSave = () => {
             dispatch(removeFromSaveTv({ id: Number(id) }));
         };

     return (
          <div className="relative min-h-screen py-10 px-6 overflow-hidden text-gray-900">
               {backdrop_path && (
                    <div className="absolute inset-0 z-0">
                         <Image
                              src={`${API_IMG}/${backdrop_path}`}
                              alt="Backdrop"
                              layout="fill"
                              objectFit="cover"
                              priority
                         />
                    </div>
               )}

               <div className="absolute inset-0 z-0 bg-white/40 backdrop-blur-md" />

               <div className="relative z-10 max-w-5xl mx-auto rounded-xl p-6 md:flex gap-8 transition-all duration-300 group hover:scale-[1.015] hover:shadow-2xl hover:backdrop-blur-lg bg-white/60 shadow-lg backdrop-blur-md">
                    {poster_path && (
                         <div className="min-w-[200px] transition-transform duration-300 group-hover:scale-105">
                              <Image
                                   src={`${API_IMG}/${poster_path}`}
                                   alt={name}
                                   width={300}
                                   height={450}
                                   className="rounded-lg shadow-md"
                              />
                         </div>
                    )}

                    <div className="mt-4 md:mt-0 flex-1">
                         <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] bg-clip-text text-transparent mb-3">{name}</h1>

                         <p className="text-sm text-gray-800 mb-2">🎬 Yayın Tarihi: {release_year.getFullYear()}</p>

                         <div className="flex items-center gap-2 mb-4">
                              <FaStar className="text-yellow-500" />
                              <p className="text-lg font-semibold text-gray-900">{vote_average?.toFixed(1)}</p>
                         </div>

                         <p className="text-gray-700 text-sm mb-4">{overview}</p>

                         <div className="mb-2">
                              <span className="font-semibold text-gray-900">Türler:</span>{' '}
                              {genres.map((g: any) => (
                                   <span key={g.id} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 mt-1">
                                        {g.name}
                                   </span>
                              ))}
                         </div>

                         <div className="mt-2">
                              <span className="font-semibold text-gray-900">Diller:</span>{' '}
                              {spoken_languages.map((lang: any, index: number) => (
                                   <span key={index} className="inline-block text-sm text-gray-800 mr-2">
                                        {lang.english_name}
                                   </span>
                              ))}
                         </div>

                         {/*  Add/Remove Favorite Button */}

                         <div className="mt-6 flex justify-center gap-3">
                              {isFavorite ? (
                                   <button
                                        onClick={handleRemoveFavorite}
                                        className="group inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-red-400 text-red-500 hover:bg-red-50 transition duration-200"
                                   >
                                        <svg
                                             className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                                             fill="none"
                                             stroke="currentColor"
                                             strokeWidth="2"
                                             viewBox="0 0 24 24"
                                        >
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Remove from Favorites
                                   </button>
                              ) : (
                                   <button
                                        onClick={handleAddFavorite}
                                        className="group inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-green-400 text-green-600 hover:bg-green-50 transition duration-200"
                                   >
                                        <svg
                                             className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                                             fill="none"
                                             stroke="currentColor"
                                             strokeWidth="2"
                                             viewBox="0 0 24 24"
                                        >
                                             <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M12 4.354a4.354 4.354 0 00-6.158 6.158l6.158 6.158 6.158-6.158a4.354 4.354 0 00-6.158-6.158z"
                                             />
                                        </svg>
                                        Add to Favorites
                                   </button>
                              )}
                              
                              {isSaved ? (
                                   <button
                                        onClick={handleRemoveSave}
                                        className="group inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-red-400 text-red-500 hover:bg-red-50 transition duration-200"
                                   >
                                        <FaRegBookmark className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                                        
                                        Remove from Save
                                   </button>
                              ) : (
                                   <button
                                        onClick={handleAddSave}
                                             className="group inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-blue-400 text-blue-600 hover:bg-green-50 transition duration-200"
                                   >
                                        <FaRegBookmark className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                                        Add to Save
                                   </button>
                              )}

                         </div>
                         



                    </div>
               </div>
          </div>
     );
};

export default TvDetailPage;
