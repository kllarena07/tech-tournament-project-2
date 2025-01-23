from flask import Flask
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
from os import environ
from flask import request, jsonify

app = Flask(__name__)
CORS(app)

load_dotenv()

GEMINI_API_KEY=environ["GEMINI_API_KEY"]

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel('gemini-1.5-flash')

@app.route('/chat', methods=['POST'])
def inference():
  data = request.get_json()
  message = data.get('message', '')
  
  if not message:
    return jsonify({'error': 'Message is required'}), 400
  
  response = model.generate_content(message)
  
  return jsonify({'response': response.text}), 200

if __name__ == '__main__':
  app.run(debug=True)