import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

export default function SecureCreatePost() {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        excerpt: '',
        rating: '',
        genres: '',
        content: '',
    })
    const [coverImage, setCoverImage] = useState(null)
    const [error, setError] = useState('')
    const [token, setToken] = useState('')
    const router = useRouter()

    useEffect(() => {
        const urlToken = router.query.token
        if (urlToken) {
            setToken(urlToken)
        }
    }, [router.query.token])

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
                    'Authorization': `Bearer ${token}`
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
                setError('Unexpected server response');
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
            setError('An error occurred while creating the post.')
        }
    }

    if (!token) {
        return <div>Unauthorized access</div>
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