import { ArrowDown, BrainCircuit, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function Hero() {
  const scrollToAnalysis = () => {
    document
      .getElementById("analysis")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <section className="hero">

      <motion.div
        className="hero-badge"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Sparkles size={14} />
        MACHINE LEARNING • CARDIOVASCULAR INTELLIGENCE
      </motion.div>


      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.8 }}
      >
        Understand your heart.
        <br />

        <span>Before it becomes a problem.</span>
      </motion.h1>


      <motion.p
        className="hero-description"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.7 }}
      >
        CardioPredict AI analyzes clinical parameters using a
        trained machine learning model to estimate cardiovascular
        risk in seconds.
      </motion.p>


      <motion.div
        className="hero-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
      >
        <button
          className="primary-button"
          onClick={scrollToAnalysis}
        >
          <BrainCircuit size={18} />

          Start Analysis

          <ArrowDown size={17} />
        </button>

        <div className="hero-note">
          Powered by an SVC classification model
        </div>
      </motion.div>


      <motion.div
        className="hero-stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >

        <div>
          <strong>11</strong>
          <span>Clinical Features</span>
        </div>

        <div>
          <strong>SVC</strong>
          <span>ML Classifier</span>
        </div>

        <div>
          <strong>AI</strong>
          <span>Risk Assessment</span>
        </div>

      </motion.div>

    </section>
  );
}

export default Hero;
