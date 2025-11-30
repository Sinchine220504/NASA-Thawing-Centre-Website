'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ✅ Navbar Component
const Navbar = () => (
  <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
          <span className="text-white text-xl font-bold">N</span>
        </div>
        <span className="text-xl font-bold text-gray-900">NASA Thawing Centre</span>
      </div>

      {/* Menu Links */}
      <div className="hidden md:flex items-center gap-6">
        <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
          Home
        </Link>
        <Link href="/services" className="text-blue-600 font-semibold">
          Services
          <span className="bg-yellow-400 text-black text-xs px-2 py-0.5 rounded ml-1">11</span>
        </Link>
        <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
          About
        </Link>
        <button className="p-2 hover:bg-gray-100 rounded">🌙</button>
        <button className="bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-500 transition">
          Book a Service
        </button>
      </div>
    </div>
  </nav>
);

// ✅ Footer Component
const Footer = () => (
  <footer className="bg-gray-900 text-white py-12 mt-20">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center">
          <span className="text-white text-2xl font-bold">N</span>
        </div>
        <span className="text-2xl font-bold">NASA Thawing Centre</span>
      </div>
      <p className="text-gray-400 mb-8">Trusted roadside assistance • Available 24/7</p>
    </div>
  </footer>
);

// ✅ Services Page
export default function ServicesPage() {
  const serviceCategories = [
    {
      title: 'Roadside Assistance',
      services: [
        { icon: '🚗', title: 'Towing', desc: 'Anything from flatbed to safe lifting', path: '/services/towing' },
        { icon: '🛞', title: 'Flat Tyre', desc: 'Tube or tubeless puncture repair', path: '/services/flat-tyre' },
        { icon: '🔋', title: 'Battery Jumpstart', desc: 'Get jumpstart from professionals', path: '/services/battery-jumpstart' },
        { icon: '🔧', title: 'Starting Problem', desc: 'Make your vehicle move again', path: '/services/starting-problem' },
        { icon: '🔑', title: 'Key Unlock Assistance', desc: 'One-stop unlock assistance', path: '/services/key-unlock-assistance' },
        { icon: '⛽', title: 'Fuel Delivery', desc: 'Petrol/Diesel delivered quickly', path: '/services/fuel-delivery' },
      ],
    },
    {
      title: 'Fitment Services',
      services: [
        { icon: '⚙️', title: 'Fitment Services', desc: 'Upgrade your vehicle smartly', path: '/services/fitment-services' },
        { icon: '📹', title: 'Dashcam Installation', desc: 'Capture every driving moment', path: '/services/dashcam-installation' },
        { icon: '📺', title: 'Multimedia System Installation', desc: 'Enhance your driving experience', path: '/services/multimedia-system-installation' },
      ],
    },
    {
      title: 'General Repair Services',
      services: [
        { icon: '📋', title: 'Car Inspection', desc: 'Get your car fully inspected', path: '/services/car-inspection' },
        { icon: '🔧', title: 'Bike Express Services', desc: 'Full bike service at your doorstep', path: '/services/bike-express-services' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-gray-600 text-lg">
            Comprehensive vehicle assistance and repair services available 24/7
          </p>
        </motion.div>

        {/* Service Categories */}
        {serviceCategories.map((category, categoryIdx) => (
          <motion.section
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: categoryIdx * 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.services.map((service, idx) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, delay: categoryIdx * 0.2 + idx * 0.1 }}
                  className="bg-gray-100 rounded-2xl p-6 hover:shadow-xl transition cursor-pointer group"
                >
                  <Link href={service.path as any}>
                    <div className="flex items-start gap-4">
                      <div className="text-4xl bg-white rounded-xl p-3 shadow-sm group-hover:scale-110 transition">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 text-center text-white mt-16"
        >
          <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Our expert technicians are available 24/7 to help you
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold shadow-xl hover:shadow-2xl transition"
            >
              Book a Service
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition"
            >
              Call Now
            </motion.button>
          </div>
        </motion.section>
      </main>

      <Footer />

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/1234567890"
        target="_blank"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition z-50 flex items-center justify-center"
      >
        <span className="text-3xl">💬</span>
      </motion.a>
    </div>
  );
}
