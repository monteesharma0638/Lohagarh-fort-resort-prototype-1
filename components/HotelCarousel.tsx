import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import HotelCard from './HotelCard';
import { getHotels } from '@/lib/db';

export default async function HotelCarousel() {
  const hotels = await getHotels();
  const featuredHotels = hotels.filter((hotel: any) => hotel.featured);

  return (
    <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {
            featuredHotels.map((hotel: any, index: number) => (
              <CarouselItem key={hotel.name + index} className="pl-2 md:pl-4">
                  <HotelCard {...hotel} />
              </CarouselItem>
            ))
          }
        </CarouselContent>
    </Carousel>
  )
}
