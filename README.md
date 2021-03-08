# Arena-Task- UPDATED INSTRUCTIONS (6/12/20)
To open the Arena Task (version2), clone or download/extract the zip file of this project and open *index.html* to begin the task. This
 currently works
 best in Firefox.

*Differences from Master branch*: There is no longer a need for *prelim.js* and *index_prelim.html* for this version since the SONA data retrieval is
 now combined into *index.html* and *arena.js*.
 
In the master version, with every trial submission during the task, a text file will be locally downloaded with each trial containing
 metadata (scene path and corresponding coordinates). In this version, we are working on getting a single text file to be downloaded at the end of the
  final trial, containing all trial data
  (the number of trials may be dependent on the Lift-the-Weakest Algorithm which has not yet been implemented).

Once the task is hooked up to a server, the text file will need to be saved to the experimenter's folder "SONA_data" found in the project files.

Currently, a new random set of scenes are generated from trial to trial. We will later have to implement the "Lift
The Weakest" Algorithm in place of this. I have commented in the code where
this should happen.
 

 # Arena-Task- Flask Implementation (3/8/21)
In order to use python on the data, we chose to host the wesite using
Flask, a free python repository. This allows us to do easy POST and GET
requests to the back end.

In order to get this to work we MUST use the following file structure:

|- matrices
    -sampleMatrix.txt
|- static 
    -arena_scene_ecamples (subfolder with images)
    -scripts (subfolder with all java script)
    -styles (subfolder with all css files)
|- templates (all html files)
    -index.html 
|- docker-compose.yml (sets up volumes and easy docker-compose command)
|- dockerfile (sets up the docker hosting)
|- requirements.txt (for the dockerfile)
|- app.py (manages the server)


In order to add new files in html a special url is used:
href="{{ url_for('static',filename='styles/titatoggle-dist.css') }}
To reach a url, you chose 'staic' for all the js and cc, then you enter the
url with respect to the static folder.

Commands to run:
1) Naviage to the repository with the most up to date code.

2)  Build and run the docker image
  Command: docker-compuse up --build
    This docker-compose notation allows use to use volumes which are used as
    a pipe from the python to the sampleMatrix.txt. This allows us to write
    to the file.
    The docker-compose file defines the port we will use, 82.
    The python defines the port it works in (at the bottom), 80.

    --build is curcial to build the most up to date image with the code updated
    in whatever local repository. This will use the LOCAL code, not code on
    github so make sure to pull from the branch first.

    The terminal then displays any python error messages, useful for debugging

-------------------------------------------------------------------------
OLD COMMANDS for before volumes were implemented. This is for any builds in
2020.
2b) Build the image for docker to run 
  Command: docker build -t arenatask .   
The period is important, it specifies you are running it from thecurrent directory.

3b) run the image with docker  
  Command: docker run -p 82:80 -d arenatask:latest 
   -p allows you to specify the port. Port 82 is your choice for where to
   send the site. You can't have two images running on the same port.
   80 is the "host" port defined in app.py

   -d allows you to run it in detached. This means thei mage will keep
   running even if you close you terminal.

---------------------------------------------------------------

4) View the site:
http://192.168.99.100:82/

5) Using the docker-compose command means we dont have to stop the image.
   Else refer to "container stop" and "container rm" below

# Arena-Task- Useful Docker Commands 
docker ps  (lets you see all running images and their ids)
docker logs [container id]   (get a list of logs to see whats happening)

docker container stop $(docker container ls -aq)
docker container rm $(docker container ls -aq)
^These commands allow you to stop and remove the container so you can run a
new version. $(docker container ls -aq) gets a list of container ids

# Error code 1, no space left on device: 
If you ever get this error it's probably because you've rebuild the project
many times. Use the command below to clear unusued space then rebuild the
project.

docker image prune -f


# POST commands used in python

url/updload - This url uploads all the image locations and updates the
matrix. 

url/drawImages - This gets new images to be placed by the user based on the
current matrix. Currently is NOT random and is biased