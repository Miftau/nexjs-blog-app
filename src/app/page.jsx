'use client';
import Head from 'next/head';
import { useState } from 'react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      alert('Thank you for subscribing to PROGRESS BLOG!');
      setEmail('');
    } else {
      alert('Please enter a valid email address.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>PROGRESS BLOG - Modern Blogging Platform</title>
        <meta name="description" content="Discover the latest in personal growth & development" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-cyan-400 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h1 className="text-2xl font-serif font-bold">PROGRESS <span className="text-cyan-300">BLOG</span></h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-cyan-300 transition duration-300">Home</Link>
            <Link href="/articles" className="hover:text-cyan-300 transition duration-300">Articles</Link>
            <Link href="/categories" className="hover:text-cyan-300 transition duration-300">Categories</Link>
            <Link href="/authors" className="hover:text-cyan-300 transition duration-300">Authors</Link>
            <Link href="/contact" className="hover:text-cyan-300 transition duration-300">Contact</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex bg-indigo-500 bg-opacity-30 rounded-full px-4 py-2 items-center">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-white placeholder-indigo-200 w-full"
              />
              <button className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-indigo-700 px-4 py-2">
            <div className="flex bg-indigo-600 bg-opacity-30 rounded-full px-4 py-2 mb-4">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-white placeholder-indigo-200 w-full"
              />
              <button className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col space-y-3 py-2">
              <Link href="/" className="hover:text-cyan-300 transition duration-300 py-2">Home</Link>
              <Link href="/articles" className="hover:text-cyan-300 transition duration-300 py-2">Articles</Link>
              <Link href="/categories" className="hover:text-cyan-300 transition duration-300 py-2">Categories</Link>
              <Link href="/authors" className="hover:text-cyan-300 transition duration-300 py-2">Authors</Link>
              <Link href="/contact" className="hover:text-cyan-300 transition duration-300 py-2">Contact</Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-700 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Discover the Latest in Personal Growth & Development</h1>
          <p className="text-xl max-w-2xl mx-auto mb-10 opacity-90">
            Join our community of over 50,000 readers who are transforming their lives with actionable insights and inspiring stories.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/articles" className="bg-cyan-500 hover:bg-cyan-400 text-white font-medium py-3 px-8 rounded-full transition duration-300 transform hover:-translate-y-1 shadow-lg">
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
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">PROGRESS <span className="text-cyan-400">BLOG</span></h3>
              <p className="mb-6">
                Sharing knowledge and insights to help you grow personally and professionally. Join our community of lifelong learners.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin', 'pinterest'].map((platform) => (
                  <a 
                    key={platform} 
                    href="#" 
                    className="bg-gray-800 hover:bg-cyan-600 h-10 w-10 rounded-full flex items-center justify-center transition duration-300"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'About Us', 'Articles', 'Categories', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-cyan-400 transition duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4">Popular Topics</h4>
              <ul className="space-y-2">
                {['Personal Development', 'Career Growth', 'Technology Trends', 'Health & Wellness', 'Financial Planning'].map((topic) => (
                  <li key={topic}>
                    <Link href="#" className="hover:text-cyan-400 transition duration-300">
                      {topic}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Progress Street, New York, NY</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@progressblog.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center">
            <p>&copy; {new Date().getFullYear()} PROGRESS BLOG. All rights reserved. Designed with ❤️ for personal growth.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}