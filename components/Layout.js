// components/Layout.js
import Head from 'next/head'
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-gray-800 text-gray-100 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <span className="text-4xl font-bold text-red-600">Something About Music</span>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/music" className="hover:text-red-500 transition duration-300">MUSIC</Link></li>
              <li><Link href="/film" className="hover:text-red-500 transition duration-300">FILM</Link></li>
              <li><Link href="/travel" className="hover:text-red-500 transition duration-300">TRAVEL</Link></li>
              <li><Link href="/art" className="hover:text-red-500 transition duration-300">ART</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-3/4 md:pr-8">
            {children}
          </div>
          <aside className="md:w-1/4 mt-8 md:mt-0">
            <h2 className="text-2xl font-bold mb-4 text-red-600">LATEST NEWS</h2>
            <div className="space-y-4">
              {/* Placeholder for latest news items */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Latest Article Title</h3>
                <p className="text-sm text-gray-400">Short excerpt of the latest article...</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Another Recent Article</h3>
                <p className="text-sm text-gray-400">Brief description of another recent article...</p>
              </div>
              {/* Add more news items as needed */}
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-gray-800 text-gray-100 p-4 text-center">
        <p>&copy; 2023 somethingaboutmusic. All rights reserved.</p>
      </footer>
    </div>
  )
}