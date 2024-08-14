import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layout'
import { getPosts } from '../lib/posts'

export default function Home({ posts }) {
  return (
    <Layout>
      <Head>
        <title>Something About Music</title>
        <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <h2 className="text-3xl font-bold mb-8 text-red-500">Featured Review</h2>
      {posts.length > 0 && (
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg p-6 border-2 border-red-500 mb-16">
          <div className="md:flex">
            <div className="md:flex-shrink-0 mr-6">
              <Image 
                src={posts[0].coverImage ? `/images/${posts[0].coverImage}` : "/images/placeholder-image.jpeg"}
                alt={posts[0].title}
                width={300}
                height={300}
                className="object-cover rounded"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-3xl font-bold text-red-500 mb-2">{posts[0].title}</h3>
              <div className="text-yellow-500 font-bold mb-2 text-xl">{posts[0].rating}/10</div>
              <p className="text-gray-300 mb-4">{posts[0].excerpt}</p>
              <p className="text-gray-400 mb-4">Released: {posts[0].releaseDate}</p>
              <div className="mb-4 flex flex-wrap">
                {posts[0].genres && posts[0].genres.map((genre, index) => (
                  <span key={index} className="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2">{genre}</span>
                ))}
              </div>
              <Link href={`/posts/${posts[0].slug}`} className="text-red-500 hover:text-red-400 transition duration-300">
                Read Full Review
              </Link>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-3xl font-bold mb-8 text-red-500">Recent Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.slice(1).map((post) => (
          <div key={post.slug} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg p-6 border-2 border-red-500">
            <div className="flex">
              <div className="flex-shrink-0 mr-6">
                <Image 
                  src={post.coverImage ? `/images/${post.coverImage}` : "/images/placeholder-image.jpeg"}
                  alt={post.title}
                  width={150}
                  height={150}
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-red-500 mb-2">{post.title}</h3>
                <div className="text-yellow-500 font-bold mb-2 text-lg">{post.rating}/10</div>
                <p className="text-gray-300 mb-2">{post.excerpt}</p>
                <p className="text-gray-400 mb-4">Released: {post.releaseDate}</p>
                <div className="mb-4 flex flex-wrap">
                  {post.genres && post.genres.map((genre, index) => (
                    <span key={index} className="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2">{genre}</span>
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