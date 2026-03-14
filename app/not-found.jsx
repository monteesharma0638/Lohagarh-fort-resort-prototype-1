import React from 'react'
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./(public)/globals.css";

export default function page() {
  return (
    <div className='min-h-[100vh] bg-secondary'>
        <NavBar noTopHeader />
        <div className='h-screen flex justify-center items-center text-white text-7xl'>
            <p>Page Not Found</p>
        </div>
    </div>
  )
}
