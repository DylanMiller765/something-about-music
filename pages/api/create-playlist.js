import { createPlaylist } from '../../lib/playlists'

const SECURE_TOKEN = process.env.NEXT_PUBLIC_SECURE_POST_TOKEN;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${SECURE_TOKEN}`) {
    console.log('Unauthorized attempt:', authHeader);
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const { title, description, spotifyId } = req.body;
    console.log('Received playlist data:', { title, description, spotifyId });
    
    const newPlaylist = await createPlaylist({ title, description, spotifyId });
    console.log('New playlist created:', newPlaylist);
    
    res.status(200).json({ message: 'Playlist created successfully', playlist: newPlaylist });
  } catch (error) {
    console.error('Playlist creation error:', error);
    res.status(500).json({ message: 'Error creating playlist', error: error.message });
  }
}