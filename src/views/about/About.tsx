import React from 'react';

export default function About() {
  return (
    <div className="flex flex-col min-h-[80vh] bg-white">
      <div className="flex flex-col justify-start px-16 pt-10">
        <h1 className="text-7xl font-extrabold mb-8">ABOUT US</h1>
        <p>Hi there! We're the Acadiverse team - a group of passionate university students who understand the struggle of finding meaningful academic opportunities firsthand. </p>
        <p>As students ourselves, we've experienced the frustration of being overwhelmed by scattered information across platforms like Instagram, Telegram, and email. We know how valuable academic opportunities like hackathons, workshops, and networking events can be hidden in this digital clutter. Without a centralized source, too many of our peers miss out simply because they're uncertain about where to search or accidentally miss crucial deadlines.</p>
        <p>That's why we created Acadiverse - to simplify and centralize access to academic events that matter. We wanted to build a user-friendly platform that empowers fellow students to take charge of their personal and academic growth by making opportunities easier to find and act on.</p>
        <p>Our mission is simple: to ensure that no student misses out on life-changing opportunities because of poor information accessibility. We believe every motivated learner deserves a clear path to growth, and we're here to provide exactly that.</p>
        <h1 className="text-6xl font-extrabold my-8">Meet the Team:</h1>
        <div>
          <p>Brian Leong Jie Ren - Technical Lead</p>
          <p>Joel Soh Zhipeng - Development & Research</p>
          <p>Rayner Sim Zhi Heng - Systems & Security</p>
          <p>Geri Neo Zili - Technical Development</p>
          <p>Leong Yan Lyn - Strategy & User Experience</p>
        </div>
        <p className='mt-6'>Together, we're building more than just a platform - we're creating a community where academic growth and opportunity discovery go hand in hand.</p>
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