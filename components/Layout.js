import Link from 'next/link'
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background-dark text-text-primary">
      <header className="site-header">
        <div className="container mx-auto px-4 py-4 md:py-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <Link href="https://www.instagram.com/emiillliie/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400 transition duration-300">
                <FaInstagram size={20} />
              </Link>
              <Link href="https://www.tiktok.com/@musicsn0b" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400 transition duration-300">
                <FaTiktok size={20} />
              </Link>
            </div>
            <h1 className="site-title text-2xl md:text-4xl mb-4 md:mb-0">
              Something About Music
            </h1>
            <div className="w-24 hidden md:block"></div>
          </div>
        </div>
        <nav className="bg-gray-900 text-white py-2 md:py-4 relative z-10">
          <div className="container mx-auto px-4">
            <ul className="flex flex-wrap justify-center space-x-2 md:space-x-8">
              <li><Link href="/" className="nav-link text-sm md:text-base py-1 px-2 md:px-3">HOME</Link></li>
              <li><Link href="/reviews" className="nav-link text-sm md:text-base py-1 px-2 md:px-3">REVIEWS</Link></li>
              <li><Link href="/playlists" className="nav-link text-sm md:text-base py-1 px-2 md:px-3">PLAYLISTS</Link></li>
              <li><Link href="/gallery" className="nav-link text-sm md:text-base py-1 px-2 md:px-3">GALLERY</Link></li>
              <li><Link href="/about" className="nav-link text-sm md:text-base py-1 px-2 md:px-3">ABOUT</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-900 text-white py-6 md:py-8">
        <div className="container mx-auto px-4 text-center text-sm md:text-base">
          <p>&copy; 2024 Something About Music. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}