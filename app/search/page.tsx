'use client';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import TVCard from '../components/TVCard'
import { useParams } from 'next/navigation';
import MovieCard from '../components/MovieCard';

const SearchPage = () => {
     const params = useParams();
     console.log(params); // Parametreleri kontrol et
     const { movieResults, tvResults } = useSelector((state: RootState) => state.search);

     return (
          <div className="p-4">
               {/* Film Sonuçları */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-4">Movies</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-8">
                         {movieResults.length > 0 ? (
                              movieResults.map((movie: any) => (
                                   <MovieCard key={movie.id} movie={movie} type="movie" />
                              ))
                         ) : (
                              <p className="text-white">Movie not found.</p>
                         )}
                    </div>
               </div>

               {/* TV Dizi Sonuçları */}
               <div>
                    <h2 className="text-3xl font-bold text-white mb-4">TV Series</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-8">
                         {tvResults.length > 0 ? (
                              tvResults.map((tv: any) => (
                                   <TVCard key={tv.id} tv={tv} type="tv" />
                              ))
                         ) : (
                              <p className="text-white">TV series not found.</p>
                         )}
                    </div>
               </div>
          </div>
     );
};

export default SearchPage;
