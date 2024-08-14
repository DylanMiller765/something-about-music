export default function SpotifyEmbed({ uri }) {
  // Extract the album ID from the uri
  const albumId = uri.split(':').pop();

  return (
      <iframe 
          style={{borderRadius: '12px'}} 
          src={`https://open.spotify.com/embed/album/${albumId}?utm_source=generator`}
          width="100%" 
          height="352" 
          frameBorder="0" 
          allowFullScreen="" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
      ></iframe>
  )
}