export default function SpotifyEmbed({ uri }) {
    return (
      <iframe
        src={`https://open.spotify.com/embed/${uri}`}
        width="100%"
        height="380"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    )
  }