let appendSubjectToFile = () => {

    // Get the SONA ID text input from the form
    const name = document.getElementById('txtID');

    // This variable stores all the data.
    let data =
        '\r SONA ID: ' + name.value + ' \r\n ';


    // Convert the text to BLOB.
    const textToBLOB = new Blob([data], {type: 'text/plain'});

    //set the filename equal to the SONA ID (can change later)
    const sFileName = name.value;	   // The file to save the data.

    let newLink = document.createElement("a");
    //#FIXME: commented this last section out to download file for later. For now, values are stored in variables
    // newLink.download = sFileName;
    //
    // if (window.webkitURL != null) {
    //     newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    // } else {
    //     newLink.href = window.URL.createObjectURL(textToBLOB);
    //     newLink.style.display = "none";
    //     document.body.appendChild(newLink);
    // }
    //
    // newLink.click();
    window.location.assign("index.html");
}

//     const fs = require('fs');
//
// // specify the path to the file, and create a buffer with characters we want to write
//     let path = 'SONA_data/';
//     let buffer = new Buffer('Those who wish to follow me\nI welcome with my hands\nAnd the red sun sinks at last');
//     fs.open(path, 'w', function(err, fd) {
//         if (err) {
//             throw 'could not open file: ' + err;
//         }
//         fs.write(fd, buffer, 0, buffer.length, null, function(err) {
//             if (err) throw 'error writing file: ' + err;
//             fs.close(fd, function() {
//                 console.log('wrote the file successfully');
//             });
//         });
//     });
//
//
//     //after sona data saves, redirect to experiment page
//     window.location.assign("index.html");
//     // drawArena();
//
// }