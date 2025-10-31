// components/HeroSlider.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    setActiveIndex(index);
    const slider = document.querySelector('.hero-slider-inner');
    if (slider) {
      slider.style.transform = `translateX(-${index * 100}%)`;
    }
  };

  // Optional: Auto-advance (comment out if not needed)
     useEffect(() => {
     const interval = setInterval(() => {
       goToSlide((activeIndex + 1) % 3);
     }, 5000);
     return () => clearInterval(interval);
   }, [activeIndex]);

  const slides = [
    {
      title: "Discover the Latest in Personal Growth & Development",
      description: "Join our community of over 50,000 readers who are transforming their lives with actionable insights and inspiring stories.",
      bgImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      primaryLink: "/blog",
      secondaryLink: "/subscribe",
      primaryText: "Explore Articles",
      secondaryText: "Join Community"
    },
    {
      title: "Master Your Mindset & Achieve Breakthroughs",
      description: "Learn evidence-based strategies from top psychologists and thought leaders to overcome obstacles and unlock your potential.",
      bgImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      primaryLink: "/mindset",
      secondaryLink: "/workshops",
      primaryText: "Explore Mindset Tools",
      secondaryText: "Attend Workshops"
    },
    {
      title: "Build Habits That Transform Your Life",
      description: "Discover science-backed frameworks to create lasting positive change and achieve your most ambitious goals.",
      bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      primaryLink: "/habits",
      secondaryLink: "/success-stories",
      primaryText: "Habit Builder Toolkit",
      secondaryText: "Read Success Stories"
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="hero-slider-container overflow-hidden rounded-xl shadow-2xl">
          <div 
            className="hero-slider-inner flex transition-transform duration-500 ease-in-out" 
            style={{ width: '300%' }}
          >
            {slides.map((slide, index) => (
              <div 
                key={index}
                className="w-full flex-shrink-0"
                style={{
                  backgroundImage: `url(${slide.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="bg-black bg-opacity-50 h-full w-full flex items-center justify-center">
                  <div className="text-center text-white p-6 md:p-10">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">{slide.title}</h1>
                    <p className="text-xl max-w-2xl mx-auto mb-10 opacity-90">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Link 
                        href={slide.primaryLink} 
                        className="bg-cyan-500 hover:bg-cyan-400 text-white font-medium py-3 px-8 rounded-full transition duration-300 transform hover:-translate-y-1 shadow-lg"
                      >
                        {slide.primaryText}
                      </Link>
                      <Link 
                        href={slide.secondaryLink} 
                        className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-700 font-medium py-3 px-8 rounded-full transition duration-300 transform hover:-translate-y-1"
                      >
                        {slide.secondaryText}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeIndex ? 'bg-cyan-500' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}