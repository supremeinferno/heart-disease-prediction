from pathlib import Path

import joblib
import pandas as pd

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# --------------------------------------------------
# PATHS
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "models"


# --------------------------------------------------
# LOAD ML FILES
# --------------------------------------------------

model = joblib.load(MODEL_DIR / "SVC_model.joblib")
scaler = joblib.load(MODEL_DIR / "scaler.joblib")
expected_columns = joblib.load(MODEL_DIR / "columns.joblib")


# --------------------------------------------------
# FASTAPI APP
# --------------------------------------------------

app = FastAPI(
    title="CardioPredict AI API",
    description="Heart disease prediction API",
    version="1.0.0"
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# REQUEST MODEL
# --------------------------------------------------

class PatientData(BaseModel):

    age: int
    sex: str

    resting_bp: int
    cholesterol: int
    fasting_bs: int

    chest_pain: str
    resting_ecg: str

    max_hr: int
    exercise_angina: str

    oldpeak: float
    st_slope: str


# --------------------------------------------------
# HEALTH CHECK
# --------------------------------------------------

@app.get("/")
def root():

    return {
        "message": "CardioPredict AI API is running"
    }


@app.get("/api/health")
def health():

    return {
        "status": "healthy"
    }


# --------------------------------------------------
# PREDICTION
# --------------------------------------------------

@app.post("/api/predict")
def predict(data: PatientData):

    # ----------------------------------------------
    # Create input dictionary
    # ----------------------------------------------

    input_data = {
        col: 0
        for col in expected_columns
    }


    # ----------------------------------------------
    # Numerical Features
    # ----------------------------------------------

    input_data["Age"] = data.age

    input_data["RestingBP"] = data.resting_bp

    input_data["Cholesterol"] = data.cholesterol

    input_data["FastingBS"] = data.fasting_bs

    input_data["MaxHR"] = data.max_hr

    input_data["Oldpeak"] = data.oldpeak


    # ----------------------------------------------
    # Encoded Features
    # ----------------------------------------------

    if f"Sex_{data.sex}" in input_data:

        input_data[f"Sex_{data.sex}"] = 1


    if f"ChestPainType_{data.chest_pain}" in input_data:

        input_data[f"ChestPainType_{data.chest_pain}"] = 1


    if f"RestingECG_{data.resting_ecg}" in input_data:

        input_data[f"RestingECG_{data.resting_ecg}"] = 1


    if f"ExerciseAngina_{data.exercise_angina}" in input_data:

        input_data[f"ExerciseAngina_{data.exercise_angina}"] = 1


    if f"ST_Slope_{data.st_slope}" in input_data:

        input_data[f"ST_Slope_{data.st_slope}"] = 1


    # ----------------------------------------------
    # DataFrame
    # ----------------------------------------------

    input_df = pd.DataFrame(
        [input_data],
        columns=expected_columns
    )


    # ----------------------------------------------
    # Scaling
    # ----------------------------------------------

    scaled_input = scaler.transform(input_df)


    # ----------------------------------------------
    # Prediction
    # ----------------------------------------------

    prediction = model.predict(scaled_input)[0]

    probability = model.predict_proba(scaled_input)[0]


    # ----------------------------------------------
    # Probabilities
    # ----------------------------------------------

    risk_percentage = probability[1] * 100

    safe_percentage = probability[0] * 100


    # ----------------------------------------------
    # Response
    # ----------------------------------------------

    if prediction == 1:

        result = "High Risk"

        recommendations = [
            "Consult a cardiologist",
            "Monitor blood pressure regularly",
            "Reduce cholesterol intake",
            "Follow a healthy diet",
            "Exercise under medical guidance",
            "Avoid smoking"
        ]

    else:

        result = "Low Risk"

        recommendations = [
            "Continue healthy eating",
            "Stay physically active",
            "Maintain regular health checkups",
            "Monitor blood pressure regularly",
            "Maintain a healthy lifestyle"
        ]


    return {

        "prediction": int(prediction),

        "result": result,

        "risk_percentage": round(risk_percentage, 2),

        "safe_percentage": round(safe_percentage, 2),

        "recommendations": recommendations
    }