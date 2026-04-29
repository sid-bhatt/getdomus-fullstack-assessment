from database import engine, Base

print("Connecting to database and creating tables...")
Base.metadata.create_all(bind=engine)
print("Done! Check MySQL Workbench now.")