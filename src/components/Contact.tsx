import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, MapPin, Phone, Github, Twitter, Linkedin } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage({
        type: 'success',
        text: 'Your message has been sent successfully!',
      });
      setFormData(initialFormData);

      setTimeout(() => {
        setSubmitMessage(null);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            If you have a project in mind or simply want to chat, feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md"
          >
            <h3 className="text-xl font-bold mb-6">Send me a message</h3>

            {submitMessage && (
              <div
                className={`mb-6 p-4 rounded-md ${
                  submitMessage.type === 'success'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                }`}
              >
                {submitMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Inputs */}
              {['name', 'email', 'subject'].map((field) => (
                <div className="mb-4" key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {field[0].toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    name={field}
                    value={formData[field as keyof FormData]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-800"
                  />
                </div>
              ))}

              {/* Message */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-800 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium rounded-md transition duration-300 ease-in-out flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="inline-flex items-center">
                    <Send size={16} className="mr-2" />
                    Send Message
                  </span>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md"
          >
            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-md">
                  <Mail size={20} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h4>
                  <a href="mailto:iammishrayash@gmai.com" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                    iammishrayash@gmai.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-md">
                  <Phone size={20} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h4>
                  <a href="tel:+910000" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                    +91 00000XXXXX
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-md">
                  <MapPin size={20} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h4>
                  <p>Mumbai, India</p>
                </div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="mt-8">
              <h4 className="font-medium mb-4">Follow me</h4>
              <div className="flex space-x-4">
                <a href="https://github.com/Geekboieyash" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition">
                  <Github size={20} className="text-indigo-600 dark:text-indigo-400" />
                </a>
                <a href="https://x.com/theynotlikeYash" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition">
                  <Twitter size={20} className="text-indigo-600 dark:text-indigo-400" />
                </a>
                <a href="https://www.linkedin.com/in/yash-mishra-649090216/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition">
                  <Linkedin size={20} className="text-indigo-600 dark:text-indigo-400" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
