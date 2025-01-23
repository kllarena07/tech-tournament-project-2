import google.generativeai as genai
from dotenv import load_dotenv
from os import environ

load_dotenv()

GEMINI_API_KEY=environ["GEMINI_API_KEY"]

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel('gemini-1.5-flash')
response = model.generate_content("Hello, how are you doing?")
print(response.text)