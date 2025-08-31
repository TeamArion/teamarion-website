import React from "react"

import { CardCarousel } from "./ui/card-carousel"

const CardCaroursalDemo = () => {
  const images = [
    { src: "https://picsum.photos/600/400?random=1", alt: "Stock Image 1" },
    { src: "https://picsum.photos/600/400?random=2", alt: "Stock Image 2" },
    { src: "https://picsum.photos/600/400?random=3", alt: "Stock Image 3" },
    { src: "https://picsum.photos/600/400?random=4", alt: "Stock Image 4" },
    { src: "https://picsum.photos/600/400?random=5", alt: "Stock Image 5" },
  ]

  return (
    <div className="w-full">
        <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">Members of Team Arion.</h2>
      <CardCarousel
        images={images}
        autoplayDelay={2000}
        showPagination={true}
        showNavigation={true}
      />
    </div>
  )
}

export default CardCaroursalDemo
