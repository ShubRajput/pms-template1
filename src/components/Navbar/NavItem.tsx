import React from 'react';

interface NavItemProps {
  title: string;
  href: string;
  isActive?: boolean;
}

const NavItem = ({ title, href, isActive }: NavItemProps) => {
  return (
    <a
      href={href}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-gray-100 text-emerald-600'
          : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
      }`}
    >
      {title}
    </a>
  );
};

export default NavItem;