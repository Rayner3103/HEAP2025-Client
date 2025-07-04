import React from 'react';

export default function About() {
  return (
    <div className="flex flex-col min-h-[80vh] bg-white">
      <div className="flex flex-col justify-start px-16 pt-32">
        <h1 className="text-7xl font-extrabold mb-8">ABOUT US</h1>
      </div>
      {/* Decorative blocks for background effect */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="bg-[#b6c0e3] absolute top-0 left-0 w-full h-32" />
        <div className="bg-[#b6c0e3] absolute top-32 left-1/2 w-1/3 h-48" style={{transform: 'translateX(-50%)'}} />
        <div className="bg-[#b6c0e3] absolute top-80 right-0 w-1/2 h-48" />
        <div className="bg-[#b6c0e3] absolute bottom-0 right-0 w-1/4 h-64" />
        <div className="bg-[#b6c0e3] absolute bottom-0 left-1/4 w-1/3 h-64" />
      </div>
    </div>
  )
}