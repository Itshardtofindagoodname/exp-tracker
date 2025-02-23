from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pydantic import BaseModel
import os

app = FastAPI()

# Static folder tah mount korbo for the direct access to the html, css and js er files.
app.mount("/static", StaticFiles(directory="static"), name="static")

# localhost:8000 e direct access korte parbe index.html file ta
@app.get("/", response_class=HTMLResponse)
async def read_index():
    return FileResponse("static/index.html")

# MongoDB configuration (tor config tah use koris that you'll get from your MongoDB deployment)
uri = "uri"
client = MongoClient(uri, server_api=ServerApi('1'))

# Test MongoDB connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# Use (or create) a database and collection
db = client['expense_tracker']
collection = db['expenses']

# Define the Pydantic model for an expense ( akta model that is kind of like struct jeta sob field gulo declare korche jegulo database e store korbo amra )
class Expense(BaseModel):
    description: str
    amount: float
    type: str

# Notun expense add korar jonye akta endpoint
@app.post("/expenses")
async def add_expense(expense: Expense):
    expense_data = expense.dict()
    result = collection.insert_one(expense_data)
    return {"message": "Expense added", "id": str(result.inserted_id)}

# Sob expense gulo backend theke fetch korar endpoint
@app.get("/expenses")
async def get_expenses():
    # Retrieve expenses, excluding the MongoDB _id for simplicity
    expenses = list(collection.find({}, {"_id": 0}))
    total = 0
    for expense in expenses:
        if expense["type"] == "earned":
            total += expense["amount"]
        else:
            total -= expense["amount"]
    return {"expenses": expenses, "total": total}

# abare uvicorn diye backend tah run kor using:
#uvicorn main:app --reload
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
