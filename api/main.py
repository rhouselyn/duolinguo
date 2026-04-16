from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import json
import uuid
from datetime import datetime

app = FastAPI()

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 确保数据目录存在
data_dir = "/workspace/data"
os.makedirs(data_dir, exist_ok=True)
os.makedirs(os.path.join(data_dir, "languages"), exist_ok=True)
os.makedirs(os.path.join(data_dir, "files"), exist_ok=True)

# 模拟数据
mock_word_detail = {
    "word": "example",
    "ipa": "/ɪɡˈzæmpəl/",
    "context_meaning": "an instance or illustration",
    "variants": ["examples", "exemplary"],
    "difficulty": 1,
    "source_sentence_ids": [0, 3, 7]
}

mock_distractors = ["sample", "instance", "illustration", "demonstration"]

mock_examples = [
    "This is an example of good writing.",
    "Can you give me an example?",
    "The teacher provided several examples to explain the concept."
]

mock_cloze = {
    "sentence": "This is an [example] of a cloze exercise.",
    "blank": "example",
    "options": ["example", "sample", "instance", "illustration"]
}

mock_pronunciation_notes = "English pronunciation rules: Vowels are pronounced differently in stressed and unstressed syllables."

# 模型定义
class DistractorRequest(BaseModel):
    word: str
    correct_answer: str
    count: int

class ExampleRequest(BaseModel):
    word: str
    count: int

class ClozeRequest(BaseModel):
    sentence: str

class PronunciationRequest(BaseModel):
    language: str

class ExerciseRequest(BaseModel):
    current_progress: dict = None

# API端点
@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    # 生成唯一文件ID
    file_id = str(uuid.uuid4())
    # 创建文件目录
    file_dir = os.path.join(data_dir, "files", file_id)
    os.makedirs(file_dir, exist_ok=True)
    # 保存文件
    file_path = os.path.join(file_dir, file.filename)
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    # 返回文件ID
    return {"file_id": file_id, "status": "uploaded"}

@app.get("/api/pipeline/{file_id}/status")
async def get_pipeline_status(file_id: str):
    # 模拟处理状态
    return {
        "status": "completed",
        "progress": 100,
        "data": {
            "words": 20,
            "sentences": 10,
            "processed": True
        }
    }

@app.post("/api/learn/{file_id}/stage/{stage}/next")
async def get_next_exercise(file_id: str, stage: int, request: ExerciseRequest):
    # 模拟返回练习
    return {
        "exercise": {
            "type": "multiple_choice",
            "question": "What is the meaning of 'example'?",
            "options": ["例子", "样本", "实例", "演示"],
            "correct_answer": "例子"
        },
        "progress": {
            "current_module": 1,
            "current_word": 5,
            "total_words": 8
        }
    }

@app.get("/api/agent/word_detail/{word_id}")
async def get_word_detail(word_id: str):
    # 模拟返回单词详情
    return mock_word_detail

@app.post("/api/agent/generate_distractors")
async def generate_distractors(request: DistractorRequest):
    # 模拟返回干扰项
    return {"distractors": mock_distractors[:request.count]}

@app.post("/api/agent/generate_examples")
async def generate_examples(request: ExampleRequest):
    # 模拟返回例句
    return {"examples": mock_examples[:request.count]}

@app.post("/api/agent/generate_cloze")
async def generate_cloze(request: ClozeRequest):
    # 模拟返回完形填空
    return {"cloze": mock_cloze}

@app.post("/api/agent/generate_pronunciation_notes")
async def generate_pronunciation_notes(request: PronunciationRequest):
    # 模拟返回发音规则
    return {"notes": mock_pronunciation_notes}

@app.post("/api/speech/evaluate")
async def evaluate_speech(file: UploadFile = File(...)):
    # 模拟语音评估
    return {
        "score": 85,
        "feedback": "Good pronunciation! Try to improve the stress on the second syllable."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)