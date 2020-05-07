function WriteToFile(passForm) {

    var fso = CreateObject("Scripting.FileSystemObject");
    var s   = fso.CreateTextFile("SONA data/filename.txt", true);

    var firstName = document.getElementById('FirstName');
    var lastName  = document.getElementById('lastName');

    s.writeline("First Name :" + firstName);
    s.writeline("Last Name :" + lastName);

    s.writeline("-----------------------------");
    s.Close();
}