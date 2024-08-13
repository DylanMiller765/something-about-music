import { writeFile } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

const SECURE_TOKEN = process.env.SECURE_POST_TOKEN;
const postsDirectory = path.join(process.cwd(), 'posts');
const imagesDirectory = path.join(process.cwd(), 'public', 'images');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${SECURE_TOKEN}`) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error parsing form data' });
        }

        const { title, date, excerpt, rating, genres, content } = fields;

        console.log('Received fields:', fields);
        console.log('Received files:', files);

        try {
            const { title, date, excerpt, rating, genres, content } = fields;

            // Ensure title is a string and not empty
            if (!title || typeof title !== 'string' || title.trim() === '') {
                throw new Error('Invalid or missing title');
            }


            // Generate a slug from the title
            const slug = title.trim().toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

            // Save the cover image
            let coverImageFilename = '';
            if (files.coverImage) {
                const coverImage = files.coverImage;
                const fileExtension = path.extname(coverImage.originalFilename || '');
                coverImageFilename = `${slug}${fileExtension}`;
                const imagePath = path.join(imagesDirectory, coverImageFilename);
                await fs.promises.copyFile(coverImage.filepath, imagePath);
            }

            // Create the markdown content
            const markdown = `---
title: '${title.replace(/'/g, "''")}'
date: '${date}'
excerpt: '${excerpt.replace(/'/g, "''")}'
coverImage: '${coverImageFilename}'
rating: ${rating}
genres: ${JSON.stringify((genres || '').split(',').map(g => g.trim()))}
---
${content}`;

            // Save the markdown file
            const postPath = path.join(postsDirectory, `${slug}.md`);
            await writeFile(postPath, markdown);

            res.status(200).json({ message: 'Post created successfully' });
        } catch (error) {
            console.error('Post creation error:', error);
            res.status(500).json({ message: 'Error creating post: ' + error.message });
        }
    });
}