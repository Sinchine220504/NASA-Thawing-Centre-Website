'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onBookClick }) => (
  <nav className="bg-slate-700 shadow-md py-4 px-6 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center">
          <span className="text-black text-xl font-bold">⚡</span>
        </div>
        <span className="text-xl font-bold text-white">NASA Thawing Centre</span>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <div className="relative">
          <a href="/services" className="text-white hover:text-yellow-400 transition flex items-center gap-1">
            Services
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">1</span>
          </a>
        </div>
        <div className="relative">
          <a href="/products" className="text-white hover:text-yellow-400 transition flex items-center gap-1">
            Products
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">2</span>
          </a>
        </div>
        <a href="/subscriptions" className="text-white hover:text-yellow-400 transition">Subscriptions</a>
        <a href="/about" className="text-white hover:text-yellow-400 transition">About</a>
        <button
          onClick={onBookClick}
          className="bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-500 transition"
        >
          Book a Service
        </button>
      </div>
    </div>
  </nav>
);

export default function TowingService() {
  const [showModal, setShowModal] = useState(false);
  const faqs = [
    { q: "What types of vehicles can you tow?", a: "We can tow all types of vehicles including cars, bikes, SUVs, and light commercial vehicles." },
    { q: "Are your towing services available 24/7?", a: "Yes, our towing services are available 24/7, 365 days a year." },
    { q: "How quickly can you reach me in case of a breakdown?", a: "Our response time is typically 20-30 minutes within city limits." },
    { q: "What are your towing charges?", a: "Bike towing starts at ₹1,450 and car towing starts at ₹3,500. Final charges depend on distance and vehicle type." },
    { q: "Can your tow vehicles involved in accidents?", a: "Yes, we specialize in accident recovery and can safely tow damaged vehicles." },
    { q: "How do you ensure the safety of my vehicle during towing?", a: "We use professional flatbed tow trucks and secure fastening systems to ensure zero damage during transport." },
    { q: "Do I need to be present during the towing process?", a: "It's preferred but not mandatory. We can coordinate with you remotely." },
    { q: "How do I request a towing service?", a: "You can call us directly or book online through our website." }
  ];

  const handleBookService = () => {
    setShowModal(true);
  };

  const handleModalOk = () => {
    setShowModal(false);
    window.location.href = "/book-service";
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onBookClick={handleBookService} />

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-gray-300 rounded-lg shadow-xl p-6 w-11/12 max-w-md"
          >
            <p className="text-gray-900 mb-4 text-sm">
              An embedded page at app.readyassist.in says
              <br /><br />
              Please allow location access for better service. You can enable location by clicking the lock or location icon in the address bar and allowing location access.
            </p>
            <button
              onClick={handleModalOk}
              className="bg-yellow-400 text-black px-6 py-2 rounded-md font-bold hover:bg-yellow-500 transition"
            >
              OK
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="text-gray-200 mb-4 tracking-wider">YOUR VEHICLE, OUR PRIORITY</p>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Fastest<br />Bike & Car Towing Services<br />No hidden charges!
              </h1>
              <div className="flex gap-4 mb-8">
                <div className="bg-white rounded-xl p-5 flex-1 text-center shadow-lg">
                  <p className="text-red-600 font-bold text-lg mb-1">Bike Towing</p>
                  <p className="text-red-600 font-bold text-xl">Starts @ ₹1,450*</p>
                </div>
                <div className="bg-white rounded-xl p-5 flex-1 text-center shadow-lg">
                  <p className="text-orange-600 font-bold text-lg mb-1">Car Towing</p>
                  <p className="text-orange-600 font-bold text-xl">Starts @ ₹3,500*</p>
                </div>
              </div>
              <p className="text-sm text-gray-300">*Prices are exclusive of taxes</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
              <img src="https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&h=600&fit=crop" alt="Towing Truck" className="w-full h-auto rounded-2xl" />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Booking Online</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <input type="tel" placeholder="MOBILE NUMBER" className="px-4 py-3 bg-gray-100 rounded-lg text-gray-900 placeholder-gray-500 text-sm" />
                <input type="text" placeholder="VEHICLE REG NO" className="px-4 py-3 bg-gray-100 rounded-lg text-gray-900 placeholder-gray-500 text-sm" />
                <input type="text" placeholder="VEHICLE MAKE & MODEL" className="px-4 py-3 bg-gray-100 rounded-lg text-gray-900 placeholder-gray-500 text-sm" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <input type="text" placeholder="PICKUP LOCATION" className="px-4 py-3 bg-gray-100 rounded-lg text-gray-900 placeholder-gray-500 text-sm" />
                <input type="text" placeholder="DROP LOCATION" className="px-4 py-3 bg-gray-100 rounded-lg text-gray-900 placeholder-gray-500 text-sm" />
                <button className="bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition">BOOK NOW</button>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Connect with us</h3>
              <div className="flex items-center gap-3">
                <div className="bg-yellow-400 p-3 rounded-xl"><span className="text-2xl">📞</span></div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">24/7 TOWING SERVICE</p>
                  <p className="text-2xl font-bold text-blue-600">8197 852 852</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="md:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img src='https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop'alt="Service 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=350&fit=crop" alt="Service 2" className="w-full h-full object-cover" />
                  </div>
                </div>
                {/* <div className="pt-8">
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img src="https://images.unsplash.com/photo-1632823469068-c14003cd1247?w=300&h=500&fit=crop" alt="Fleet" className="w-full h-full object-cover" />
                  </div>
                </div> */}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="md:col-span-3 text-center">
              <div className="flex flex-col items-center">
                <div className="text-7xl font-black text-slate-800 leading-none">09</div>
                <div className="text-3xl font-light text-gray-400 mt-2">Years</div>
              </div>
              <h2 className="text-4xl font-black text-slate-800 mt-6">Experience</h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="md:col-span-4">
              <p className="text-gray-600 mb-4 text-sm tracking-wider">ABOUT US</p>
              <h3 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">24/7 Bike and Car Towing Services</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Experiencing a vehicle breakdown can be stressful, but having access to reliable towing services ensures peace of mind. Our 24/7 bike and car towing services are designed to assist you promptly, ensuring your vehicle is handled with utmost care and transported safely to your desired location.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-yellow-400 text-xl">✓</span>
                  <span className="text-gray-800 font-medium">Driving Quality, Ensuring Safety Every Car</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-yellow-400 text-xl">✓</span>
                  <span className="text-gray-800 font-medium">Comprehensive Diagnostic Check</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-yellow-400 text-xl">✓</span>
                  <span className="text-gray-800 font-medium">We Know Your Car Inside Out</span>
                </div>
              </div>
              <button className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-500 transition">Book Service →</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Do It */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="text-yellow-400 font-bold mb-2 uppercase tracking-wider">OUR PROCESS</p>
            <h2 className="text-4xl font-bold text-slate-900">How do we do it</h2>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: '🚗', text: 'Check the vehicle & prepare job card with all pre-existing details' },
              { icon: '🚚', text: 'Tow the vehicle carefully & safely to avoid towing damages' },
              { icon: '✓', text: 'Drop the vehicle safely to the workshop & handover key to the undertaking authority' },
              { icon: '👨‍🔧', text: 'Provide maintenance tips & recommendations' }
            ].map((step, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-black relative h-full flex flex-col">
                  <div className="absolute -top-3 -left-3 w-6 h-6 border-l-4 border-t-4 border-dashed border-black"></div>
                  <div className="absolute -top-3 -right-3 w-6 h-6 border-r-4 border-t-4 border-dashed border-black"></div>
                  <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-4 border-b-4 border-dashed border-black"></div>
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-4 border-b-4 border-dashed border-black"></div>
                  <div className="bg-gray-100 rounded-2xl p-6 mb-6 h-32 flex items-center justify-center">
                    <span className="text-6xl">{step.icon}</span>
                  </div>
                  <p className="text-gray-700 text-center leading-relaxed flex-1">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-yellow-400 font-bold mb-2 uppercase tracking-wider">WHENEVER & WHEREVER</p>
            <h2 className="text-4xl font-bold text-slate-900">We've got you covered nationwide!</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-yellow-400">
                <img src="/a.jpg" alt="Service" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-yellow-400 mt-12">
                <img src="/b.jpg" alt="Service" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="bg-white border-4 border-red-500 rounded-2xl p-4 flex-shrink-0"><span className="text-3xl">⚡</span></div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Fastest Turn-Around</h3>
                  <p className="text-gray-600">Over years we have built a strong network of skilled and verified mechanics to assist you at the earliest</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="bg-white border-4 border-yellow-400 rounded-2xl p-4 flex-shrink-0"><span className="text-3xl">🕐</span></div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">One of the Top Rated</h3>
                  <p className="text-gray-600">We are committed towards your safety, and aim at giving the most hassle free experience.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="bg-white border-4 border-orange-500 rounded-2xl p-4 flex-shrink-0"><span className="text-3xl">⭐</span></div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">On-the-spot support</h3>
                  <p className="text-gray-600">Over years we have built a strong nationwide network of skilled and verified mechanics to assist you on spot.</p>
                </div>
              </div>
              <button className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-500 transition">Book Service</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1600&h=600&fit=crop" alt="CTA" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-blue-900/80"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <div className="bg-yellow-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"><span className="text-4xl">📞</span></div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">A little care for your great problems</h2>
          <p className="text-xl text-gray-100 mb-8">Our 24/7 bike and car towing services are designed to assist you promptly, ensuring your vehicle is handled with utmost care and transported safely to your desired location.</p>
          <button className="bg-yellow-400 text-black px-10 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition">Book Service →</button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-yellow-400 font-bold mb-2 uppercase tracking-wider">CUSTOMER REVIEW</p>
            <h2 className="text-4xl font-bold text-slate-900">What customers Say About Us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[
              { name: "Samantha L", text: "My SUV wouldn't start in my driveway, I have searched for car towing service near me and I needed it towed to the dealership. I have booked service with NASA Thawing Centre and they have arrived on time, and the driver was friendly and knowledgeable. The service was seamless from start to finish." },
              { name: "Bharath R", text: "I was impressed with the prompt and efficient car towing Service from NASA Thawing Centre. They arrived within 30 minutes of my call and towed my car to my preferred mechanic without any issues. Exceptional service!" },
              { name: "Ram Kumar", text: "When my car broke down on the highway, I contacted NASA Thawing Centre. Their response was swift, and the technician was both professional and courteous. They safely transported my vehicle to the nearest repair shop, turning a stressful situation into a manageable one. Highly recommended!" }
            ].map((testimonial, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => (<span key={i} className="text-yellow-400 text-xl">★</span>))}</div>
                <p className="text-gray-700 mb-6 leading-relaxed text-sm">{testimonial.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-slate-400 flex items-center justify-center"><span className="text-2xl">👤</span></div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Customer</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center gap-4">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl transition shadow-lg">←</button>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl transition shadow-lg">→</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-yellow-400 font-bold mb-2 uppercase tracking-wider">HAVE ANY QUESTION</p>
            <h2 className="text-4xl font-bold text-slate-900">Frequently Asked Question</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: idx * 0.05 }} className="bg-white rounded-xl p-6 hover:shadow-xl transition cursor-pointer border border-gray-100">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-semibold text-gray-900 flex-1 text-base">{faq.q}</h3>
                  <button className="bg-slate-900 text-white w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-xl font-bold hover:bg-slate-800 transition">+</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-yellow-400 rounded-full w-12 h-12 flex items-center justify-center"><span className="text-black text-2xl font-bold">⚡</span></div>
                <span className="text-xl font-bold">NASA Thawing Centre</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">839/2, 24th Main Rd, Behind Thirumala Theatre, 1st Sector, HSR Layout, Bengaluru, Karnataka - 560102</p>
              <div className="space-y-2">
                <p className="text-gray-300 text-sm">hello@nasathawingcentre.in</p>
                <p className="text-gray-300 text-sm">8197 852 852 (NASA Thawing Centre)</p>
                <p className="text-gray-300 text-sm">70 2201 2201 (CNGFirst)</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p className="hover:text-white cursor-pointer">About Us</p>
                <p className="hover:text-white cursor-pointer">Career</p>
                <p className="hover:text-white cursor-pointer">Contact Us</p>
                <p className="hover:text-white cursor-pointer">News</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Products</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p className="hover:text-white cursor-pointer">Dashcam</p>
                <p className="hover:text-white cursor-pointer">Seat Covers</p>
                <p className="hover:text-white cursor-pointer">Mec+</p>
                <p className="hover:text-white cursor-pointer">Claims Pro</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p className="hover:text-white cursor-pointer">Blogs</p>
                <p className="hover:text-white cursor-pointer">Spotlight Videos</p>
                <p className="hover:text-white cursor-pointer">Flood Safety</p>
                <p className="hover:text-white cursor-pointer">CNG Market Insights</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p className="hover:text-white cursor-pointer">My Subscriptions</p>
                <p className="hover:text-white cursor-pointer">CNG Fuel Stations</p>
                <p className="hover:text-white cursor-pointer">Year Recap</p>
                <p className="hover:text-white cursor-pointer">Prime Terms & Conditions</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="flex flex-wrap gap-4 text-gray-400 text-sm justify-center">
              <span>Dashcam Product & Installation</span>
              <span>•</span>
              <span>Seat Covers & Installation</span>
              <span>•</span>
              <span>Towing</span>
              <span>•</span>
              <span>Flat-Tyre</span>
              <span>•</span>
              <span>Battery Jumpstart</span>
              <span>•</span>
              <span>Starting Problem</span>
              <span>•</span>
              <span>Key-Unlock Assist</span>
            </div>
          </div>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex gap-4">
              <div className="bg-white rounded-lg px-4 py-2 text-black text-xs font-bold">App Store</div>
              <div className="bg-white rounded-lg px-4 py-2 text-black text-xs font-bold">Google Play</div>
            </div>
            <p className="text-right text-gray-400 text-2xl italic font-light">#alwaysMoveForward</p>
          </div>
        </div>
      </footer>

      {/* Floating Call Button */}
      <motion.a href="tel:8197852852" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring", stiffness: 200 }} whileHover={{ scale: 1.1 }} className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center z-50">
        <span className="text-3xl">📞</span>
      </motion.a>
    </div>
  );
}
