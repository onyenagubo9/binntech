"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    // Example email send logic (you can replace with your backend endpoint or EmailJS)
    try {
      await new Promise((res) => setTimeout(res, 1500)); // simulate network delay
      setStatus("Message sent successfully ✅");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("Something went wrong ❌");
    }
  };

  return (
    <section className="bg-gray-900 text-white py-20 px-6 md:px-16" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-4">Contact Me</h2>
        <p className="text-gray-400 mb-10">
          Let’s collaborate or just have a chat! I’m open to freelance work, full-time roles, or exciting projects.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-left"
          >
            <div className="flex items-center space-x-4">
              <Mail className="text-teal-400" size={28} />
              <p className="text-gray-300">binntech.dev@example.com</p>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="text-teal-400" size={28} />
              <p className="text-gray-300">+234 8144801340</p>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="text-teal-400" size={28} />
              <p className="text-gray-300">Lagos, Nigeria</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg"
          >
            <div className="mb-4">
              <label className="block text-sm mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2">Message</label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition-all duration-200"
            >
              <Send size={18} />
              Send Message
            </button>

            {status && (
              <p className="mt-4 text-sm text-gray-400 animate-pulse">{status}</p>
            )}
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
