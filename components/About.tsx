"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

export default function About() {
  return (
    <section className="py-20 text-center text-white bg-gray-900">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-blue-400 mb-6"
        >
          About Me
        </motion.h3>

        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg"
          >
            <Image
              src="/suitobinna.png"
              alt="Obinna Anthony"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:text-left text-center"
          >
            <h4 className="text-2xl font-semibold mb-3">
              Hi, I&apos;m{" "}
              <span className="text-blue-400">Obinna Anthony</span>
            </h4>

            <TypeAnimation
              sequence={[
                "Full Stack Developer 💻",
                2000,
                "React & Next.js Enthusiast ⚡",
                2000,
                "UI/UX Problem Solver 🎨",
                2000,
                "Tech Innovator 🚀",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="block text-lg text-gray-300 mb-6"
            />

            <p className="text-gray-400 leading-relaxed max-w-lg">
              I&apos;m a passionate full stack developer who loves building
              intuitive, high-performance web and mobile applications.
              My goal is to create digital experiences that merge design,
              functionality, and scalability.
              <br />
              I enjoy exploring new technologies and constantly improving my
              craft through real-world projects and collaboration.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
