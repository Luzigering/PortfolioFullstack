import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';


interface AnimatedTextProps {
  text: string;
  className?: string;
  isActive?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', isActive = true }) => {
  const letters = Array.from(text);

  
  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.015 }, 
    },
  };

  
  const childVariants: Variants = {
    hidden: { opacity: 0 }, 
    visible: {
      opacity: 1,       
    },
  };

  return (
    <motion.p
      className={`flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      key={text} 
    >
      {letters.map((letter, index) => (
        <motion.span variants={childVariants} key={index}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.p>
  );
};
export default AnimatedText;