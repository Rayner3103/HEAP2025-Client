import React from "react";

const teamMembers = [
  {
    name: "Brian Leong Jie Ren",
    role: "Technical Lead",
    photo: "https://i.pravatar.cc/150?img=12",
    url: "http://www.example.com"
  },
  {
    name: "Joel Soh Zhipeng",
    role: "Development & Research",
    photo: "https://i.pravatar.cc/150?img=15",
    url: "http://www.example.com"
  },
  {
    name: "Rayner Sim Zhi Heng",
    role: "Systems & Security",
    photo: "https://i.pravatar.cc/150?img=20",
    url: "http://www.linkedin.com/in/raynersimzhiheng"
  },
  {
    name: "Geri Neo Zili",
    role: "Technical Development",
    photo: "https://i.pravatar.cc/150?img=30",
    url: "http://www.example.com"
  },
  {
    name: "Leong Yan Lyn",
    role: "Strategy & User Experience",
    photo: "https://i.pravatar.cc/150?img=40",
    url: "http://www.example.com"
  },
];

export default function About() {
  return (
    <div className="min-h-[80vh] py-16 px-6 md:px-12 flex flex-col">
      {/* Content wrapper limits max width */}
      <div className="max-w-5xl mx-auto w-full">
        {/* Gradient Title */}
        <h1 className="text-6xl md:text-7xl font-extrabold mb-10 bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text">
          ABOUT US
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed text-lg text-justify">
          <p>
            Hi there! We're the Acadiverse team - a group of passionate
            university students who understand the struggle of finding
            meaningful academic opportunities firsthand.
          </p>
          <p>
            As students ourselves, we've experienced the frustration of being
            overwhelmed by scattered information across platforms like
            Instagram, Telegram, and email. We know how valuable academic
            opportunities like hackathons, workshops, and networking events can
            be hidden in this digital clutter. Without a centralized source, too
            many of our peers miss out simply because they're uncertain about
            where to search or accidentally miss crucial deadlines.
          </p>
          <p>
            That's why we created Acadiverse - to simplify and centralize access
            to academic events that matter. We wanted to build a user-friendly
            platform that empowers fellow students to take charge of their
            personal and academic growth by making opportunities easier to find
            and act on.
          </p>
          <p>
            Our mission is simple: to ensure that no student misses out on
            life-changing opportunities because of poor information
            accessibility. We believe every motivated learner deserves a clear
            path to growth, and we're here to provide exactly that.
          </p>
        </div>

        <h2 className="text-5xl md:text-6xl font-extrabold my-12 bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text">
          Meet the Team:
        </h2>

        {/* Team album */}
        {/* Team album */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center">
              <a
                href={member.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 shadow-lg transition-transform hover:scale-105"
                />
                <p className="text-center text-2xl font-semibold text-gray-800 hover:underline">
                  {member.name}
                </p>
                <p className="text-center text-xl text-gray-500">
                  {member.role}
                </p>
              </a>
            </div>
          ))}
        </div>

        <p className="mt-10 text-gray-700 leading-relaxed text-xl">
          Together, we're building more than just a platform - we're creating a
          community where academic growth and opportunity discovery go hand in
          hand.
        </p>
      </div>
    </div>
  );
}
