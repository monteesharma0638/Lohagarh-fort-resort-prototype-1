import { getHotels } from '@/lib/db'
import React from 'react'
import Hotels from './components/Hotels';

export default async function page() {
  const hotels = await getHotels();
  
  return (
    <Hotels hotels={hotels} />
  )
}
