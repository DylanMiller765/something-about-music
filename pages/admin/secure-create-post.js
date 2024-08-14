import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export default function SecureCreatePost() {
    const [formData, setFormData] = useState({
        title: '',
        releaseDate: '',
        label: '',
        date: '',
        excerpt: '',
        rating: '',
        genres: '',
        content: '',
        trackList: '',
    })
    const [coverImage, setCoverImage] = useState(null)
    const [error, setError] = useState('')
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (router.isReady) {
            const urlToken = router.query.token
            console.log("URL Token:", urlToken)
            console.log("ENV Token:", publicRuntimeConfig.NEXT_PUBLIC_SECURE_POST_TOKEN)
            if (urlToken === publicRuntimeConfig.NEXT_PUBLIC_SECURE_POST_TOKEN) {
                console.log("Tokens match, setting authorized to true")
                setIsAuthorized(true)
            } else {
                console.log("Tokens do not match, setting authorized to false")
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

    const handleImageChange = (e) => {
        setCoverImage(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formDataToSend = new FormData()

        for (const key in formData) {
            formDataToSend.append(key, formData[key])
        }

        if (coverImage) {
            formDataToSend.append('coverImage', coverImage)
        }

        try {
            const response = await fetch('/api/create-post', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${publicRuntimeConfig.NEXT_PUBLIC_SECURE_POST_TOKEN}`
                },
                body: formDataToSend,
            })

            const responseText = await response.text();
            console.log('Response:', responseText);

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error('Error parsing response:', e);
                setError('Unexpected server response: ' + responseText);
                return;
            }

            if (response.ok) {
                alert('Post created successfully!')
                router.push('/')
            } else {
                setError(data.message || 'An error occurred while creating the post.')
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while creating the post: ' + error.message)
        }
    }


    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!isAuthorized) {
        return <div>Unauthorized access. Redirecting...</div>
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
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
                        <label htmlFor="releaseDate" className="block mb-2">Release Date</label>
                        <input
                            type="text"
                            id="releaseDate"
                            name="releaseDate"
                            value={formData.releaseDate}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded text-black"
                        />
                    </div>
                    <div>
                        <label htmlFor="label" className="block mb-2">Label</label>
                        <input
                            type="text"
                            id="label"
                            name="label"
                            value={formData.label}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded text-black"
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="block mb-2">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded text-black"
                        />
                    </div>
                    <div>
                        <label htmlFor="excerpt" className="block mb-2">Excerpt</label>
                        <textarea
                            id="excerpt"
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded text-black"
                        />
                    </div>
                    <div>
                        <label htmlFor="rating" className="block mb-2">Rating</label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            min="0"
                            max="10"
                            step="0.1"
                            value={formData.rating}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded text-black"
                        />
                    </div>
                    <div>
                        <label htmlFor="genres" className="block mb-2">Genres (comma-separated)</label>
                        <input
                            type="text"
                            id="genres"
                            name="genres"
                            value={formData.genres}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded text-black"
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block mb-2">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded text-black"
                            rows="10"
                        />
                    </div>
                    <div>
                        <label htmlFor="spotifyUri" className="block mb-2">Spotify URI</label>
                            <input
                            type="text"
                            id="spotifyUri"
                            name="spotifyUri"
                            value={formData.spotifyUri}
                            onChange={handleChange}
                            placeholder="e.g. album:0bQglEvsHphrS19FGODEGo"
                            className="w-full p-2 border border-gray-300 rounded text-black"
                        />
                    </div>
                    <div>
                        <label htmlFor="coverImage" className="block mb-2">Cover Image</label>
                        <input
                            type="file"
                            id="coverImage"
                            name="coverImage"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Create Post
                    </button>
                </form>
            </div>
        </Layout>
    )
}