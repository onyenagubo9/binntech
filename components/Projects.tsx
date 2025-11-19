"use client";

import Image from "next/image";
import { FaYoutube, FaExternalLinkAlt } from "react-icons/fa"; // changed icon import
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import PaystackButtonComponent from "./PaystackButton";

interface Project {
  title: string;
  image: string;
  description: string;
  tech: string[];
  youtube: string; // replaced github with youtube
  live: string;
  type: "free" | "paid";
  price?: number;
  downloadLink?: string;
}

const projects: Project[] = [
  {
    title: "Cryptex Wallet",
    image: "/cryptex-photo.png",
    description:
      "A secure crypto wallet app built with Next.js, Firebase, and Tailwind. Supports authentication, live market data, and transactions.",
    tech: ["Next.js", "Firebase", "Tailwind"],
    youtube: "https://www.youtube.com/watch?v=cryptex-demo", // your YouTube link here
    live: "https://cryptex-wtqk.vercel.app/",
    type: "paid",
    price: 25000,
    downloadLink: "/downloads/cryptex.zip",
  },
  {
    title: "E-Commerce Dashboard",
    image: "/eccomerce.png",
    description:
      "Full-featured admin dashboard for managing products, orders, and analytics with Node.js and MongoDB backend.",
    tech: ["React", "Node.js", "MongoDB"],
    youtube: "https://www.youtube.com/watch?v=ecommerce-demo",
    live: "https://alphamobilesnz.com/",
    type: "free",
    downloadLink: "/downloads/project1.zip",
  },
  {
    title: "Banking website",
    image: "/bank-photo.png",
    description:
      "Modern responsive Banking project showcasing Firstapp services with elegant UI and animations.",
    tech: ["Next.js", "Framer Motion", "Tailwind"],
    youtube: "https://www.youtube.com/watch?v=banking-demo",
    live: "https://www.firstcbu.app/",
    type: "paid",
    price: 30000,
    downloadLink: "/downloads/honstinger.zip",
  },
];

export default function Projects() {
  const [emails, setEmails] = useState<{ [key: number]: string }>({});

  const handleEmailChange = (index: number, value: string) => {
    setEmails((prev) => ({ ...prev, [index]: value }));
  };

  return (
    <section id="projects" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">
          Projects
        </h2>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const userEmail = emails[index] || "";
            const isEmailValid = userEmail.includes("@");

            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all hover:shadow-blue-500/50"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-sm bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links (YouTube + Live) */}
                  <div className="flex justify-between items-center mb-3">
                    <a
                      href={project.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-red-500"
                    >
                      <FaYoutube /> Watch Demo
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-blue-400"
                    >
                      <FaExternalLinkAlt /> Live
                    </a>
                  </div>

                  {/* Free / Paid Section */}
                  {project.type === "free" ? (
                    <Link
                      href={project.downloadLink || "#"}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition"
                    >
                      Download Free
                    </Link>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-300">
                        Price: ₦{project.price?.toLocaleString()}
                      </p>

                      <input
                        type="email"
                        placeholder="Enter your email to make purchase"
                        value={userEmail}
                        onChange={(e) =>
                          handleEmailChange(index, e.target.value)
                        }
                        className="w-full px-3 py-2 rounded-md bg-gray-900 border border-gray-700 focus:border-blue-500 outline-none text-sm"
                      />

                      <PaystackButtonComponent
                        email={userEmail}
                        amount={project.price || 0}
                        project={project.title}
                        downloadLink={project.downloadLink || "#"}
                        disabled={!isEmailValid}
                      />

                      {!isEmailValid && (
                        <p className="text-red-400 text-xs">
                          Enter a valid email to continue
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
