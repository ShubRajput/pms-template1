import SocialLinks from './SocialLinks';
import { Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Restaurant Info */}
          <div>
            <h2 className="font-bold text-2xl mb-2">RESTAURANT</h2>
            <p className="text-sm text-gray-600 mb-2">FOOD & DRINK</p>
            <p className="text-gray-600 mb-6">
              dolor sit amet consectetur, adipisicing elit. Dignissimos est sapiente fugit enim quisquam! Iste laboriosam aperiam sunt in eligendi?
            </p>
            <SocialLinks />
          </div>

          {/* Open Hours */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Open Hours</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <span>Mon-Tue: 9am - 22pm</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <span>Fri-Sun: 11am - 22pm</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
            <div className="space-y-4">
              <p>256, baker Street,Ahmedabad - Gujarat</p>
              <p>Info@Example.Com</p>
              <p>+91 0000 0000 00</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-gray-600">
            Copyright © 2024 Restaurant Name. All Rights Reserved. Designed By{' '}
            <a href="https://petpooja.com" className="text-emerald-600 hover:underline">
              Petpooja
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;