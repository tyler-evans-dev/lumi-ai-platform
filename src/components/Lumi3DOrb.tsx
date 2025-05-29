'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Lumi3DOrb() {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Orbital rings */}
      <div 
        className={`absolute w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-blue-400/50
          ${isActive ? 'animate-spin-slow-reverse' : 'animate-spin-slow'}`}
        style={{
          transform: 'rotateX(70deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Ring particles */}
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const x = Math.cos(angle) * 32;
          const y = Math.sin(angle) * 32;
          return (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-blue-400"
              style={{
                left: `calc(50% + ${x}rem)`,
                top: `calc(50% + ${y}rem)`,
                animation: `pulse-subtle ${Math.random() * 2 + 2}s infinite ease-in-out`,
              }}
            />
          );
        })}
      </div>

      <div 
        className={`absolute w-56 h-56 md:w-72 md:h-72 rounded-full border-2 border-purple-400/50
          ${isActive ? 'animate-spin-slow' : 'animate-spin-slow-reverse'}`}
      >
        {/* Ring particles */}
        {Array.from({ length: 15 }).map((_, i) => {
          const angle = (i / 15) * Math.PI * 2;
          const x = Math.cos(angle) * 28;
          const y = Math.sin(angle) * 28;
          return (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-purple-400"
              style={{
                left: `calc(50% + ${x}rem)`,
                top: `calc(50% + ${y}rem)`,
                animation: `pulse-subtle ${Math.random() * 2 + 2}s infinite ease-in-out`,
              }}
            />
          );
        })}
      </div>

      {/* Core orb */}
      <motion.div
        className={`relative w-40 h-40 md:w-60 md:h-60 rounded-full cursor-pointer
          ${isActive ? 'animate-glow' : isHovered ? 'animate-pulse-subtle' : ''}`}
        animate={{
          scale: isActive ? [1, 1.05, 1] : isHovered ? [1, 1.03, 1] : 1,
        }}
        transition={{
          duration: isActive ? 2 : isHovered ? 3 : 0,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsActive(!isActive)}
      >
        {/* Outer orb layer */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 opacity-70 animate-pulse-subtle" />
        
        {/* Middle layer with blur effect */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 opacity-80 backdrop-blur-md animate-float" />
        
        {/* Inner core */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-700 animate-pulse-reverse">
          {/* Light reflections */}
          <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 rounded-full bg-white/30 blur-sm"></div>
          <div className="absolute bottom-1/3 right-1/3 w-1/6 h-1/6 rounded-full bg-white/20 blur-sm"></div>
        </div>
        
        {/* Center glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white font-bold text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            LUMI AI
          </div>
        </div>
      </motion.div>

      {/* Horizontal AI Label */}
      <div className="absolute right-1/4 top-1/2 transform translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="text-blue-400 font-bold text-sm md:text-base"
          animate={{ y: isActive ? [0, -5, 0] : 0 }}
          transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
        >
          HORIZONTAL AI
        </motion.div>
      </div>

      {/* Vertical AI Label */}
      <div className="absolute left-1/2 top-1/4 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="text-purple-400 font-bold text-sm md:text-base"
          animate={{ y: isActive ? [0, -5, 0] : 0 }}
          transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
        >
          VERTICAL AI
        </motion.div>
      </div>

      {/* Optional UI overlay */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/50 pointer-events-none">
        Click the orb to activate
      </div>

      {/* Add these animation keyframes to globals.css */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes pulse-reverse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 25s linear infinite;
        }
        
        .animate-pulse-reverse {
          animation: pulse-reverse 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
