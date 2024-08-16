import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

export default function SecureUploadImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const urlToken = router.query.token;
      const envToken = process.env.NEXT_PUBLIC_SECURE_POST_TOKEN;
      const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      
      console.log("URL Token:", urlToken);
      console.log("Environment Token:", envToken);
      console.log("Is Localhost:", isLocalhost);

      if (isLocalhost) {
        console.log("Running on localhost, bypassing token check");
        setIsAuthorized(true);
      } else if (urlToken === envToken) {
        console.log("Tokens match, setting authorized to true");
        setIsAuthorized(true);
      } else {
        console.log("Not authorized");
        setIsAuthorized(false);
        router.push('/');
      }
      setIsLoading(false);
    }
  }, [router.isReady, router.query.token]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SECURE_POST_TOKEN}`
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert('Image uploaded successfully!');
        setSelectedFile(null);
      } else {
        setError(data.message || 'An error occurred while uploading the image.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while uploading the image.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <div>Unauthorized access</div>;
  }

  return (
    <>
      <Head>
        <title>Upload Image | Something About Music</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-red-600">Upload Image</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="image" className="block mb-2">Select Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Upload Image
          </button>
        </form>
      </div>
    </>
  );
}