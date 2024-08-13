import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getPosts() {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        slug,
        ...data,
      }
    })
    
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error('Error in getPosts:', error)
    return []
  }
}

export async function getPostBySlug(slug, fields = []) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
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
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const posts = await Promise.all(fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      return getPostBySlug(slug, fields)
    }))
    return posts.filter(Boolean).sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  } catch (error) {
    console.error('Error in getAllPosts:', error)
    return []
  }
}