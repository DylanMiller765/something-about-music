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
              </p>
              <p className="mb-4">
              </p>
              <p className="mb-4">
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Our Passion</h2>
            <p className="mb-4">
            </p>
            <p>
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Join Our Community</h2>
            <p className="mb-4">
            </p>
            <p>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xl font-semibold text-red-500 mb-4">
          </p>
          <p className="text-lg">
            
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