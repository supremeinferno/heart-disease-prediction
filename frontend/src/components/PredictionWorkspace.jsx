import { useState } from "react";
import {
  Activity,
  HeartPulse,
  BrainCircuit,
  LoaderCircle,
  ShieldCheck,
  AlertTriangle,
  Gauge,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialForm = {
  age: 40,
  sex: "M",
  resting_bp: 120,
  cholesterol: 200,
  fasting_bs: 0,
  chest_pain: "ATA",
  resting_ecg: "Normal",
  max_hr: 150,
  exercise_angina: "N",
  oldpeak: 1,
  st_slope: "Up",
};

function PredictionWorkspace() {
  const [formData, setFormData] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    const numericFields = [
      "age",
      "resting_bp",
      "cholesterol",
      "fasting_bs",
      "max_hr",
      "oldpeak",
    ];

    setFormData((previous) => ({
      ...previous,
      [name]: numericFields.includes(name)
        ? Number(value)
        : value,
    }));

    setResult(null);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await fetch(
        "/api/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Prediction failed.");
      }

      const data = await response.json();

      setResult(data);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to CardioPredict AI. Make sure the FastAPI server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setFormData(initialForm);
    setResult(null);
    setError("");
  };

  return (
    <section id="analysis" className="analysis-section">

      {/* SECTION HEADER */}

      <motion.div
        className="analysis-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-label">
          <Activity size={13} />
          AI RISK ANALYSIS
        </div>

        <h2>
          Clinical intelligence,
          <span> simplified.</span>
        </h2>

        <p>
          Enter the patient's clinical parameters and let the
          trained machine learning model estimate cardiovascular risk.
        </p>
      </motion.div>


      {/* WORKSPACE */}

      <div className="analysis-workspace">

        {/* INPUT PANEL */}

        <motion.div
          className="clinical-panel glass-panel"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >

          <div className="panel-header">

            <div className="panel-icon">
              <HeartPulse size={20} />
            </div>

            <div>
              <h3>Clinical Parameters</h3>

              <p>
                Patient information
              </p>
            </div>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="clinical-grid">

              {/* AGE */}

              <div className="modern-field">
                <label>Age</label>

                <div className="input-wrapper">
                  <input
                    type="number"
                    name="age"
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={handleChange}
                  />

                  <span>years</span>
                </div>
              </div>


              {/* SEX */}

              <div className="modern-field">
                <label>Sex</label>

                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>


              {/* BP */}

              <div className="modern-field">
                <label>Resting Blood Pressure</label>

                <div className="input-wrapper">
                  <input
                    type="number"
                    name="resting_bp"
                    min="80"
                    max="200"
                    value={formData.resting_bp}
                    onChange={handleChange}
                  />

                  <span>mmHg</span>
                </div>
              </div>


              {/* CHOLESTEROL */}

              <div className="modern-field">
                <label>Cholesterol</label>

                <div className="input-wrapper">
                  <input
                    type="number"
                    name="cholesterol"
                    min="100"
                    max="600"
                    value={formData.cholesterol}
                    onChange={handleChange}
                  />

                  <span>mg/dL</span>
                </div>
              </div>


              {/* FASTING BS */}

              <div className="modern-field">
                <label>Fasting Blood Sugar</label>

                <select
                  name="fasting_bs"
                  value={formData.fasting_bs}
                  onChange={handleChange}
                >
                  <option value={0}>
                    Normal
                  </option>

                  <option value={1}>
                    Above 120 mg/dL
                  </option>
                </select>
              </div>


              {/* CHEST PAIN */}

              <div className="modern-field">
                <label>Chest Pain Type</label>

                <select
                  name="chest_pain"
                  value={formData.chest_pain}
                  onChange={handleChange}
                >
                  <option value="ATA">
                    Atypical Angina
                  </option>

                  <option value="NAP">
                    Non-Anginal Pain
                  </option>

                  <option value="TA">
                    Typical Angina
                  </option>

                  <option value="ASY">
                    Asymptomatic
                  </option>
                </select>
              </div>


              {/* ECG */}

              <div className="modern-field">
                <label>Resting ECG</label>

                <select
                  name="resting_ecg"
                  value={formData.resting_ecg}
                  onChange={handleChange}
                >
                  <option value="Normal">
                    Normal
                  </option>

                  <option value="ST">
                    ST-T Abnormality
                  </option>

                  <option value="LVH">
                    LV Hypertrophy
                  </option>
                </select>
              </div>


              {/* MAX HR */}

              <div className="modern-field">
                <label>Maximum Heart Rate</label>

                <div className="input-wrapper">
                  <input
                    type="number"
                    name="max_hr"
                    min="60"
                    max="220"
                    value={formData.max_hr}
                    onChange={handleChange}
                  />

                  <span>bpm</span>
                </div>
              </div>


              {/* EXERCISE ANGINA */}

              <div className="modern-field">
                <label>Exercise Angina</label>

                <select
                  name="exercise_angina"
                  value={formData.exercise_angina}
                  onChange={handleChange}
                >
                  <option value="N">No</option>
                  <option value="Y">Yes</option>
                </select>
              </div>


              {/* OLDPEAK */}

              <div className="modern-field">
                <label>ST Depression</label>

                <div className="input-wrapper">
                  <input
                    type="number"
                    name="oldpeak"
                    min="0"
                    max="6"
                    step="0.1"
                    value={formData.oldpeak}
                    onChange={handleChange}
                  />

                  <span>Oldpeak</span>
                </div>
              </div>


              {/* ST SLOPE */}

              <div className="modern-field">
                <label>ST Slope</label>

                <select
                  name="st_slope"
                  value={formData.st_slope}
                  onChange={handleChange}
                >
                  <option value="Up">Up</option>
                  <option value="Flat">Flat</option>
                  <option value="Down">Down</option>
                </select>
              </div>

            </div>


            {/* BUTTON */}

            <motion.button
              className="analyze-button"
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.015 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >

              {loading ? (
                <>
                  <LoaderCircle
                    size={19}
                    className="spin"
                  />

                  Analyzing Clinical Data...
                </>
              ) : (
                <>
                  <BrainCircuit size={19} />

                  Run AI Analysis
                </>
              )}

            </motion.button>

          </form>


          <div className="model-info">

            <span>
              <ShieldCheck size={13} />
              Secure local inference
            </span>

            <span>
              SVC CLASSIFIER
            </span>

          </div>

        </motion.div>


        {/* RESULT PANEL */}

        <motion.div
          className="result-panel glass-panel"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >

          <AnimatePresence mode="wait">

            {!result && !loading && !error && (

              <motion.div
                className="empty-result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >

                <div className="empty-icon">
                  <Gauge size={30} />
                </div>

                <span>AI RISK INTELLIGENCE</span>

                <h3>
                  Awaiting analysis
                </h3>

                <p>
                  Complete the clinical parameters and
                  run the AI analysis to generate a cardiovascular
                  risk assessment.
                </p>

                <div className="result-line" />

                <div className="result-meta">
                  <span>MODEL</span>
                  <strong>SVC</strong>

                  <span>FEATURES</span>
                  <strong>11</strong>
                </div>

              </motion.div>

            )}


            {loading && (

              <motion.div
                className="loading-result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >

                <div className="analysis-loader">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <BrainCircuit size={42} />
                  </motion.div>
                </div>

                <span>PROCESSING</span>

                <h3>
                  Analyzing clinical data
                </h3>

                <p>
                  Scaling features and running the
                  SVC classification model...
                </p>

              </motion.div>

            )}


            {error && (

              <motion.div
                className="error-result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >

                <AlertTriangle size={40} />

                <h3>
                  Analysis unavailable
                </h3>

                <p>{error}</p>

              </motion.div>

            )}


            {result && !loading && (

              <RiskResult
                result={result}
                onReset={resetAnalysis}
              />

            )}

          </AnimatePresence>

        </motion.div>

      </div>

    </section>
  );
}


