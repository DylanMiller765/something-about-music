import Head from 'next/head'
import Image from 'next/image'
import Layout from '../../components/Layout'
import { getPostBySlug, getAllPosts } from '../../lib/posts'
import ReactMarkdown from 'react-markdown'
import YouTubeEmbed from '../../components/YouTubeEmbed'
import SpotifyEmbed from '../../components/SpotifyEmbed'
import Comments from '../../components/Comments'
import ShareButtons from '../../components/ShareButtons'


export default function Post({ post }) {
    if (!post) {
      console.error('Post data is undefined');
      return <div>Error: Post not found</div>;
    }
  
    console.log('Cover Image:', post.coverImage);

  return (
    <Layout>
      <Head>
        <title>{post.title} | Something About Music</title>
      </Head>

      <article className="prose lg:prose-xl mx-auto text-white">
        {post.coverImage && (
          <div className="relative w-full h-64 mb-6">
            <Image
              src={`/images/${post.coverImage}`}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4 text-red-600">{post.title}</h1>
        <ReactMarkdown
          components={{
            YouTube: YouTubeEmbed,
            Spotify: SpotifyEmbed,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>

      <ShareButtons url={`https://somethingaboutmusic.com/posts/${post.slug}`} title={post.title} />
      <Comments post={post} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, ['title', 'date', 'slug', 'content', 'coverImage'])
  console.log('Post data:', post);  // Add this line
  return {
    props: {
      post,
    },
  }
}