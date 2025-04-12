"use client"

import * as React from "react"
import {
  Carousel as CarouselPrimitive,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "vaul-carousel"

import { cn } from "@/lib/utils"

const Carousel = React.forwardRef<
  React.ElementRef<typeof CarouselPrimitive>,
  React.ComponentPropsWithoutRef<typeof CarouselPrimitive>
>(({ className, ...props }, ref) => (
  <div className="relative">
    <CarouselPrimitive
      ref={ref}
      className={cn("w-full overflow-hidden py-2", className)}
      {...props}
    />
  </div>
))
Carousel.displayName = CarouselPrimitive.displayName

export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious }

