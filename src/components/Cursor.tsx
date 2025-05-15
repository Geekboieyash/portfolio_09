import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  
  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };
    
    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const onMouseEnter = () => {
      setHidden(false);
    };
    
    const onMouseLeave = () => {
      setHidden(true);
    };
    
    const onMouseDown = () => {
      setClicked(true);
    };
    
    const onMouseUp = () => {
      setClicked(false);
    };
    
    // Add hover effect to all links and buttons
    const handleLinkHoverEvents = () => {
      const links = document.querySelectorAll('a, button');
      
      links.forEach((link) => {
        link.addEventListener('mouseenter', () => setLinkHovered(true));
        link.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };
    
    addEventListeners();
    handleLinkHoverEvents();
    
    return () => {
      removeEventListeners();
    };
  }, []);
  
  // Check if device has touch screen
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setHidden(true);
    }
  }, []);
  
  if (hidden) return null;
  
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 bg-indigo-600 dark:bg-indigo-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 10,
          y: position.y - 10,
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.2,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-36 h-36 border border-indigo-600 dark:border-indigo-400 rounded-full pointer-events-none z-40 mix-blend-difference"
        animate={{
          x: position.x - 72,
          y: position.y - 72,
          opacity: linkHovered ? 0.5 : 0.15,
          scale: clicked ? 0.6 : linkHovered ? 1.2 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 20,
          mass: 0.25,
          delay: 0.01,
        }}
      />
    </>
  );
};

export default Cursor;