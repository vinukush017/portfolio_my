import React from 'react';

interface AnimatedNavItemProps {
  label: string;
  href: string;
  isActive?: boolean;
}

const AnimatedNavItem: React.FC<AnimatedNavItemProps> = ({ label, href, isActive }) => {
  return (
    <a
      href={href}
      className={`relative px-4 py-2 font-semibold transition duration-300 group ${
        isActive ? 'bg-gray-200 rounded-full shadow' : ''
      }`}
    >
      {/* Background Circle */}
      <span className="absolute inset-0 rounded-full group-hover:bg-gray-200 transition-all duration-300"></span>

      {/* Animated Text */}
      <span className="relative z-10 flex flex-col items-center leading-none">
        {/* Top parens */}
        <span className="text-red-500 text-sm transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          (
        </span>

        {/* Label */}
        <span className="text-black transform translate-y-[10px] group-hover:translate-y-0 transition-all duration-300">
          {label}
        </span>

        {/* Bottom parens */}
        <span className="text-red-500 text-sm transform translate-y-[10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          )
        </span>
      </span>
    </a>
  );
};

export default AnimatedNavItem;
