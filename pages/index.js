import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { getPosts } from '../lib/posts'

export default function Home({ featuredReview, recentReviews }) {
  return (
    <>
      <Head>
        <title>Something About Music</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-red-600">Featured Review</h1>
        
        {featuredReview && (
          <Link href={`/posts/${featuredReview.slug}`} className="block mb-8 md:mb-12">
            <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 border border-red-600 hover:border-red-400">
              <div className="flex flex-col md:flex-row p-4">
                <div className="w-full md:w-1/6 mb-4 md:mb-0 md:pr-4">
                  <Image 
                    src={`/images/${featuredReview.coverImage}`}
                    alt={featuredReview.title || 'Album cover'}
                    width={150}
                    height={150}
                    layout="responsive"
                    className="rounded"
                  />
                </div>
                <div className="w-full md:w-2/3 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold mb-2 text-red-500">{featuredReview.title}</h2>
                    <p className="text-yellow-500 text-lg md:text-xl mb-2">{featuredReview.rating}/10</p>
                    <p className="text-gray-400 text-sm mb-2">Released: {featuredReview.releaseDate || 'N/A'}</p>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">{featuredReview.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {Array.isArray(featuredReview.genres) && featuredReview.genres.map(genre => (
                        <span key={genre} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-red-500 hover:text-red-400 transition duration-300 text-sm font-semibold">
                    Read Full Review
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-red-600">Recent Reviews</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
          {recentReviews && recentReviews.map((post) => (
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

        <div className="text-center">
          <Link href="/reviews" className="inline-block bg-red-600 text-white px-4 md:px-6 py-2 rounded text-sm md:text-base hover:bg-red-700 transition duration-300">
            View All Reviews
          </Link>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  try {
    const allPosts = await getPosts()
    const featuredReview = allPosts[0] || null
    const recentReviews = allPosts.slice(1, 7) || []

    return {
      props: {
        featuredReview: featuredReview ? JSON.parse(JSON.stringify(featuredReview)) : null,
        recentReviews: JSON.parse(JSON.stringify(recentReviews)),
      },
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      props: {
        featuredReview: null,
        recentReviews: [],
      },
    }
  }
}