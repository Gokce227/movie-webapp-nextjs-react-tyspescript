'use client';
import React from 'react';
import { API_IMG, ROUTES } from '@/app/constants';
import { FaStar } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';


const MovieCard = ({ tv }) => {
     const { poster_path, vote_average, name, id } = tv; // Destructing yapiyoruz 

     return (
          <Link href={`${ROUTES.TV}/${id}`}>
               <div className="relative overflow-hidden rounded-xl group transition duration-500 hover:scale-105 cursor-pointer">
                    <div className="backdrop-blur-md group-hover:backdrop-blur-0 transition-all duration-500 ease-in-out transform group-hover:scale-105">
                         <Image
                              src={`${API_IMG}/${poster_path}`}
                              alt={`Poster for the TV series: ${name}`} // Seo icin boyle yaptik 
                              width={300}
                              height={350}
                              className="rounded-xl transition-transform duration-500 ease-in-out"
                         />
                    </div>
                    <div className="absolute bottom-1 left-2 text-yellow-400 bg-black/60 px-3 py-1 rounded flex items-center gap-1 transition duration-300 opacity-90 group-hover:opacity-100">
                         <p className="font-semibold">{vote_average?.toFixed(1)}</p>
                         <FaStar className="text-yellow-400" />
                    </div>
               </div>
               <div className="bottom-4 left-0 right-0 text-black py-2 px-4 text-center font-bold opacity-80 group-hover:opacity-100 transition-all duration-300">
                    {name}
               </div>
          </Link>
     );
};

export default MovieCard;
