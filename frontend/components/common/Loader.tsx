import React from 'react';
import { motion } from 'framer-motion';

const loaderVariants = {
  animationOne: {
    x: [-20, 20],
    y: [0, -30],
    transition: {
      x: {
        yoyo: Infinity,
        duration: 0.5,
      },
      y: {
        yoyo: Infinity,
        duration: 0.25,
        ease: 'easeOut',
      },
    },
  },
};

export default function Loader() {
  return (
    <div className="h-screen flex items-center">
      <motion.div variants={loaderVariants} animate="animationOne">
        <img src="/planet_logo.png" alt="" className="w-44" />
      </motion.div>
    </div>
    // <div className="h-screen flex items-center">
    //   <img
    //     src="/planet_logo.png"
    //     alt=""
    //     className="w-72 h-52 animate-bounce duration-200"
    //   />
    // </div>
  );
}
