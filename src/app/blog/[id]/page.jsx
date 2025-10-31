// src/app/article/[id]/page.jsx
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Simulate fetching a single article by ID from the API
async function getArticle(id) {
  // In a real app, this would be your API endpoint
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  });

  if (!res.ok) {
    // If the API returns an error (e.g., 404), return null
    if (res.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch article');
  }

  const post = await res.json();
  
  // Transform the API data to match our expected structure
  return {
    id: post.id,
    title: post.title,
    content: `<p>${post.body}</p>`, // Wrap the body text in a paragraph
    excerpt: post.body.substring(0, 100) + '...',
    category: ['Technology', 'Lifestyle', 'Business', 'Health', 'Education'][id % 5],
    date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    image: `https://picsum.photos/seed/${post.id}/1200/600`,
    author: {
      name: `Author ${post.id}`,
      bio: `This is the bio for Author ${post.id}. They are a contributor to PROGRESS BLOG.`,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(`Author ${post.id}`)}&background=6366f1&color=fff`,
    },
    tags: ['Web Development', 'AI', 'JavaScript', 'Future Trends'].slice(0, id % 4 + 1) // Vary tags based on ID
  };
}

export async function generateMetadata({ params }) {
  const article = await getArticle(params.id);
  
  if (!article) {
    return {
      title: 'Article Not Found - PROGRESS BLOG',
    };
  }

  return {
    title: `${article.title} - PROGRESS BLOG`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.id);

  if (!article) {
    notFound(); // This triggers the 404 page
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="inline-block bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full mb-4">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">{article.title}</h1>
            <div className="flex items-center text-gray-600">
              <img 
                src={article.author.avatar} 
                alt={article.author.name} 
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium">{article.author.name}</p>
                <p className="text-sm">{article.date}</p>
              </div>
            </div>
          </div>
          
          {/* Article Image */}
          <div className="relative h-96 w-full rounded-xl overflow-hidden mb-6">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <article 
          className="prose prose-lg prose-indigo max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />

        {/* Author Bio Section */}
        <section className="mt-12 p-6 bg-white rounded-xl shadow-md">
          <div className="flex items-start">
            <img 
              src={article.author.avatar} 
              alt={article.author.name} 
              className="w-15 h-15 rounded-full mr-4"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-800">About the Author</h3>
              <p className="text-gray-600 mt-2">{article.author.bio}</p>
            </div>
          </div>
        </section>

        {/* Related Articles Placeholder */}
        <section className="mt-12">
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* In a real app, you would fetch and map related articles here */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-medium text-gray-800">Related Article 1</h3>
              <p className="text-sm text-gray-600 mt-1">Brief description of the related article...</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-medium text-gray-800">Related Article 2</h3>
              <p className="text-sm text-gray-600 mt-1">Brief description of the related article...</p>
            </div>
          </div>
        </section>

        {/* Back to Articles Link */}
        <div className="mt-8 text-center">
          <Link href="/" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full transition duration-300">
            Back to Articles
          </Link>
        </div>
      </div>
    </div>
  );
}