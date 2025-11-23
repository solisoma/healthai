import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from openai import OpenAI
from dotenv import load_dotenv
from api.utils import HealthMetrics, calculate_bmi, calculate_bmr, calculate_tdee, get_prompt

load_dotenv()

app = FastAPI()    
client = OpenAI()

if os.getenv("NEXT_PUBLIC_IS_DOCKERIZED") == "true":
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

@app.post("/api/health-metrics")
def calculate_health_metrics(metrics: HealthMetrics):       
    # Calculate BMI
    bmi, category, status, ideal_min, ideal_max = calculate_bmi(metrics.height, metrics.weight)
    
    # Calculate BMR (Basal Metabolic Rate) - Mifflin-St Jeor Equation
    bmr = calculate_bmr(metrics.gender, metrics.weight, metrics.height, metrics.age)
    
    # Calculate TDEE (Total Daily Energy Expenditure)
    tdee = calculate_tdee(bmr, metrics.activity_level)
    
    # Generate AI personalized tips
    prompt = get_prompt(bmi, category, tdee, metrics)

    messages = [{"role": "user", "content": prompt}]
    stream = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        stream=True
    )
    
    # Prepare response with calculations and AI stream
    def event_stream():
        # Send calculations first
        yield f"data: {{'type': 'metrics', 'bmi': {bmi}, 'category': '{category}', 'status': '{status}', 'ideal_weight_min': {ideal_min}, 'ideal_weight_max': {ideal_max}, 'bmr': {round(bmr)}, 'tdee': {tdee}}}\n\n"
        
        # Then stream AI tips
        for chunk in stream:
            text = chunk.choices[0].delta.content
            if text:
                # Escape special characters for JSON
                text_escaped = text.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
                yield f"data: {{'type': 'ai_tip', 'content': \"{text_escaped}\"}}\n\n"
        
        yield "data: {'type': 'done'}\n\n"
    
    return StreamingResponse(event_stream(), media_type="text/event-stream")


@app.get("/api/health")
def health_check():
    return {"status": "ok"}