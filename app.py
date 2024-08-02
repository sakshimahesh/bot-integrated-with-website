
from flask import Flask, request, jsonify
from train_trial import chat_response    
from flask_cors import CORS


app = Flask(__name__)
CORS(app) #resources sharing


@app.post("/predict") #host
def predict():
    text = request.get_json().get("message") #from javascript
    response = chat_response(text)
    message = {"answer": response}
    return jsonify(message)
    
if __name__ == "__main__": #from train.ipynb
    app.run(debug =True) #for testing
    