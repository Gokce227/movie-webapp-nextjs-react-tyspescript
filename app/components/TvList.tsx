'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../redux/store'
import { getAirRingToday,getPopular,getOnTheAir,getTvListByGenre,getTopRated } from '../redux/slices/TvListSlice'
import TvCard from './TVCard'
import Loading from '../loading'
import Error from '../error'
import { Genre } from '@/app/constants'


interface MovieListProps {
     selectedGenre: Genre | null
}
// [...category]'den bilgileri alarak propsu buraya yolladik 
// Burdan da Cardlara gidecek

const TvList: React.FC<MovieListProps> = ({ selectedGenre }) => {
     const dispatch = useDispatch<AppDispatch>()
     const { airRingToday, popular, topRated, onTheAir, genreTv, status, error } = useSelector(
          (state: RootState) => state.tvList
     )


     useEffect(() => {
          if (selectedGenre?.id) {
               dispatch(getTvListByGenre(selectedGenre.id)) // sadece id'yi gönderiyoruz
          } else {
               dispatch(getOnTheAir())
               dispatch(getPopular())
               dispatch(getTopRated())
               dispatch(getAirRingToday())
          }
     }, [dispatch, selectedGenre])

     //console.log('Selected Genre:', selectedGenre);
     //console.log('Genre Tv:', genreTv);

     console.log(genreTv);  //
     if (status === 'loading') return <Loading />
     if (status === 'failed') return <Error error={error} />

     return (
          <div className="mb-12">
               {selectedGenre ? (
                    <div className="mb-8">
                         <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] bg-clip-text text-transparent mb-3">
                              TV in {selectedGenre.name} {/* Kategori adını doğru şekilde yazdırıyoruz */}
                         </h2>
                         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                              {genreTv && genreTv.slice(0, 12).map((tv) => (
                                   <TvCard key={tv.id} tv={tv} />
                              ))}
                         </div>
                    </div>
               ) : (
                    <>
                         {/* Now Playing Section */}
                         <div className="mb-8">
                              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] bg-clip-text text-transparent mb-3">Now Playing</h2>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                   {airRingToday && airRingToday.slice(0, 5).map((tv) => (
                                        <TvCard key={tv.id} tv={tv} />
                                   ))}
                              </div>
                         </div>

                         {/* Popular Movies Section */}
                         <div className="mb-8">
                              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] bg-clip-text text-transparent mb-3">Popular</h2>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                   {popular && popular.slice(0, 5).map((tv) => (
                                        <TvCard key={tv.id} tv={tv} />
                                   ))}
                              </div>
                         </div>

                         {/* Top Rated Movies Section */}
                         <div className="mb-8">
                              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] bg-clip-text text-transparent mb-3">Top Rated</h2>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                   {topRated && topRated.slice(0, 5).map((tv) => (
                                        <TvCard key={tv.id} tv={tv} />
                                   ))}
                              </div>
                         </div>

                         {/* Upcoming Movies Section */}
                         <div className="mb-8">
                              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] bg-clip-text text-transparent mb-3">Upcoming</h2>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                   {onTheAir && onTheAir.slice(0, 5).map((tv) => (
                                        <TvCard key={tv.id} tv={tv} />
                                   ))}
                              </div>
                         </div>
                    </>
               )}
          </div>
     )
}

export default TvList
