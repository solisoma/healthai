import json
from pydantic import BaseModel

class HealthMetrics(BaseModel):
    height: float
    weight: float
    age: int
    gender: str
    activity_level: str

ACTIVITY_MULTIPLIERS = {
    "sedentary": 1.2,
    "light": 1.375,
    "moderate": 1.55,
    "active": 1.725,
    "very_active": 1.9
}

def calculate_bmi(height: float, weight: float) -> tuple[float, str, str, float, float]:
    height_m = height / 100
    bmi = round(weight / (height_m ** 2), 1)
    
    # Determine BMI category
    if bmi < 18.5:
        category = "Underweight"
        status = "⚠️"
    elif 18.5 <= bmi < 25:
        category = "Normal weight"
        status = "✅"
    elif 25 <= bmi < 30:
        category = "Overweight"
        status = "⚠️"
    else:
        category = "Obese"
        status = "❌"
    
    # Calculate ideal weight range (using BMI 18.5-24.9)
    ideal_min = round(18.5 * (height_m ** 2), 1)
    ideal_max = round(24.9 * (height_m ** 2), 1)

    return bmi, category, status, ideal_min, ideal_max

def calculate_bmr(gender: str, weight: float, height: float, age: int) -> float:
    if gender.lower() == "male":
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    else:
        bmr = 10 * weight + 6.25 * height - 5 * age - 161

    return bmr

def calculate_tdee(bmr: float, activity_level: str) -> float:
    return round(bmr * ACTIVITY_MULTIPLIERS.get(activity_level, 1.2))

def serialize_data(message_type: str, content: str|dict, is_dict: bool = False) -> str:
    if is_dict:
        data = {f"{key}": value for key, value in content.items()}
        return f"data: {json.dumps({
            "type": message_type,
            **data
        })}\n\n"
    else:
        return f"data: {json.dumps({'type': message_type, 'content': content})}\n\n"

def get_prompt(bmi: str, category: str, tdee: float, metrics: HealthMetrics) -> str:
    return f"""You are a health and wellness advisor. Based on these health metrics, provide personalized, actionable health advice:
- BMI: {bmi} ({category})
- Age: {metrics.age}
- Gender: {metrics.gender}
- Activity Level: {metrics.activity_level}
- Daily Calorie Needs: {tdee} calories

Provide:
1. Brief assessment (2-3 sentences)
2. 3-4 specific, actionable health tips
3. Dietary recommendations
4. Exercise suggestions

Keep it encouraging, practical, and evidence-based. Format with clear headings and bullet points.
IMPORTANT: Start with a medical disclaimer that this is educational only and not medical advice.
"""
