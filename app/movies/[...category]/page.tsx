'use client';
import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import MovieList from '../../components/MovieList';

const Page = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const categoryId = params?.category as string;
  const categoryName = searchParams?.get('name') as string; // URL'den kategori adını alıyoruz

  return (
    // iki Tane veri gonderiyoruz [...] gibi
    <div className="p-6">
      <MovieList selectedGenre={{ id: parseInt(categoryId), name: categoryName }} /> 
    </div>
  );
};

export default Page;

