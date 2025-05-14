import React from 'react'
import MovieList from './components/MovieList'
import TvList from './components/TvList'

const Page = () => {
  return (
    <div className="min-h-screen text-white px-6 py-10 space-y-12">

      {/* Movie Section */}
      <section>
        <h2 className="text-3xl font-bold text-blue-900 border-b-2 border-blue-900 inline-block mb-6">
          🎬 Movies
        </h2>
        <MovieList />
      </section>

      {/* Siyah çizgi */}
      <hr className="border-black" />

      {/* TV Section */}
      <section>
        <h2 className="text-3xl font-bold text-blue-900 border-b-2 border-blue-900 inline-block mb-6">
          📺 TV Shows
        </h2>
        <TvList />
      </section>
    </div>
  )
}

export default Page
