import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 font-bold text-xl tracking-tighter">
            <a href="#home" className="flex items-center space-x-1">
              <span className="text-indigo-600 dark:text-indigo-400">Portfolio</span>
            </a>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out"
              >
                {item.name}
              </a>
            ))}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition duration-150 ease-in-out"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-yellow-300" />
              ) : (
                <Moon size={20} className="text-gray-600" />
              )}
            </button>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition duration-150 ease-in-out"
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-yellow-300" />
              ) : (
                <Moon size={20} className="text-gray-600" />
              )}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition duration-150 ease-in-out"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;