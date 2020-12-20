# app.py
from flask import Flask, request, render_template, make_response, jsonify
import sys
app = Flask(__name__, static_url_path='/static')





@app.route('/')
def start_program():
    return render_template('index.html')
""" f = open("sampleFile.txt", "a")
    f.write("testing print\n")
    f.close() """
    



""" 

@app.route('/')
def hello_world():
    f = open("../sampleFile.txt", "a")
    f.write("testing print\n")
    f.close()
    return "Hello, World"
    
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return do_the_login()
    else:
        return show_the_login_form() """


@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        #print(request, flush = True);
        
        #data = "data"
        customString=""
        print('This is err output', file=sys.stderr)
        data = request.json
        for key, value in data.items():
            
            print(key, ' :', value, file=sys.stderr)
            customString=customString+key+ "-> ["
            print('print before values: ',customString, file=sys.stderr)
            for x in range(len(value)): 
                print('finding value: ',value[x], file=sys.stderr)
                customString= customString+str(value[x])+","
            customString= customString+ "]\n"

        print("json: ", data, file=sys.stderr)
        print('Done building response:', file=sys.stderr)
        print(customString, file=sys.stderr)

        """
        data = request.values
        print("values: "+data, file=sys.stderr)

        data = request.form
        print("json: "+data, file=sys.stderr)

        data = request.files
        print("values: "+data, file=sys.stderr)
        """


        resp = make_response('{"test": "Successful Upload", "message": "'+customString+'" }')
        """
        data = "data"
        resp = make_response(
            jsonify({"test": "Successful Upload", 
                    "userID": data})
        )
        """
        return resp

        '''
        userId = request.content_type
        data = request.body

        """
        f = open("../sampleFile.txt", "a")

        f.write("userId: " + userId+ "\n")
        f.write("data: " + data + "\n")
        f.close()
        """

        resp = make_response('{"test": "Successful Upload"}')
        resp.headers['Content-Type'] = "application/json"
        return resp

        '''

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)

""" if __name__ == '__main__':
    app.run(host='192.168.99.100', port=82, threaded=True)  """