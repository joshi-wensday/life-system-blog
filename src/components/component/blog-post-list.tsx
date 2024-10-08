/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/XilcchGPLeP
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Pagination } from "@/components/ui/pagination"

export function BlogPostList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "The Future of Web Development",
      date: "2023-06-01",
      excerpt: "Explore the latest trends and technologies shaping the future of web development.",
      tags: ["web development", "technology", "trends"],
    },
    {
      id: 2,
      title: "Mastering React Hooks",
      date: "2023-07-15",
      excerpt: "Learn how to leverage the power of React Hooks to build more efficient and maintainable applications.",
      tags: ["react", "javascript", "hooks"],
    },
    {
      id: 3,
      title: "Designing Accessible Interfaces",
      date: "2023-08-01",
      excerpt:
        "Discover best practices and techniques for creating accessible user interfaces that cater to all users.",
      tags: ["accessibility", "design", "user experience"],
    },
    {
      id: 4,
      title: "Serverless Computing: The Future of Cloud",
      date: "2023-09-01",
      excerpt:
        "Explore the benefits and use cases of serverless computing and how it's transforming the cloud landscape.",
      tags: ["serverless", "cloud", "technology"],
    },
    {
      id: 5,
      title: "Optimizing Website Performance",
      date: "2023-10-01",
      excerpt:
        "Learn effective techniques to improve the speed and performance of your website, providing a better user experience.",
      tags: ["performance", "optimization", "web development"],
    },
    {
      id: 6,
      title: "Embracing Sustainable Web Design",
      date: "2023-11-01",
      excerpt: "Discover how to incorporate sustainable practices into your web design and development workflows.",
      tags: ["sustainability", "design", "web development"],
    },
  ])
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (searchTerm && !post.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }
      if (selectedTags.length > 0 && !selectedTags.every((tag) => post.tags.includes(tag))) {
        return false
      }
      return true
    })
  }, [posts, searchTerm, selectedTags])
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }
  const handleTagFilter = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
    setCurrentPage(1)
  }
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  const postsPerPage = 6
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)
  return (
    <div className="px-4 py-6 md:px-6 lg:py-16 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-4">
            {["web development", "react", "accessibility", "serverless", "performance", "sustainability"].map((tag) => (
              <button
                key={tag}
                className={`rounded-full px-3 py-1 text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                onClick={() => handleTagFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="relative flex-1 md:max-w-md">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentPosts.map((post) => (
            <Card key={post.id} className="h-full">
              <CardContent className="flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <p className="mt-2 text-muted-foreground">{post.date}</p>
                  <p className="mt-4">{post.excerpt}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  )
}
