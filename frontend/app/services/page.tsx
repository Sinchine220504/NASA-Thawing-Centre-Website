'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => (
  <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
          <span className="text-white text-xl font-bold">N</span>
        </div>
        <span className="text-xl font-bold text-blue-600">NASA Thawing Centre</span>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <Link href="/services" className="text-blue-600 font-semibold">Services</Link>
        <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">About</Link>
        <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">Contact</Link>
        <Link href="/book-service" className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg">
          Book Service
        </Link>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12 mt-20">
    <div className="max-w-6xl mx-auto px-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center">
          <span className="text-white text-2xl font-bold">N</span>
        </div>
        <span className="text-2xl font-bold">NASA Thawing Centre</span>
      </div>
      <p className="text-gray-400 mb-8">
        Trusted roadside assistance • Available 24/7
      </p>
      <div className="flex justify-center gap-6 text-sm text-gray-400">
        <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
        <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
        <a href="#" className="hover:text-blue-400 transition">Contact Us</a>
      </div>
    </div>
  </footer>
);

export default function ServicesPage() {
  const services = [
    {
      category: 'Roadside Assistance',
      items: [
        { title: 'Towing', slug: 'towing', desc: 'Anything from flatbed to safe lifting', icon: '🚛' },
        { title: 'Flat Tyre', slug: 'flat-tyre', desc: 'Tube or Tubeless puncture repair', icon: '🛞' },
        { title: 'Battery Jumpstart', slug: 'battery-jumpstart', desc: 'Get jumpstart from professionals', icon: '🔋' },
        { title: 'Starting Problem', slug: 'starting-problem', desc: 'Make your vehicle moving', icon: '⚡' },
        { title: 'Key Unlock Assistance', slug: 'key-unlock-assistance', desc: 'One-stop unlock assistance', icon: '🔑' },
        { title: 'Fuel Delivery', slug: 'fuel-delivery', desc: 'Petrol/Diesel delivered faster', icon: '⛽' }
      ]
    },
    {
      category: 'Fitment Services',
      items: [
        { title: 'Fitment Service', slug: 'fitment-services', desc: 'Make your vehicle upgrade', icon: '🔧' },
        { title: 'Dashcam Installation', slug: 'dashcam-installation', desc: 'Capture every driving moment', icon: '📹' },
        { title: 'Multimedia System Installation', slug: 'multimedia-system-installation', desc: 'Enhance your driving experience', icon: '📱' }
      ]
    },
    {
      category: 'General Repair Services',
      items: [
        { title: 'Car Inspection', slug: 'car-inspection', desc: 'Get your car inspected', icon: '📋' },
        { title: 'Bike Express Services', slug: 'bike-express-services', desc: 'Full bike service at your doorstep', icon: '🏍️' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-gray-600 text-lg">Comprehensive roadside assistance and vehicle services</p>
        </motion.div>

        {services.map((section, sectionIdx) => (
          <motion.section
            key={section.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: sectionIdx * 0.1 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((service, idx) => (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-200"
                >
                  <Link href={`/services/${service.slug}` as any} className="block">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{service.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                        <p className="text-gray-600 text-sm">{service.desc}</p>
                        <span className="text-blue-600 text-sm mt-3 inline-block">Learn more →</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 shadow-2xl mt-16"
        >
          <h3 className="text-3xl font-bold text-white mb-4">Need Assistance?</h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Our expert team is ready to help you 24/7. Book a service now and experience professional roadside assistance.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-black px-10 py-4 rounded-lg shadow-xl hover:bg-yellow-500 transition font-bold text-lg"
          >
            Book Service Now
          </motion.button>
        </motion.section>
      </main>

      <Footer />

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/1234567890"
        target="_blank"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition z-50"
      >
        <span className="text-2xl">💬</span>
      </motion.a>
    </div>
  );
}