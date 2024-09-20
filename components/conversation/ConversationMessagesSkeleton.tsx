import { times } from "lodash";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const ConversationMessagesSkeleton = () => {
  return (
    <motion.div
      className="space-y-6 p-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            when: "beforeChildren",
            staggerChildren: 0.3,
          },
        },
      }}
    >
      {times(3).map((index) => (
        <motion.div
          key={index}
          className={cn(
            "flex items-end",
            index % 2 === 0 ? "justify-end" : "justify-start"
          )}
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
        >
          {index % 2 !== 0 && (
            <motion.div
              className="w-8 h-8 rounded-full bg-blue-500 mr-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            />
          )}
          <div
            className={cn(
              "px-4 py-2 rounded-2xl max-w-[70%]",
              index % 2 === 0
                ? "bg-[#4C4C4C] rounded-br-none"
                : "bg-slate-700 rounded-bl-none"
            )}
          >
            <motion.div
              className="flex space-x-1"
              initial="start"
              animate="end"
              variants={{
                start: { width: 0 },
                end: {
                  width: "auto",
                  transition: {
                    duration: 0.5,
                    ease: "easeInOut",
                  },
                },
              }}
            >
              {times(3).map((dotIndex) => (
                <motion.div
                  key={dotIndex}
                  className="w-2 h-2 bg-gray-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: dotIndex * 0.1,
                  }}
                />
              ))}
            </motion.div>
          </div>
          {index % 2 === 0 && (
            <motion.div
              className="w-8 h-8 rounded-full bg-slate-500 ml-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};
