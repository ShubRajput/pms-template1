import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const SocialLinks = () => {
  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Youtube className="w-5 h-5" />, href: '#', label: 'Youtube' }
  ];

  return (
    <div className="flex space-x-4">
      {socialLinks.map(({ icon, href, label }) => (
        <a
          key={label}
          href={href}
          className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-shadow"
          aria-label={label}
        >
          {icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;