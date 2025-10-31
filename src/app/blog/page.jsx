import Link from 'next/link'
import { promises as fs } from 'fs'
import path from 'path'

export default async function BlogPage() {
  const filePath = path.join(process.cwd(), 'data', 'articles.json')
  const articles = JSON.parse(await fs.readFile(filePath, 'utf-8'))

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Latest AI-Generated Articles</h1>

      {articles.length === 0 ? (
        <p>No articles yet. (Run /api/generate-article to generate some.)</p>
      ) : (
        <div className="grid gap-6">
          {articles.map((a) => (
            <div key={a.slug} className="border p-4 rounded-lg bg-white shadow">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/blog/${a.slug}`} className="text-blue-600 hover:underline">
                  {a.title}
                </Link>
              </h2>
              <p className="text-gray-500 text-sm mb-2">
                {new Date(a.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 line-clamp-3">
                {a.content.slice(0, 200)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
