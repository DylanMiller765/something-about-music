import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layout'
import { getPosts } from '../lib/posts'

export default function Home({ posts }) {
  return (
    <Layout>
      <Head>
        <title>Something about music</title>
        <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-white">Featured Review</h2>
          {posts.length > 0 && (
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-6">
              <div className="md:flex">
                <div className="md:flex-shrink-0 mr-6 relative overflow-hidden group">
                  <Image 
                    src={posts[0].coverImage ? `/images/${posts[0].coverImage}` : "/images/placeholder-image.jpeg"}
                    alt={posts[0].title}
                    width={300}
                    height={300}
                    className="object-cover rounded transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-lg font-bold">View Review</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-3xl font-bold text-red-500 mb-2">{posts[0].title}</h3>
                  <div className="text-red-400 font-bold mb-2">{posts[0].rating}/10</div>
                  <p className="text-gray-300 mb-4">{posts[0].excerpt}</p>
                  <div className="mb-4 flex flex-wrap">
                    {posts[0].genres && posts[0].genres.map((genre, index) => (
                      <span key={index} className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">{genre}</span>
                    ))}
                  </div>
                  <Link href={`/posts/${posts[0].slug}`} className="text-red-500 hover:text-red-400 transition duration-300">
                    Read Full Review
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <h2 className="text-3xl font-bold mb-8 text-white">Recent Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.slice(1).map((post) => (
            <div key={post.slug} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-6">
              <div className="flex">
                <div className="flex-shrink-0 mr-6 relative overflow-hidden group">
                  <Image 
                    src={post.coverImage ? `/images/${post.coverImage}` : "/images/placeholder-image.jpeg"}
                    alt={post.title}
                    width={150}
                    height={150}
                    className="object-cover rounded transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm font-bold">View Review</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-red-500 mb-2">{post.title}</h3>
                  <div className="text-red-400 font-bold mb-2">{post.rating}/10</div>
                  <p className="text-gray-300 mb-4">{post.excerpt}</p>
                  <div className="mb-4 flex flex-wrap">
                    {post.genres && post.genres.map((genre, index) => (
                      <span key={index} className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">{genre}</span>
                    ))}
                  </div>
                  <Link href={`/posts/${post.slug}`} className="text-red-500 hover:text-red-400 transition duration-300">
                    Read Full Review
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getPosts()
  return {
    props: {
      posts,
    },
  }
}