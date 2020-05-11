let appendSubjectToFile = () => {

    // Get the SONA ID text input from the form
    const name = document.getElementById('txtID');

    // This variable stores all the data.
    let data =
        '\r SONA ID: ' + name.value + ' \r\n ';



    // Convert the text to BLOB.
    const textToBLOB = new Blob([data], { type: 'text/plain' });

    //set the filename equal to the SONA ID (can change later)
    const sFileName = name.value;	   // The file to save the data.

    let newLink = document.createElement("a");
    newLink.setAttribute("src", "SONA data/");
    newLink.download = sFileName;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    }
    else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    newLink.click();

    //after sona data saves, redirect to experiment page
    window.location.assign("index.html");
    // drawArena();

}