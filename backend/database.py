from sqlalchemy import create_engine, Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
import os
from dotenv import load_dotenv

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Many-to-Many Link: Assignment Table
task_assignments = Table(
    'task_assignments', Base.metadata,
    Column('user_id', ForeignKey('users.id'), primary_key=True),
    Column('task_id', ForeignKey('tasks.id'), primary_key=True)
)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    timezone = Column(String(100))

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200))
    description = Column(String(500))
    status = Column(String(50), default="To Do")
    
    assignees = relationship("User", secondary=task_assignments)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()