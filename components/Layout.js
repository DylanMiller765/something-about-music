import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <header>
        <div className="bg-gradient-to-b from-red-800 to-red-600 text-white py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-6xl font-bold text-center text-white title-font">
              Something about music
            </h1>
          </div>
        </div>
        <nav className="bg-gray-800 text-white py-4">
          <div className="container mx-auto px-4">
            <ul className="flex justify-center space-x-6">
              <li><Link href="/" className="hover:text-red-400 transition duration-300">HOME</Link></li>
              <li><Link href="/reviews" className="hover:text-red-400 transition duration-300">REVIEWS</Link></li>
              <li><Link href="/artists" className="hover:text-red-400 transition duration-300">ARTISTS</Link></li>
              <li><Link href="/interviews" className="hover:text-red-400 transition duration-300">INTERVIEWS</Link></li>
              <li><Link href="/about" className="hover:text-red-400 transition duration-300">ABOUT</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Something about music. My amazing boyfriend built this for me. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}