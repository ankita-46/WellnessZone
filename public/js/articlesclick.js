var check = document.getElementById("disablingbtn");
var reviewbtn = document.getElementById("reviewbtn");

if(check.innerText=='false')
{
    reviewbtn.style.display="none";
}

var paratext = document.getElementById(`articlespara0`);
var i = 1;
while(paratext.innerText){
    var lengthofpara = paratext.innerText;
    if(lengthofpara.length>400)
    paratext.innerText = lengthofpara.substring(0, 400)+'...';
    paratext = document.getElementById(`articlespara${i}`);
    i++;
}

function submitform(index){
    var form = document.getElementById(`articleclick${index}`);
    form.submit();
}