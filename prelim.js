function WriteToFile(passForm) {

    var fso = CreateObject("Scripting.FileSystemObject");
    var s   = fso.CreateTextFile("SONA data/filename.txt", true);

    var sonaID = document.getElementById('txtID');
    // var lastName  = document.getElementById('lastName');

    s.writeline("First Name :" + sonaID);
    // s.writeline("Last Name :" + lastName);

    s.writeline("-----------------------------");
    s.Close();
}