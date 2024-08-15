import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

export default function Gallery({ images }) {
  return (
    <>
      <Head>
        <title>Gallery | Something About Music</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-red-600">Gallery</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-w-1 aspect-h-1">
              <Image
                src={`/images/gallery/${image}`}
                alt={`Gallery image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                quality={100}
                priority={index < 4}  // Prioritize the first few images
                className="rounded-lg"
             />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const galleryDir = path.join(process.cwd(), 'public/images/gallery');
  const images = fs.readdirSync(galleryDir);

  return {
    props: {
      images,
    },
  };
}