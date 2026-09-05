import { motion } from "framer-motion";

function Background() {
  return (
    <div className="background-layer">
      <div className="grid-overlay" />

      <motion.div
        className="orb orb-one"
        animate={{
          x: [0, 80, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="orb orb-two"
        animate={{
          x: [0, -70, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="noise-overlay" />
    </div>
  );
}

export default Background;
