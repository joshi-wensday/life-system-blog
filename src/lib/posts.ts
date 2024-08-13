// src/lib/posts.ts

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { Tag, TaggableItem } from './tags'
import { LifeSystemVersion, parseVersion } from './lifeSystem'

interface BlogPostMetadata {
  title: string;
  date: string;
  lifeSystemVersion: string;
  tags: string[];
}

export interface BlogPost extends TaggableItem {
  title: string;
  date: string;
  lifeSystemVersion: LifeSystemVersion;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string): BlogPost {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const metadata = data as BlogPostMetadata

  const tags: Tag[] = metadata.tags.map(tag => {
    const [key, value] = tag.split(':')
    return { key, value: value || tag }
  })

  return {
    id: realSlug,
    title: metadata.title,
    date: metadata.date,
    lifeSystemVersion: parseVersion(metadata.lifeSystemVersion),
    content: content,
    tags: tags,
  }
}

export async function getPostContent(slug: string): Promise<string> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { content } = matter(fileContents)
  const processedContent = await remark().use(html).process(content)
  return processedContent.toString()
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}