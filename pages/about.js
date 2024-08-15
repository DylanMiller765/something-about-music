import Head from 'next/head'
import Image from 'next/image'

export default function About() {
  return (
    <>
      <Head>
        <title>About | Something About Music</title>
        <meta name="description" content="Learn more about Something About Music, your go-to source for album reviews and music insights." />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-red-600">About Something About Music</h1>
        
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0 p-6">
              <Image
                src="/images/sports.jpg"
                alt="Music enthusiast listening to vinyl"
                width={300}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="p-6 md:p-8">
              <p className="text-lg mb-4">
                Welcome to Something About Music, your passionate corner of the internet dedicated to the art and soul of music.
              </p>
              <p className="mb-4">
                Founded in 2024, our mission is to celebrate the diverse world of music through in-depth album reviews, curated playlists, and insightful articles that dive deep into the heart of what makes music so powerful and meaningful.
              </p>
              <p className="mb-4">
                Whether you're a casual listener or a die-hard audiophile, we're here to guide you through the ever-evolving landscape of sound, from classic albums that shaped generations to the cutting-edge releases pushing the boundaries of what's possible.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Our Passion</h2>
            <p className="mb-4">
              At Something About Music, we believe that every album tells a story, and every song has the power to touch lives. Our team of music enthusiasts brings years of listening experience and a deep appreciation for the craft of songwriting and production.
            </p>
            <p>
              We're committed to providing honest, thoughtful reviews that go beyond just rating albums. We aim to contextualize each release within the artist's career and the broader musical landscape.
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Join Our Community</h2>
            <p className="mb-4">
              Music is meant to be shared, and we invite you to be part of our growing community of music lovers. Share your thoughts, discover new favorites, and engage in passionate discussions about the albums and artists that move you.
            </p>
            <p>
              Follow us on social media, subscribe to our newsletter, and don't hesitate to reach out with your own recommendations or feedback. Together, let's explore the vast and vibrant world of music.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xl font-semibold text-red-500 mb-4">
            "Music gives a soul to the universe, wings to the mind, flight to the imagination, and life to everything." - Plato
          </p>
          <p className="text-lg">
            Thank you for being part of our musical journey. Keep listening, keep discovering, and keep the music alive!
          </p>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {}, // Add any necessary props here
  }
}