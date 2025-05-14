// app/loading.tsx
'use client';

import React from 'react';
import { RiMovie2Fill } from 'react-icons/ri';

const Loading = () => {
     return (
          <div className="flex items-center justify-center min-h-screen  text-yellow-300 flex-col gap-4">
               <RiMovie2Fill className="text-6xl animate-bounce" />
               <p className="text-xl font-semibold animate-pulse">Yükleniyor...</p>
          </div>
     );
};

export default Loading;
