import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layout'
import { getPosts } from '../lib/posts'

export default function Home({ posts }) {
  console.log('Posts on home page:', posts);

  return (
    <Layout>
      <Head>
        <title>Something About Music</title>
      </Head>

      <h1 className="text-5xl font-bold text-center mb-12 text-red-600 title-font">
        SOMETHING ABOUT MUSIC
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <Link href={`/posts/${post.slug}`} key={post.slug}>
            <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition duration-300">
              <div className="relative w-full h-48 mb-4">
                <Image 
                  src={post.coverImage ? `/images/${post.coverImage}` : "/images/placeholder-image.jpeg"}
                  alt={post.title || "Cover image"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="rounded"
                  priority
                />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-red-500">{post.title}</h2>
              <p className="text-gray-300 mb-2">{post.excerpt}</p>
              <span className="text-sm text-gray-400">{post.date}</span>
            </div>
          </Link>
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