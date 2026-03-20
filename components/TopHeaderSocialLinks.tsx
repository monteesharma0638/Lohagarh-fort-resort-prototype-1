import { getLohagarhGroupSocials } from '@/lib/queries'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import React, { useEffect, useState } from 'react'

export default function TopHeaderSocialLinks() {
  const [lgSocialLinks, setSocialLinks] = useState({
    twitter: "",
    instagram: "",
    youtube: ""
  });

  useEffect(() => {
    getLohagarhGroupSocials().then(setSocialLinks);
  }, [])

  return (
    <div className="flex items-center gap-4 ml-auto">
        {/* <a href={lgSocialLinks.facebook} target="_blank" className="hover:text-white/70 transition-colors" aria-label="Facebook">
        <Facebook size={14} />
        </a> */}
        <a href={lgSocialLinks.twitter} target="_blank" className="hover:text-white/70 transition-colors" aria-label="Twitter">
        <Twitter size={14} />
        </a>
        <a href={lgSocialLinks.instagram} target="_blank" className="hover:text-white/70 transition-colors" aria-label="Instagram">
        <Instagram size={14} />
        </a>
        <a href={lgSocialLinks.youtube} target="_blank" className="hover:text-white/70 transition-colors" aria-label="Instagram">
        <Youtube size={14} />
        </a>
    </div>
  )
}
