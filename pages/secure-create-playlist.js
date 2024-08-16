import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function SecureCreatePlaylist() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        spotifyId: '',
    })
    const [error, setError] = useState('')
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (router.isReady) {
            const urlToken = router.query.token
            const envToken = process.env.NEXT_PUBLIC_SECURE_POST_TOKEN
            const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
            
            console.log("URL Token:", urlToken)
            console.log("Environment Token:", envToken)
            console.log("Is Localhost:", isLocalhost)

            if (isLocalhost) {
                console.log("Running on localhost, bypassing token check")
                setIsAuthorized(true)
            } else if (urlToken === envToken) {
                console.log("Tokens match, setting authorized to true")
                setIsAuthorized(true)
            } else {
                console.log("Not authorized")
                setIsAuthorized(false)
                router.push('/')
            }
            setIsLoading(false)
        }
    }, [router.isReady, router.query.token])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/create-playlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SECURE_POST_TOKEN}`
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                alert('Playlist added successfully!')
                router.push('/playlists')
            } else {
                setError(data.message || 'An error occurred while adding the playlist.')
            }
        } catch (error) {
            console.error('Error:', error)
            setError('An error occurred while adding the playlist: ' + error.message)
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!isAuthorized) {
        return <div>Unauthorized access</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-red-600">Add New Playlist</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block mb-2">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded text-black"
                />
            </div>
            <div>
                <label htmlFor="description" className="block mb-2">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded text-black"
                    rows="3"
                />
            </div>
            <div>
                <label htmlFor="spotifyId" className="block mb-2">Spotify Playlist URI</label>
                <input
                    type="text"
                    id="spotifyId"
                    name="spotifyId"
                    value={formData.spotifyId}
                    onChange={handleChange}
                    required
                    placeholder='spotify:playlist:37i9dQZF1DXcBWIGoYBM5M'
                    className="w-full p-2 border border-gray-300 rounded text-black"
                />
            </div>
            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Add Playlist
            </button>
        </form>
        </div>
    )
}