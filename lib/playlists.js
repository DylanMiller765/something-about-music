import { promises as fs } from 'fs'
import path from 'path'

const playlistsFile = path.join(process.cwd(), 'data', 'playlists.json')

export async function getPlaylists() {
    try {
        const fileContents = await fs.readFile(playlistsFile, 'utf8')
        return JSON.parse(fileContents)
    } catch (error) {
        console.error('Error reading playlists file:', error)
        // If the file doesn't exist, create it with an empty array
        if (error.code === 'ENOENT') {
            await fs.writeFile(playlistsFile, '[]', 'utf8')
            return []
        }
        throw error
    }
}

export async function createPlaylist(playlist) {
    try {
        const playlists = await getPlaylists()
        const newPlaylist = {
            id: Date.now().toString(),
            ...playlist,
            createdAt: new Date().toISOString()
        }
        playlists.push(newPlaylist)
        await fs.writeFile(playlistsFile, JSON.stringify(playlists, null, 2))
        return newPlaylist
    } catch (error) {
        console.error('Error creating playlist:', error)
        throw error
    }
}






