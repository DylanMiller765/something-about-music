export default function SpotifyEmbed({ uri }) {
  // Extract the type and ID from the URI
  const [type, id] = uri.split(':').slice(-2);

  return (
    <iframe
      style={{ borderRadius: '12px' }}
      src={`https://open.spotify.com/embed/${type}/${id}?utm_source=generator`}
      width="100%"
      height="352"
      frameBorder="0"
      allowFullScreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
}