import Layout from '../components/Layout'
import SpotifyEmbed from '../components/SpotifyEmbed'
import { getPlaylists } from '../lib/playlists'

export default function PlaylistsPage({ playlists }) {
  return (
    
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-red-600">My Playlists</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-red-500">{playlist.title}</h2>
              <p className="text-gray-300 mb-4">{playlist.description}</p>
              <SpotifyEmbed uri={`spotify:playlist:${playlist.spotifyId}`} />
            </div>
          ))}
        </div>
      </div>
    
  )
}

export async function getServerSideProps() {
  const playlists = await getPlaylists()
  return {
    props: {
      playlists,
    },
  }
}