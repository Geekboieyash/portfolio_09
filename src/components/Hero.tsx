import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useInView } from 'react-intersection-observer';
import SoftGlobe from './Globe'; // Updated: this is your custom globe component
import '../styles/Hero.css';

const Hero: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="home" className="hero-section">
      <div ref={ref} className="hero-content">
        <div className="hero-text-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="hero-subtitle">Hey, I'm</h2>
            <h1 className="hero-title">
              <span>Yash Mishra</span>
              <span className="highlight">Full Stack Developer</span>
            </h1>
            <p className="hero-description">
              I design and develop fast, accessible, and beautiful web applications with a focus on user experience and performance.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="btn-primary">View My Work</a>
              <a href="#contact" className="btn-secondary">Contact Me</a>
            </div>
          </motion.div>
        </div>

        <div className="hero-3d-box-wrapper">
          <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 3, 5]} intensity={0.7} />
          <pointLight position={[-200, -5, -5]} intensity={0.2} color="#6b8cce" />
            <SoftGlobe />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
      </div>

      <div className="scroll-indicator">
        <a href="#projects" aria-label="Scroll down">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
