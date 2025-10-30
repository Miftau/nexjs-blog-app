import { promises as fs } from 'fs'
import path from 'path'

export default async function BlogPost({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'articles.json')
  const articles = JSON.parse(await fs.readFile(filePath, 'utf-8'))
  const article = articles.find((a) => a.slug === params.slug)

  if (!article) return <div className="p-6">❌ Article not found.</div>

  return (
    <article className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 mb-6">{new Date(article.createdAt).toLocaleString()}</p>
      <div className="prose whitespace-pre-line">{article.content}</div>
    </article>
  )
}
