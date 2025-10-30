import { promises as fs } from 'fs'
import path from 'path'

export async function POST(req) {
  try {
    const topics = [
      'Artificial Intelligence in Healthcare',
      'Blockchain and Data Security',
      'Cloud Computing for Startups',
      'The Future of Web Development',
      'Cybersecurity Best Practices 2025',
      'DevOps Trends and Tools',
      'The Rise of Edge Computing',
      'The Impact of 5G on IoT',
    ]

    const articles = []

    for (const topic of topics) {
      const apiUrl = `https://www.artikelschreiber.com/api/articleapi.php?q=${encodeURIComponent(
        topic
      )}&lang=en&length=medium`

      const res = await fetch(apiUrl)
      const text = await res.text()

      const slug = topic
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      articles.push({
        slug,
        title: topic,
        content: text,
        createdAt: new Date().toISOString(),
      })
    }

    // Save all new articles
    const filePath = path.join(process.cwd(), 'data', 'articles.json')
    await fs.writeFile(filePath, JSON.stringify(articles, null, 2))

    return new Response(JSON.stringify({ success: true, count: articles.length }), { status: 200 })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to generate articles', details: error.message }),
      { status: 500 }
    )
  }
}
