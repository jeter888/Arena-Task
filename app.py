# app.py
from flask import Flask, request
app = Flask(__name__)

@app.route('/')
def hello_world():
    #print("testing print")
    return 'Hello, World!'


""" @app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return do_the_login()
    else:
        return show_the_login_form() """


@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        userId = request.content_type
        data = request.body
        #print (userId)
        #print (data)
        return 'successful upload onto python'