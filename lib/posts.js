import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = process.cwd() + '/posts'

export async function getPosts() {
  if (typeof window !== 'undefined') {
    return [] // Return empty array on client-side
  }

  const fs = await import('fs').then(module => module.default)
  const path = await import('path').then(module => module.default)
  
  try {
    const fileNames = await fs.promises.readdir(postsDirectory)
    const allPostsData = await Promise.all(fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = await fs.promises.readFile(fullPath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        slug,
        ...data,
      }
    }))
    
    return allPostsData.sort((a, b) => (new Date(b.date) - new Date(a.date)))
  } catch (error) {
    console.error('Error in getPosts:', error)
    return []
  }
}

export async function getPostBySlug(slug, fields = []) {
  if (typeof window !== 'undefined') {
    return null // Return null on client-side
  }

  const fs = await import('fs').then(module => module.default)
  const path = await import('path').then(module => module.default)

  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = await fs.promises.readFile(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const items = {}

    // Ensure the content is processed
    const processedContent = await remark()
      .use(html)
      .process(content)
    const contentHtml = processedContent.toString()

    fields.forEach((field) => {
      if (field === 'slug') {
        items[field] = slug
      }
      if (field === 'content') {
        items[field] = contentHtml
      }
      if (data[field]) {
        items[field] = data[field]
      }
    })

    return items
  } catch (error) {
    console.error(`Error in getPostBySlug for slug ${slug}:`, error)
    return null
  }
}

export async function getAllPosts(fields = []) {
  if (typeof window !== 'undefined') {
    return [] // Return empty array on client-side
  }

  const fs = await import('fs').then(module => module.default)
  
  try {
    const fileNames = await fs.promises.readdir(postsDirectory)
    const posts = await Promise.all(fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      return getPostBySlug(slug, fields)
    }))
    return posts.filter(Boolean).sort((post1, post2) => (new Date(post2.date) - new Date(post1.date)))
  } catch (error) {
    console.error('Error in getAllPosts:', error)
    return []
  }
}