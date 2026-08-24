from pathlib import Path

import json
import joblib
import pandas as pd


BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "models"


model = joblib.load(MODEL_DIR / "SVC_model.joblib")
scaler = joblib.load(MODEL_DIR / "scaler.joblib")
expected_columns = joblib.load(MODEL_DIR / "columns.joblib")



def handler(request):

    if request.method != "POST":
        return {
            "error": "Only POST allowed"
        }


    data = json.loads(request.body)


    input_data = {
        col:0
        for col in expected_columns
    }


    input_data["Age"] = data["age"]
    input_data["RestingBP"] = data["resting_bp"]
    input_data["Cholesterol"] = data["cholesterol"]
    input_data["FastingBS"] = data["fasting_bs"]
    input_data["MaxHR"] = data["max_hr"]
    input_data["Oldpeak"] = data["oldpeak"]



    mappings = [
        ("Sex", "sex"),
        ("ChestPainType", "chest_pain"),
        ("RestingECG", "resting_ecg"),
        ("ExerciseAngina", "exercise_angina"),
        ("ST_Slope", "st_slope")
    ]


    for prefix, key in mappings:

        column = f"{prefix}_{data[key]}"

        if column in input_data:
            input_data[column] = 1



    input_df = pd.DataFrame(
        [input_data],
        columns=expected_columns
    )


    scaled_input = scaler.transform(input_df)


    prediction = model.predict(scaled_input)[0]

    probability = model.predict_proba(scaled_input)[0]


    risk_percentage = probability[1]*100
    safe_percentage = probability[0]*100



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
        "risk_percentage": round(risk_percentage,2),
        "safe_percentage": round(safe_percentage,2),
        "recommendations": recommendations
    }