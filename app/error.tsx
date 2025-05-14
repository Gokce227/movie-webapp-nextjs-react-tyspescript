'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
     useEffect(() => {
          console.error('Hata yakalandı:', error);
     }, [error]);

     return (
          <div className="h-screen flex flex-col items-center justify-center text-white  bg-white/40 backdrop-blur-md p-4">
               <h1 className="text-4xl font-bold mb-4 text-[#FFCE00]">Bir hata oluştu </h1>
               <p className="mb-6 text-lg text-gray-300">{error.message}</p>
               <button
                    onClick={() => reset()}
                    className="px-6 py-3 bg-[#FFCE00] text-black rounded-lg shadow-md hover:bg-yellow-400 transition duration-300"
               >
                    Sayfayı Yeniden Yükle
               </button>
          </div>
     );
}
