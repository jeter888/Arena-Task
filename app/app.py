# app.py
from flask import Flask, request
app = Flask(__name__)

@app.route('/')
def hello_world():
    print("testing print")
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
        print (userId)
        print (data)
        resp = make_response('{"test": "Successful Upload"}')
        resp.headers['Content-Type'] = "application/json"
        return resp

if __name__ == '__main__':
    app.run(port=81, debug=True) 