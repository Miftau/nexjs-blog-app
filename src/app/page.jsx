
import Link from 'next/link';

// Sample data function
async function getArticles() {
  // Simulate an API call
  return [
    {
      id: 1,
      title: "The Future of Web Development in 2025",
      excerpt: "Explore the emerging trends and technologies that will shape the future of web development over the next few years.",
      category: "Technology",
      date: "Oct 28, 2025",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
      author: {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      }
    },
    {
      id: 2,
      title: "Mindfulness Practices for Daily Life",
      excerpt: "Learn simple mindfulness techniques that can be integrated into your daily routine to reduce stress and improve focus.",
      category: "Lifestyle",
      date: "Oct 25, 2025",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      author: {
        name: "Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      }
    },
    {
      id: 3,
      title: "Building Sustainable Startups",
      excerpt: "Key strategies for creating environmentally and socially responsible businesses that thrive in today's market.",
      category: "Business",
      date: "Oct 22, 2025",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      author: {
        name: "Emma Rodriguez",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg"
      }
    }
  ];
}

export default async function Home() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-700 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Discover the Latest in Personal Growth & Development</h1>
          <p className="text-xl max-w-2xl mx-auto mb-10 opacity-90">
            Join our community of over 50,000 readers who are transforming their lives with actionable insights and inspiring stories.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/blog" className="bg-cyan-500 hover:bg-cyan-400 text-white font-medium py-3 px-8 rounded-full transition duration-300 transform hover:-translate-y-1 shadow-lg">
              Explore Articles
            </Link>
            <Link href="/subscribe" className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-700 font-medium py-3 px-8 rounded-full transition duration-300 transform hover:-translate-y-1">
              Join Community
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 relative inline-block pb-3">
              Featured Articles
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-cyan-500 rounded-full"></span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article 
                key={article.id} 
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
              >
                <div className="h-56 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full mb-3">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-gray-800 mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img 
                        src={article.author.avatar} 
                        alt={article.author.name} 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{article.author.name}</p>
                        <p className="text-xs text-gray-500">{article.date}</p>
                      </div>
                    </div>
                    <Link href={`/article/${article.id}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                      Read more
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 relative inline-block pb-3">
              Popular Categories
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-cyan-500 rounded-full"></span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Technology', icon: 'laptop-code', color: 'indigo' },
              { name: 'Education', icon: 'book-open', color: 'purple' },
              { name: 'Health', icon: 'heartbeat', color: 'pink' },
              { name: 'Business', icon: 'chart-line', color: 'blue' },
              { name: 'Lifestyle', icon: 'leaf', color: 'green' },
              { name: 'Travel', icon: 'globe', color: 'yellow' }
            ].map((category, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer border-t-4 border-${category.color}-500`}
              >
                <div className={`w-16 h-16 rounded-full bg-${category.color}-100 flex items-center justify-center mb-6 mx-auto`}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-8 w-8 text-${category.color}-600`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d={category.icon === 'laptop-code' ? "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" : 
                         category.icon === 'book-open' ? "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" :
                         category.icon === 'heartbeat' ? "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" :
                         category.icon === 'chart-line' ? "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" :
                         category.icon === 'leaf' ? "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" :
                         "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Stay Updated with Our Latest Posts</h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter and never miss an update from our blog. Get exclusive content and insights delivered directly to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              required
              className="flex-grow px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button 
              type="submit" 
              className="bg-cyan-500 hover:bg-cyan-400 text-white font-medium py-3 px-8 rounded-full transition duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}