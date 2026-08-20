import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';

function MovingStars() {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.x -= 0.0005;
    ref.current.rotation.y -= 0.0005;
  });
  return (
    <group ref={ref}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div className="relative w-full overflow-hidden bg-background">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 h-screen w-full">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <color attach="background" args={['#0a0a0a']} />
          <MovingStars />
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh position={[0, 0, -2]}>
              <sphereGeometry args={[1, 32, 32]} />
              <meshBasicMaterial color="#E50914" wireframe opacity={0.1} transparent />
            </mesh>
          </Float>
        </Canvas>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ y }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 tracking-tighter mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Cinema, <span className="text-primary">Redefined.</span>
          </motion.h1>
          
          <p className="text-xl md:text-2xl text-muted mb-10 font-light max-w-2xl mx-auto">
            Experience the future of movie discovery with our AI-powered recommendation engine and immersive 3D interface.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to={localStorage.getItem('token') ? "/home" : "/auth"} className="relative group px-8 py-4 bg-primary text-white font-bold rounded-full text-lg overflow-hidden transition-all hover:scale-105">
              <span className="relative z-10">Start Exploring</span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-primary to-[#ff4040] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </Link>
            <a href="#features" className="px-8 py-4 bg-white/10 text-white font-bold rounded-full text-lg backdrop-blur-sm hover:bg-white/20 transition-all">
              Learn More
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Aurora Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-50%] left-[-10%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/10 blur-[100px] mix-blend-screen"></div>
      </div>
    </div>
  );
};

export default LandingPage;
