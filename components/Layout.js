// components/Layout.js
import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background-dark text-text-primary">
      <header className="site-header">
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400 transition duration-300">
                <FaFacebookF size={24} />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400 transition duration-300">
                <FaTwitter size={24} />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400 transition duration-300">
                <FaInstagram size={24} />
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400 transition duration-300">
                <FaYoutube size={24} />
              </Link>
            </div>
            <h1 className="site-title">
              Something About Music
            </h1>
            <div className="w-24"></div>
          </div>
        </div>
        <nav className="bg-gray-900 text-white py-4 relative z-10">
          <div className="container mx-auto px-4">
            <ul className="flex justify-center space-x-8">
              <li><Link href="/" className="nav-link">HOME</Link></li>
              <li><Link href="/reviews" className="nav-link">REVIEWS</Link></li>
              <li><Link href="/playlists" className="nav-link">PLAYLISTS</Link></li>
              <li><Link href="/gallery" className="nav-link">GALLERY</Link></li>
              <li><Link href="/about" className="nav-link">ABOUT</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Something About Music. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}