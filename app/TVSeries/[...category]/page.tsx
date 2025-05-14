'use client';
import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import TvList from '../../components/TvList';

const Page = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const categoryId = params?.category as string;
  const categoryName = searchParams?.get('name') as string; // URL'den kategori adını alıyoruz

  console.log('page calisti')

  return (
    <div className="p-6">
      <TvList selectedGenre={{ id: parseInt(categoryId), name: categoryName }} />
    </div>
  );
};

export default Page;

