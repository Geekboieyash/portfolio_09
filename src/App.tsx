import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import { ThemeProvider } from './context/ThemeContext';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      {isLoading ? (
        <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-gray-900">
          <div className="animate-pulse text-4xl font-bold text-gray-800 dark:text-white">Portfolio</div>
        </div>
      ) : (
        <div className="relative overflow-hidden bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen transition-colors duration-300">
          <Cursor />
          <Navbar />
          <main>
            <Hero />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;