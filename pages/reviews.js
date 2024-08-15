import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { getPosts } from '../lib/posts'

export default function Reviews({ posts }) {
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [filteredPosts, setFilteredPosts] = useState([])

  useEffect(() => {
    if (Array.isArray(posts)) {
      const filtered = posts.filter(post => 
        filter === 'all' || (Array.isArray(post.genres) && post.genres.includes(filter))
      ).sort((a, b) => {
        if (sortBy === 'date') return new Date(b.date) - new Date(a.date)
        if (sortBy === 'rating') return b.rating - a.rating
        return 0
      })
      setFilteredPosts(filtered)
    }
  }, [posts, filter, sortBy])

  const allGenres = [...new Set(posts.flatMap(post => post.genres || []))]

  return (
    <>
      <Head>
        <title>Album Reviews | Something About Music</title>
      </Head>

      <main className="container mx-auto px-4 py-6 md:py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-red-600">Album Reviews</h1>
        
        <div className="mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-4 md:mb-0 w-full md:w-auto">
            <label htmlFor="filter" className="block mb-2 text-sm md:text-base text-white">Filter by genre:</label>
            <select 
              id="filter" 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="w-full md:w-auto bg-gray-800 text-white p-2 rounded text-sm md:text-base"
            >
              <option value="all">All</option>
              {allGenres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-auto">
            <label htmlFor="sort" className="block mb-2 text-sm md:text-base text-white">Sort by:</label>
            <select 
              id="sort" 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-auto bg-gray-800 text-white p-2 rounded text-sm md:text-base"
            >
              <option value="date">Date</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
          {filteredPosts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="block">
              <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 border border-red-600 hover:border-red-400 h-full">
                <div className="flex p-4 h-full">
                  <div className="w-1/3 pr-4">
                    <Image 
                      src={`/images/${post.coverImage}`}
                      alt={post.title || 'Album cover'}
                      width={100}
                      height={100}
                      layout="responsive"
                      className="rounded"
                    />
                  </div>
                  <div className="w-2/3 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold mb-1 text-red-500">{post.title}</h3>
                      <p className="text-yellow-500 text-base md:text-lg mb-1">{post.rating}/10</p>
                      <p className="text-gray-400 text-xs md:text-sm mb-2">Released: {post.releaseDate || 'N/A'}</p>
                      <p className="text-gray-300 text-xs md:text-sm mb-2 line-clamp-2">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {Array.isArray(post.genres) && post.genres.map(genre => (
                          <span key={genre} className="text-xs bg-gray-700 text-gray-300 px-1 py-0.5 rounded">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-red-500 hover:text-red-400 transition duration-300 text-xs md:text-sm">
                      Read Full Review
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center text-gray-400 mt-8 text-sm md:text-base">
            No reviews found. Try changing the filter or adding more reviews.
          </div>
        )}
      </main>
    </>
  )
}

export async function getStaticProps() {
  try {
    const posts = await getPosts()
    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
      },
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      props: {
        posts: [],
      },
    }
  }
}