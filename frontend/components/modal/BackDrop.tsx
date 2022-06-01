import React from 'react';
import { motion } from 'framer-motion';

interface BackDropProps {
  children;
  onClick;
}

export default function BackDrop({ children, onClick }: BackDropProps) {
  return (
    <motion.div
      className="absolute top-0 bottom-0 left-0 w-full min-h-screen bg-gray-400/[.7] flex items-center justify-center z-50"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
