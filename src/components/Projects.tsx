import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';

const projectsData = [
  {
    id: 1,
    title: 'LinkedIn Agent',
    description: 'Automates LinkedIn interactions and post generation using FastAPI and OpenAI.',
    image: 'https://github.com/user-attachments/assets/3342867f-b26f-46ef-b222-8bce638a57d4',
    tags: ['FastAPI', 'React', 'OpenAI', 'Django'],
    demoUrl: 'https://github.com/Geekboieyash/LinkedIn-Agent',
    repoUrl: 'https://github.com/Geekboieyash/LinkedIn-Agent',
    category: 'ai',
  },
  {
    id: 2,
    title: 'Arteriovenous HandFistulaDetectionDevice',
    description: ' Built abiomedical device achieving accuracyindetecting Arteriovenous Fistulas in the forearm region',
    image: 'https://github.com/user-attachments/assets/a97065e3-a82b-4f80-bc35-f9fb38ed718a',
    tags: ['Python', 'ML'],
    demoUrl: 'https://docs.google.com/document/d/1gNpRi8YSeAvmxK-jZcQwbSrtK97VHvOJQR1iGq5dTh8/edit?tab=t.0',
    repoUrl: 'https://github.com/Geekboieyash/GUI--fistula-detection',
    category: 'ai',
  },
  {
    id: 3,
    title: 'Brain Tumor Detection|',
    description: 'Brain tumor detection model using a convolutional neural network in Tensorflow & Keras.',
    image: 'https://raw.githubusercontent.com/Geekboieyash/Brain-Tumor-Detection/main/convnet_architecture.jpg',
    tags: ['Convolutional Neural Networks (CNNs)', 'TenserFlow',],
    demoUrl: 'https://github.com/Geekboieyash/Brain-Tumor-Detection',
    repoUrl: 'https://github.com/Geekboieyash/Brain-Tumor-Detection',
    category: 'ai',
  },
  {
    id: 4,
    title: ' Blog App',
    description: 'MERN stack Blog app with smooth responsive design, JWT authentication and CRUD features.',
    image: 'https://github.com/user-attachments/assets/74d5d01c-1ac6-414d-9ecf-33f1249d2fe4',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    demoUrl: 'https://github.com/Geekboieyash/Blog-App',
    repoUrl: 'https://github.com/Geekboieyash/Blog-App',
    category: 'web',
  }
];

const filters = [
  { name: 'All', value: 'all' },
  { name: 'Web', value: 'web' },
  { name: 'AI', value: 'ai' },
];

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A curated list of some of my top open-source and personal projects from GitHub.
          </p>
          <div className="flex flex-wrap justify-center mt-8 gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ease-in-out ${
                  activeFilter === filter.value
                    ? 'bg-indigo-600 dark:bg-indigo-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: index * 0.1 }
              } : { opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition duration-500 ease-in-out transform hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition"
                  >
                    <ExternalLink size={16} className="mr-1" />
                    Live Demo
                  </a>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition"
                  >
                    <Github size={16} className="mr-1" />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
