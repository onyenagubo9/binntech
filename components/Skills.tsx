"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiFirebase,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiGithub,
} from "react-icons/si";

export default function Skills() {
  const categories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", icon: <SiReact className="text-sky-400" /> },
        { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
        { name: "TypeScript", icon: <SiTypescript className="text-blue-400" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: <SiNodedotjs className="text-green-400" /> },
        { name: "Express", icon: <SiExpress className="text-gray-200" /> },
        { name: "Django", icon: <SiDjango className="text-green-600" /> },
        { name: "Firebase", icon: <SiFirebase className="text-amber-400" /> },
      ],
    },
    {
      title: "Database",
      skills: [
        { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
        { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-500" /> },
      ],
    },
    {
      title: "DevOps",
      skills: [
        { name: "Docker", icon: <SiDocker className="text-blue-400" /> },
        { name: "Git", icon: <SiGit className="text-orange-400" /> },
        { name: "GitHub", icon: <SiGithub className="text-white" /> },
      ],
    },
  ];

  return (
    <section className="py-20 bg-[#121212] text-white px-8">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center text-blue-400 mb-12"
      >
        My Tech Stack
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="bg-[#1e1e1e] rounded-2xl shadow-md hover:shadow-blue-500/30 transition-shadow duration-300 p-6"
          >
            <h4 className="text-xl font-semibold mb-4 text-blue-300 border-b border-gray-700 pb-2">
              {cat.title}
            </h4>
            <div className="space-y-4">
              {cat.skills.map((skill, j) => (
                <motion.div
                  key={j}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 bg-[#222] rounded-lg p-3 hover:bg-[#2a2a2a] transition-colors"
                >
                  <div className="text-2xl">{skill.icon}</div>
                  <span className="font-medium">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
