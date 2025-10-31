// components/HeroSlider.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToSlide = (index) => {
    setActiveIndex(index);
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide((activeIndex + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToSlide((activeIndex + 1) % 3); // Swipe left → next
      } else {
        goToSlide((activeIndex + 2) % 3); // Swipe right → prev
      }
    }
  };

  const slides = [
    {
      title: "Discover the Latest in Personal Growth & Development",
      description:
        "Join our community of over 50,000 readers who are transforming their lives with actionable insights and inspiring stories.",
      bgImage:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      primaryLink: "/blog",
      secondaryLink: "/subscribe",
      primaryText: "Explore Articles",
      secondaryText: "Join Community",
    },
    {
      title: "Master Your Mindset & Achieve Breakthroughs",
      description:
        "Learn evidence-based strategies from top psychologists and thought leaders to overcome obstacles and unlock your potential.",
      bgImage:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      primaryLink: "/mindset",
      secondaryLink: "/workshops",
      primaryText: "Explore Mindset Tools",
      secondaryText: "Attend Workshops",
    },
    {
      title: "Build Habits That Transform Your Life",
      description:
        "Discover science-backed frameworks to create lasting positive change and achieve your most ambitious goals.",
      bgImage:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      primaryLink: "/habits",
      secondaryLink: "/success-stories",
      primaryText: "Habit Builder Toolkit",
      secondaryText: "Read Success Stories",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="hero-slider-container overflow-hidden rounded-xl shadow-2xl">
          <div
            ref={sliderRef}
            className="hero-slider-inner flex transition-transform duration-500 ease-in-out"
            style={{ width: "300%" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="relative w-full flex-shrink-0"
                style={{
                  backgroundImage: `url(${slide.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Content */}
                <div className="relative flex h-full items-center justify-center p-6 md:p-10">
                  <div className="text-center text-white">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                      {slide.title}
                    </h1>
                    <p className="mx-auto mb-10 max-w-2xl text-lg md:text-xl opacity-90">
                      {slide.description}
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                      <Link
                        href={slide.primaryLink}
                        className="rounded-full bg-cyan-500 px-8 py-3 font-medium text-white transition duration-300 hover:bg-cyan-400 hover:-translate-y-1 shadow-lg"
                      >
                        {slide.primaryText}
                      </Link>
                      <Link
                        href={slide.secondaryLink}
                        className="rounded-full border-2 border-white px-8 py-3 font-medium text-white transition duration-300 hover:bg-white hover:text-indigo-700 hover:-translate-y-1"
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

        {/* Indicators */}
        <div className="mt-6 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-3 w-3 rounded-full transition-colors ${
                i === activeIndex ? "bg-cyan-500" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Responsive Height */}
      <style jsx>{`
        .hero-slider-container {
          height: clamp(400px, 70vh, 600px);
        }
        @media (min-width: 768px) {
          .hero-slider-container {
            height: clamp(500px, 80vh, 800px);
          }
        }
        .hero-slider-inner > div {
          height: 100%;
        }
      `}</style>
    </section>
  );
}