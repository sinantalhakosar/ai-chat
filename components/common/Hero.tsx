"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Hero() {
  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: `
        radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px),
        radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)
      `,
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 10px 10px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto px-4 sm:px-6 py-16 sm:py-24 bg-transparent rounded-3xl shadow-xl min-h-screen flex flex-col justify-center overflow-hidden w-3/4"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 md:order-1 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-white leading-tight"
            >
              <span className="whitespace-nowrap">AI-powered</span> chat
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl mb-6 text-gray-300 leading-relaxed"
            >
              Innovative <span className="whitespace-nowrap">AI-powered</span>{" "}
              chat interface
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
                  className="w-full sm:w-auto font-bold text-lg transition-all duration-300 shadow-md transform hover:-translate-y-1 hover:shadow-lg px-6 py-3 dark:bg-sky-700"
                >
                  <Link href="/dashboard">Start Chatting</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0 md:order-2"
          >
            <div className="relative w-full max-w-[300px] h-[300px] sm:h-[400px] rounded-lg p-4 overflow-hidden">
              <div className="absolute inset-0 flex flex-col justify-center">
                {[
                  { text: "Hello! How can I assist you today?", isAI: true },
                  { text: "I need help with my project.", isAI: false },
                  {
                    text: "Sure, I'd be happy to help. What kind of project are you working on?",
                    isAI: true,
                  },
                  { text: "It's a React application.", isAI: false },
                ].map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.5, duration: 0.5 }}
                    className={`mb-2 p-2 rounded-lg ${
                      message.isAI ? "self-start" : "self-end"
                    }`}
                  >
                    <motion.span
                      initial={{ backgroundSize: "0% 100%" }}
                      animate={{ backgroundSize: "100% 100%" }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear",
                        repeatDelay: 1,
                      }}
                      style={{
                        background:
                          "linear-gradient(to right, #3b82f6, #ef4444)",
                        backgroundRepeat: "no-repeat",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                        backgroundPosition: message.isAI ? "left" : "right",
                      }}
                    >
                      {message.text}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:mt-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-md border-2 border-sky-600"
          >
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="text-xl font-semibold mb-2 text-white"
            >
              Multiple Providers
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-gray-300"
            >
              Integrates seamlessly with multiple industry-leading AI services.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-md border-2 border-sky-600"
          >
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-xl font-semibold mb-2 text-white"
            >
              Dynamic Visualizations
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="text-gray-300"
            >
              Interactive and real-time visualizations.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.4 }}
            className="bg-transparent backdrop-blur-md p-6 rounded-lg shadow-md border-2 border-sky-600"
          >
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="text-xl font-semibold mb-2 text-white"
            >
              Secure Data Handling
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="text-gray-300"
            >
              Confidentiality for sensitive information.
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
