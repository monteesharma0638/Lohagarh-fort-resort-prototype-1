import MotionDiv from '@/components/MotionDiv';
import Image from 'next/image';

export default function layout({children}: any) {
  return (
    <>
        <div className="relative h-[60vh] flex items-center justify-center">
            <Image
              src="https://res.cloudinary.com/drayl5ppi/image/upload/v1773212406/lohagarh/images/hero/DSC01586_qdlvzv.jpg"
              alt="Background"
              fill
              style={{ objectFit: 'cover' }} // Equivalent to background-size: cover
            />
            <div className="absolute inset-0 bg-black/40 z-10" />
            <div className="relative z-10 text-center text-white px-4">
                <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="block text-sm tracking-[0.3em] uppercase mb-4 text-primary">Get in Touch</span>
                <h1 className="text-5xl md:text-8xl font-serif">Contact Us</h1>
                </MotionDiv>
            </div>
        </div>
        {children}
    </>
  )
}
