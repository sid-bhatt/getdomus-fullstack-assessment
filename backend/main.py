from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import User, get_db, Task
import pytz
from datetime import datetime
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_headers=["*"],
    allow_methods=["*"]
)

class TaskCreate(BaseModel):
    title: str
    description: str
    user_ids: List[int]

@app.get("/")
def home():
    return {"message": "MySQL connected and Tables created!"}


@app.get("/dashboard/")
def get_dashboard(db: Session = Depends(get_db)):
    tasks = db.query(Task).all()
    results = []
    for task in tasks:
        results.append({
            "title": task.title,
            "description": task.description,
            "status": task.status,
            "team": [
                {
                    "name": u.name,
                    "local_time": datetime.now(pytz.timezone(u.timezone)).strftime("%H:%M"),
                    "timezone": u.timezone
                } for u in task.assignees
            ]
        })
    return results

@app.post("/tasks/")
def create_task(task_data: TaskCreate, db: Session = Depends(get_db)):

    assignees = db.query(User).filter(User.id.in_(task_data.user_ids)).all()

    if len(assignees) != len(task_data.user_ids):
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid User IDs. Only found {len(assignees)} of {len(task_data.user_ids)} requested users."
        )
    
    new_task = Task(title=task_data.title, description=task_data.description)
    new_task.assignees = assignees
    
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@app.get("/tasks/")
def get_tasks(db: Session = Depends(get_db)):
    return db.query(Task).all()

@app.post("/users/")
def create_user(name: str, timezone: str, db: Session = Depends(get_db)):
    if timezone not in pytz.all_timezones:
        raise HTTPException(status_code=400, detail="Invalid Timezone")
    new_user = User(name=name, timezone=timezone)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.get("/users/")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@app.get("/timezones/")
def get_all_timezones():
    return pytz.all_timezones