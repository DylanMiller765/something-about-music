import { writeFile } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

const SECURE_TOKEN = process.env.NEXT_PUBLIC_SECURE_POST_TOKEN;
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

    const form = formidable();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Form parsing error:', err);
            return res.status(500).json({ message: 'Error parsing form data' });
        }

        try {
            console.log('Received fields:', fields);
            console.log('Received files:', files);

            // Extract the first element from each field array
            const title = fields.title[0];
            const releaseDate = fields.releaseDate[0];
            const label = fields.label[0];
            const date = fields.date[0];
            const excerpt = fields.excerpt[0];
            const rating = fields.rating[0];
            const genres = fields.genres[0];
            const content = fields.content[0];
            const spotifyUri = fields.spotifyUri[0];

            if (!title || typeof title !== 'string') {
                throw new Error('Invalid or missing title');
            }

            // Generate a slug from the title
            const slug = title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

            // Save the cover image
            let coverImageFilename = '';
            if (files.coverImage) {
                const coverImage = files.coverImage[0];
                const fileExtension = path.extname(coverImage.originalFilename || '');
                coverImageFilename = `${slug}${fileExtension}`;
                const imagePath = path.join(imagesDirectory, coverImageFilename);
                await fs.promises.copyFile(coverImage.filepath, imagePath);
            }

            // Create the markdown content
            const markdown = `---
title: '${title}'
releaseDate: '${releaseDate}'
label: '${label}'
date: '${date}'
excerpt: '${excerpt}'
coverImage: '${coverImageFilename}'
rating: ${rating}
genres: ${JSON.stringify(genres.split(',').map(g => g.trim()))}
spotifyUri: '${spotifyUri}'
---

${content.replace(/'/g, "''").trim()}
`;

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