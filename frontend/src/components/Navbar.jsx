import { Activity, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="brand">
        <div className="brand-icon">
          <Activity size={18} />
        </div>

        <span>CardioPredict</span>
        <span className="brand-ai">AI</span>
      </div>

      <div className="nav-status">
        <span className="status-dot" />
        <span>MODEL ONLINE</span>
      </div>

      <div className="nav-security">
        <ShieldCheck size={15} />
        <span>AI ANALYSIS</span>
      </div>
    </motion.nav>
  );
}

export default Navbar;
