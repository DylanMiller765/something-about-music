import Head from 'next/head'
import Image from 'next/image'
import Layout from '../../components/Layout'
import { getPostBySlug, getAllPosts } from '../../lib/posts'
import SpotifyEmbed from '../../components/SpotifyEmbed'

export default function Review({ post }) {
  if (!post) {
    return <div>Error: Post not found</div>
  }

  return (
    <Layout>
      <Head>
        <title>{post.title || 'Untitled'} | Something about music</title>
      </Head>

      <article className="container mx-auto px-4 py-8">
        <div className="bg-background-card rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 p-6">
              {post.coverImage ? (
                <Image
                  src={`/images/${post.coverImage}`}
                  alt={`${post.title || 'Album'} cover`}
                  width={300}
                  height={300}
                  className="rounded-lg shadow-md"
                />
              ) : (
                <div className="w-[300px] h-[300px] bg-gray-300 flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}
            </div>
            <div className="p-6 md:p-8">
              <h1 className="text-4xl font-bold text-text-accent mb-2">{post.title || 'Untitled'}</h1>
              <p className="text-text-secondary mb-1">Released: {post.releaseDate || 'Unknown'}</p>
              <p className="text-text-secondary mb-1">Label: {post.label || 'Unknown'}</p>
              <p className="text-text-secondary mb-2">
                Genre: {Array.isArray(post.genres) ? post.genres.join(', ') : 'Unknown'}
              </p>
              <p className="text-text-accent font-bold text-xl">Rating: {post.rating || 'N/A'} / 10</p>
            </div>
          </div>
        </div>

        <div className="mt-8 prose prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content || 'No content available.' }} />
        </div>

        {post.spotifyUri && (
          <div className="mt-8 bg-background-card rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-text-accent mb-4">Listen on Spotify:</h2>
            <SpotifyEmbed uri={post.spotifyUri} />
          </div>
        )}
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const posts = await getAllPosts(['slug'])
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug, [
    'title',
    'releaseDate',
    'label',
    'genres',
    'rating',
    'content',
    'coverImage',
    'spotifyUri',
  ])

  return {
    props: {
      post,
    },
  }
}