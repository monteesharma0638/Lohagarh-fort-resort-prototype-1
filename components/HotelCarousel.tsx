import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import HotelCard from './HotelCard';
import hotels from '../app/hotels/hotels.json';

export default function HotelCarousel() {
  const featuredHotels = hotels.filter(hotel => hotel.featured);

  return (
    <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {
            featuredHotels.map((hotel, index) => (
              <CarouselItem key={hotel.name + index} className="pl-2 md:pl-4">
                  <HotelCard {...hotel} />
              </CarouselItem>
            ))
          }
        </CarouselContent>
    </Carousel>
  )
}
