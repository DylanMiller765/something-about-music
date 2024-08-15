import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const SECURE_TOKEN = process.env.NEXT_PUBLIC_SECURE_POST_TOKEN;

export default async function handler(req, res) {
  console.log('Received upload request');

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${SECURE_TOKEN}`) {
    console.log('Unauthorized access attempt');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const uploadDir = path.join(process.cwd(), 'public/images/gallery');
  await fs.mkdir(uploadDir, { recursive: true });

  const form = formidable({
    uploadDir: uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ message: 'Error uploading image' });
    }

    console.log('Files received:', files);

    const file = files.image?.[0];  // formidable v3 returns an array
    if (!file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const newPath = path.join(uploadDir, file.newFilename);

    try {
      await fs.rename(file.filepath, newPath);
      console.log('Image saved successfully:', newPath);
      res.status(200).json({ message: 'Image uploaded successfully', filename: file.newFilename });
    } catch (error) {
      console.error('Error moving file:', error);
      res.status(500).json({ message: 'Error saving image' });
    }
  });
}