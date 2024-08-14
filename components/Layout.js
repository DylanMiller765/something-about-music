import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <header>
        <div className="bg-gradient-to-b from-red-900 to-red-700 text-white py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-6xl font-bold text-center text-white font-title">
              Something About Music
            </h1>
          </div>
        </div>
        <nav className="bg-gray-900 text-white py-4">
          <div className="container mx-auto px-4">
            <ul className="flex justify-center space-x-6">
              <li><Link href="/" className="hover:text-red-400 transition duration-300">HOME</Link></li>
              <li><Link href="/reviews" className="hover:text-red-400 transition duration-300">REVIEWS</Link></li>
              <li><Link href="/playlists" className="hover:text-red-400 transition duration-300">PLAYLISTS</Link></li>
              <li><Link href="/gallery" className="hover:text-red-400 transition duration-300">GALLERY</Link></li>
              <li><Link href="/about" className="hover:text-red-400 transition duration-300">ABOUT</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="flex-grow bg-black">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Something About Music. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}