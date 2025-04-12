'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CustomCarouselProps {
  children: React.ReactNode[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  children,
  autoSlide = true,
  autoSlideInterval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const itemsCount = React.Children.count(children);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % itemsCount);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + itemsCount) % itemsCount);
  };

  useEffect(() => {
    if (autoSlide) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % itemsCount);
      }, autoSlideInterval);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoSlide, autoSlideInterval, itemsCount]);

  // Function to reset the autoSlide timer
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (autoSlide) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % itemsCount);
      }, autoSlideInterval);
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-md shadow-md">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button variant="ghost" size="icon" onClick={prevSlide} className="rounded-full">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Previous</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={nextSlide} className="rounded-full">
          <ArrowRight className="h-5 w-5" />
          <span className="sr-only">Next</span>
        </Button>
      </div>

      <div className="absolute bottom-4 left-0 w-full flex items-center justify-center space-x-2">
        {Array.from({ length: itemsCount }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-colors duration-200",
              currentIndex === index ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"
            )}
            onClick={() => { setCurrentIndex(index); resetTimer(); }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomCarousel;
