import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Skill categories
const skillCategories = [
  {
    title: 'Language',
    skills: [
      { name: 'C++', level: 90 },
      { name: 'Python', level: 90 },
      { name: 'Java', level: 80 },
      { name: 'Dart', level: 75 },
      { name: 'JavaScript/TypeScript', level: 90 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 85 },
      { name: 'Django', level: 75 },
      { name: 'Flask', level: 70 },
      { name: 'REST', level: 90 },
    ],
  },
  {
    title: 'Other',
    skills: [
      { name: 'Database Design', level: 85 },
      { name: 'Docker', level: 80 },
      { name: 'AWS', level: 75 },
      { name: 'CI/CD', level: 75 },
      { name: 'Testing', level: 80 },
    ],
  },
];

const SkillProgressBar: React.FC<{ name: string; level: number; delay: number }> = ({ 
  name, 
  level, 
  delay 
}) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span className="text-gray-500 dark:text-gray-400">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: delay, ease: "easeOut" }}
          className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full"
        ></motion.div>
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="skills" className="py-20">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here's an overview of my technical skills and competencies across various technologies and domains.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.5, 
                  delay: categoryIndex * 0.1 
                } 
              } : { opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-400">
                {category.title}
              </h3>
              <div>
                {category.skills.map((skill, index) => (
                  <SkillProgressBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.1 * index}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Additional skills badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="text-xl font-bold mb-6 text-center">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'Vue', 'Angular', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 
              'TypeScript', 'GraphQL', 'Tailwind CSS', 'Git', 'Docker', 'AWS', 'Firebase'].map((tech) => (
              <span 
                key={tech} 
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;