function RiskResult({ result, onReset }) {

  const isHighRisk = result.prediction === 1;

  const percentage = isHighRisk
    ? result.risk_percentage
    : result.safe_percentage;

  return (
    <motion.div
      className="risk-result"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >

      <div className="result-top">

        <div>
          <span className="result-label">
            ANALYSIS COMPLETE
          </span>

          <h3>
            Risk Intelligence
          </h3>
        </div>

        <div
          className={
            isHighRisk
              ? "result-status high"
              : "result-status low"
          }
        >
          {isHighRisk ? "HIGH RISK" : "LOW RISK"}
        </div>

      </div>


      {/* GAUGE */}

      <div className="risk-gauge">

        <svg viewBox="0 0 200 120">

          <path
            className="gauge-background"
            d="M 25 100 A 75 75 0 0 1 175 100"
          />

          <motion.path
            className={
              isHighRisk
                ? "gauge-progress high"
                : "gauge-progress low"
            }
            d="M 25 100 A 75 75 0 0 1 175 100"
            initial={{
              pathLength: 0,
            }}
            animate={{
              pathLength: percentage / 100,
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
          />

        </svg>

        <div className="gauge-value">

          <motion.strong
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {percentage.toFixed(2)}%
          </motion.strong>

          <span>
            {isHighRisk
              ? "Risk Probability"
              : "Healthy Probability"}
          </span>

        </div>

      </div>


      {/* METRICS */}

      <div className="result-metrics">

        <div>
          <span>HEART DISEASE RISK</span>
          <strong>{result.risk_percentage}%</strong>
        </div>

        <div>
          <span>HEALTHY PROBABILITY</span>
          <strong>{result.safe_percentage}%</strong>
        </div>

      </div>


      {/* STATUS */}

      <div
        className={
          isHighRisk
            ? "result-message high"
            : "result-message low"
        }
      >

        {isHighRisk ? (
          <>
            <AlertTriangle size={19} />

            <div>
              <strong>
                Elevated cardiovascular risk detected
              </strong>

              <p>
                The model indicates a higher probability
                of heart disease based on the supplied parameters.
              </p>
            </div>
          </>
        ) : (
          <>
            <ShieldCheck size={19} />

            <div>
              <strong>
                Lower cardiovascular risk detected
              </strong>

              <p>
                The model indicates a lower probability
                of heart disease based on the supplied parameters.
              </p>
            </div>
          </>
        )}

      </div>


      {/* RECOMMENDATIONS */}

      <div className="recommendations-modern">

        <div className="recommendation-heading">
          <span>AI GUIDANCE</span>
          <small>GENERAL INFORMATION</small>
        </div>

        <ul>

          {result.recommendations.map(
            (recommendation, index) => (

              <motion.li
                key={index}
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.9 + index * 0.1,
                }}
              >
                <span className="recommendation-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {recommendation}
              </motion.li>

            )
          )}

        </ul>

      </div>


      <button
        className="reset-button"
        onClick={onReset}
      >
        Run Another Analysis
      </button>


      <p className="medical-disclaimer">
        This AI prediction is for informational purposes only
        and should not replace professional medical advice.
      </p>

    </motion.div>
  );
}

export default PredictionWorkspace;