let message = document.getElementById('message').getAttribute('data-value');;
if(message!="") window.alert(message);

function verify(){
    var password = document.getElementById("pass").value;
    var confirmPassword = document.getElementById("confirmpass").value;
    if(password!=confirmPassword)
    {
        document.getElementById("warning").innerHTML="<p style='color: red;'>Password is not matching</p>";
    }
    else
    {
        document.getElementById("warning").innerHTML="";
    }
}