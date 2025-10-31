'use client';

import { useState, useEffect } from 'react';

export default function SliderIndicators({ totalSlides = 3, onSlideChange }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
    if (onSlideChange) onSlideChange(index);
  };

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          className={`w-3 h-3 rounded-full transition-colors ${
            index === activeIndex ? 'bg-cyan-500' : 'bg-white bg-opacity-50'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}