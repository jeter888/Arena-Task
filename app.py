# app.py
from flask import Flask, request, render_template, make_response, jsonify
import sys

import glob
import pprint
app = Flask(__name__, static_url_path='/static')




def init_array():
    print("Init Array", file=sys.stderr)
    #print(glob.glob("/*"), file=sys.stderr)
    #print("Try /static/arena_scene_examples/", file=sys.stderr)
    #print(glob.glob("/static/arena_scene_examples/*"), file=sys.stderr)
    global urlDictionary
    if 'urlDictionary' not in globals():
        urlDictionary = {}

    

    i = 0
    for item in glob.glob("/static/arena_scene_examples/*"):
        #print(item, file=sys.stderr)
        urlDictionary[i]= item
        urlDictionary[item]= i
        i+=1
    print(urlDictionary, file=sys.stderr)

    #i is max
    global distanceMatrix
    if 'distanceMatrix' not in globals():
        distanceMatrix = [[-1 for row in range(i)] for column in range(i)]

    for row in distanceMatrix:
        print(row, file=sys.stderr)

def getDistance(x1, y1, x2, y2):
    #euclidean distance
    squared = (x1-x2)**2 + (y1-y2)**2
    return round(squared**(1/2), 2)

@app.route('/')
def start_program():
    init_array()
    return render_template('index.html')

    



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
        
        # Basic string build
        customString=""
        print('This is err output', file=sys.stderr)
        data = request.json
        for key, value in data.items():
            
            start = key.find("/static")
            newKey = key[start:]
            global urlDictionary
            index= urlDictionary[newKey]

            customString=customString+str(index)+ "-> ["
            for x in range(len(value)): 
                customString= customString+str(value[x])+","
            customString= customString+ "]\n"

        print("json: ", data, file=sys.stderr)
        print('Building simple response:', file=sys.stderr)
        print(customString, file=sys.stderr)

        #Updating the distance matrix
        for key, value in data.items():

            global distanceMatrix
            
            start = key.find("/static")
            newKey = key[start:]
            index= urlDictionary[newKey]

            for key2, value2 in data.items():
                if(key==key2):
                    print("continue",  file=sys.stderr)
                    continue
                start2 = key2.find("/static")
                newKey2 = key2[start:]
                index2= urlDictionary[newKey2]

                distance= getDistance(int(value[0]), int(value[1]), int(value2[0]), int(value2[1]))

                print("Disance between ",index," and ",index2,": ",distance, file=sys.stderr)
                distanceMatrix[index][index2]= distance
                distanceMatrix[index2][index]= distance



        """
        data = request.values
        print("values: "+data, file=sys.stderr)

        data = request.form
        print("json: "+data, file=sys.stderr)

        data = request.files
        print("values: "+data, file=sys.stderr)
        """

        for row in distanceMatrix:
            print(row, file=sys.stderr)

        print("Matrix printing: ", file=sys.stderr)
        print(str(distanceMatrix), file=sys.stderr)

        

        resp = make_response('{"test": "Successful Upload", "message": "'+customString+'", \
                "matrix": "'+ str(distanceMatrix) +'" }')
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