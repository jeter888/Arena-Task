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
 The Weakest" Algorithm in place of this. I have commented in the code where this should happen.