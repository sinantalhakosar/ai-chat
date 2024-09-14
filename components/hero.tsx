"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-2 sm:py-16 bg-transparent rounded-3xl shadow-xl"
    >
      <div className="flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="w-full md:w-1/2 flex justify-center mb-4 md:mb-0 md:order-2"
        >
          <Image
            src="/images/kyubi.svg"
            alt="AI Chat Assistant"
            width={225}
            height={225}
            className="rounded-lg max-w-full h-auto w-[200px] sm:w-[225px]"
          />
        </motion.div>
        <div className="w-full md:w-1/2 md:order-1">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-white leading-tight whitespace-nowrap"
          >
            Welcome to <span className="text-[#FE8621]">Kurama</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl mb-6 text-gray-300 leading-relaxed"
          >
            Sage-powered insights within our chat interface.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <motion.div className="w-full sm:w-auto">
              <Button
                asChild
                size="2xl"
                className="w-full sm:w-auto font-bold text-lg transition-all duration-300 shadow-md transform hover:-translate-y-1 hover:shadow-lg px-6 py-3"
              >
                <Link href="/dashboard">Start Chatting</Link>
              </Button>
            </motion.div>
            <motion.div className="w-full sm:w-auto">
              <Link
                href="#features"
                className="w-full sm:w-auto inline-block bg-transparent backdrop-blur-md text-orange-400 px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 shadow-md border-2 border-orange-400 transform hover:-translate-y-1 hover:shadow-lg text-center"
              >
                Explore Features
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 md:mt-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-md border border-orange-400"
        >
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-xl font-semibold mb-2 text-orange-400"
          >
            Advanced AI
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-gray-300"
          >
            Powered by cutting-edge language models for natural conversations.
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-md border border-orange-400"
        >
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-xl font-semibold mb-2 text-orange-400"
          >
            Customizable
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="text-gray-300"
          >
            Tailor the AI to your specific needs and industry requirements.
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-md border border-orange-400"
        >
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="text-xl font-semibold mb-2 text-orange-400"
          >
            24/7 Availability
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="text-gray-300"
          >
            Always ready to assist, anytime and anywhere you need it.
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
