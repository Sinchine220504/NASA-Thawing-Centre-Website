'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Mock components - replace with your actual components
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
        <Link href="/services" className="text-gray-700 hover:text-blue-600 transition">Services</Link>
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

const Testimonials = () => (
  <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
    <h3 className="text-2xl font-bold text-blue-600 mb-6">What Our Customers Say</h3>
    <div className="grid md:grid-cols-3 gap-6">
      {[
        { name: "Rajesh Kumar", text: "Quick and reliable service! They arrived within 20 minutes." },
        { name: "Priya Singh", text: "Professional team with fair pricing. Highly recommended!" },
        { name: "Amit Sharma", text: "Saved me during a late-night breakdown. Excellent service!" }
      ].map((testimonial, idx) => (
        <motion.div
          key={idx}
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
        >
          <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
          <p className="font-semibold text-blue-600">- {testimonial.name}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-10 items-center mb-20">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-blue-600 font-semibold mb-4 text-lg">24/7 ON-SPOT</p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-6">
              Rapid thawing, towing, and rescue — anytime, anywhere.
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Reliable roadside assistance across the city. Our trained technicians are on standby 24/7 to help you get back on track.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="/book-service"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-blue-700 transition font-semibold"
              >
                Book Service
              </motion.a>
              <motion.a
                href="/services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transition font-semibold"
              >
                View Services
              </motion.a>
            </div>
          </motion.div>

          {/* Right Section - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/r.jpg"
                alt="Roadside Assistance Technician"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Service Highlights Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute -bottom-6 left-6 right-6 bg-white rounded-xl shadow-2xl p-6 border-2 border-blue-100"
            >
              <ul className="grid grid-cols-2 gap-3 text-sm">
                {[
                  '✓ Battery jumpstart',
                  '✓ Emergency towing',
                  '✓ On-spot repair',
                  '✓ 24/7 support'
                ].map((item, idx) => (
                  <li key={idx} className="text-gray-700 font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </section>

        {/* Service Cards */}
        <section className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 mb-10"
          >
            Popular Services
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { 
                title: 'Dashcam Installation', 
                desc: 'Professional installation of car dashcams with expert technicians',
                icon: '📹',
                bg: 'from-yellow-50 to-yellow-100',
                border: 'border-yellow-200',
                image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop'
              },
              { 
                title: 'Car Inspection', 
                desc: 'Comprehensive vehicle inspection with detailed report',
                icon: '📋',
                bg: 'from-blue-50 to-blue-100',
                border: 'border-blue-200',
                image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop'
              },
              { 
                title: 'Battery Service', 
                desc: 'Quick battery replacement and jumpstart services',
                icon: '🔋',
                bg: 'from-orange-50 to-orange-100',
                border: 'border-orange-200',
                image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop'
              },
              { 
                title: 'Emergency Towing', 
                desc: 'Fast and reliable towing service available 24/7',
                icon: '🚗',
                bg: 'from-green-50 to-green-100',
                border: 'border-green-200',
                image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop'
              }
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`bg-gradient-to-br ${card.bg} border-2 ${card.border} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition`}
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
                    <span className="text-2xl">{card.icon}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{card.desc}</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                    Know More →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <Testimonials />
        </motion.div>

        {/* Additional Service Section with Image */}
        <section className="mb-20 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
             <img
               src="/p.jpg"
               alt="Professional Service"
               className="w-full h-[500px] object-cover"
             />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Expert Technicians at Your Service
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Our highly trained technicians are equipped with the latest tools and technology to provide you with the best roadside assistance experience. We're committed to getting you back on the road quickly and safely.
            </p>
            <div className="bg-gray-50 rounded-2xl p-8 mb-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-4xl font-black text-blue-600 mb-2">500+</p>
                  <p className="text-gray-600">Happy Customers</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-blue-600 mb-2">24/7</p>
                  <p className="text-gray-600">Support Available</p>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-blue-700 transition font-semibold"
            >
              Learn More →
            </motion.button>
          </motion.div>
        </section>

        {/* Closing Section */}
        <motion.section
          className="text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-16 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-white opacity-5"></div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              We're here when it matters
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Trusted by thousands for quick, safe, and affordable roadside assistance.
            </p>
            <motion.a
              href="/book-service"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-10 py-4 rounded-lg shadow-xl hover:shadow-2xl transition font-bold text-lg inline-block"
            >
              Book Now
            </motion.a>
          </div>
        </motion.section>
      </main>

      <Footer />

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/1234567890"
        target="_blank"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-full shadow-2xl transition z-50"
      >
        <span className="text-2xl">💬</span>
        <span className="font-semibold">Chat</span>
      </motion.a>
    </div>
  );
}