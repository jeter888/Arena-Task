# app.py
from flask import Flask, request, render_template, make_response, jsonify
import sys
import json
import glob
import pprint
app = Flask(__name__, static_url_path='/static')




def init_array():
    print("Init Array", file=sys.stderr)
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
    distanceMatrix = [[0 for row in range(i)] for column in range(i)]

    global weightMatrix
    weightMatrix = [[0 for row in range(i)] for column in range(i)]


    fileName= "/matrices/sampleMatrix.txt"
    print("Final path chosen: ",fileName, file=sys.stderr)

    try:
        #WRITE
        matrixFile= open(fileName, "r+")

        #Clears the file for every new session
        matrixFile.truncate(0)
        matrixFile.write("Empty Matrix, no data: \n")
        matrixFile.write(str(distanceMatrix))

        matrixFile.write("\n Evidence Weight Matrix: \n")
        matrixFile.write(str(weightMatrix))
        matrixFile.close()

        #READ
        matrixFile= open(fileName, "r+")
        print(matrixFile.read(), file=sys.stderr)
        matrixFile.close()   
    except:
        print("cant open file", file=sys.stderr)





def getDistance(x1, y1, x2, y2):
    #euclidean distance
    squared = (x1-x2)**2 + (y1-y2)**2
    return round(squared**(1/2), 2)





@app.route('/')
def start_program():
    init_array()
    return render_template('index.html')

    


@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        
        # Basic string build
        customString=""
        print('Request data: ', request.get_json(), file=sys.stderr)
        body = request.get_json()
        data = body.get('data')
        userID = body.get('user')
        
        print('user: ', userID, file=sys.stderr)

        print("json: ", data, file=sys.stderr)

        for key, value in data.items():
            
            start = key.find("/static")
            newKey = key[start:]
            global urlDictionary
            index= urlDictionary[newKey]

            customString=customString+str(index)+ "-> ["
            for x in range(len(value)): 
                customString= customString+str(value[x])+","
            customString= customString+ "]\n"

        
        print('Building simple response:', file=sys.stderr)
        print(customString, file=sys.stderr)

        #Updating the distance matrix
        for key, value in data.items():

            global distanceMatrix
            global weightMatrix
            
            start = key.find("/static")
            newKey = key[start:]
            index= urlDictionary[newKey]

            for key2, value2 in data.items():
                if(key==key2):
                    continue
                start2 = key2.find("/static")
                newKey2 = key2[start2:]
                index2= urlDictionary[newKey2]

                distance= getDistance(int(value[0]), int(value[1]), int(value2[0]), int(value2[1]))

                print("Distance between ",index," and ",index2,": ",distance, file=sys.stderr)
                curr_mean = distanceMatrix[index][index2]
                curr_mean= curr_mean * weightMatrix[index][index2]
                curr_mean += distance
                curr_mean /= (weightMatrix[index][index2] + 1)
                print("Weighted mean of ",index," and ",index2," on trial",weightMatrix[index][index2]+1, "is: ",curr_mean, file=sys.stderr)
                distanceMatrix[index][index2]= curr_mean
                weightMatrix[index][index2] += 1


        
        fileName= "/matrices/sampleMatrix.txt"
        print("Final path chosen: ",fileName, file=sys.stderr)
        
        #WRITE
        matrixFile= open(fileName, "r+")
        matrixFile.write(userID+": \n")
        matrixFile.write(str(distanceMatrix))

        matrixFile.write("\n\n\nEvidence Weight Matrix: \n")
        matrixFile.write(str(weightMatrix))

        print("wrote to: ",fileName, file=sys.stderr)
        matrixFile.close()


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








@app.route('/drawImages', methods=['GET', 'POST'])
def getImages():
    if request.method == 'POST':
        
        # Basic string build
        print('Request data: ', request.get_json(), file=sys.stderr)
        body = request.get_json()
        incomingMessage = body.get('userImages')
        
        print('user: ', incomingMessage, file=sys.stderr)

        global distanceMatrix
        global weightMatrix
        global urlDictionary
        returnIndex = []

        #
        #   Choosing the images to put in the arena
        #
        imagesCount = 15
        print("Len distance matrix: ", len(distanceMatrix))
        for i in range(0,len(distanceMatrix)):
            for j in range(0,len(distanceMatrix[i])):

                #
                #   choosing images from which we can learn the most information
                #
                if weightMatrix[i][j]== 0:
                    if len(returnIndex) == 0:
                        returnIndex.append(i)
                        imagesCount-=1
                    if j not in returnIndex and imagesCount>0:
                        returnIndex.append(j)
                        imagesCount-=1
                
                if imagesCount == 0:
                    break
            if imagesCount<=0:
                break

        
        print(returnIndex, file=sys.stderr)
        returnUrls=[]
        for i in returnIndex:
            returnUrls.append(urlDictionary.get(i))

        
        customString='\"urls\": {'
        count = 1
        for urls in returnUrls:
            if count>1:
                customString+=',\n '
            customString+= '\"url'+str(count)+'\": \"' 
            customString+= str(urls) + '\"'
            count+=1

        customString+='}'
        print(customString, file=sys.stderr)



        resp = make_response('{"test": "Successful drawImages Call", '+customString+'}')

        return resp



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)

""" if __name__ == '__main__':
    app.run(host='192.168.99.100', port=82, threaded=True)  """