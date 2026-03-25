import { getWeddingGallery } from '@/lib/db'
import WeddingGallery from './components/WeddingGallery';
import React from 'react'

export default async function page({params}: {params: Promise<{id: number}>}) {
  const { id } = await params;
  const wedding = await getWeddingGallery(id);
  return (
    <div>
        <WeddingGallery wedding={wedding} />
    </div>
  )
}
