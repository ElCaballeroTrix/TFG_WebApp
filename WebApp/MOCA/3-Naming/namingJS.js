var canvas, ctx;
var image=new Image();
var text1=document.getElementById("Text1");
var text2=document.getElementById("Text2");
var text3=document.getElementById("Text3");
var user=null;

var timeSpent=0;
var timerCountUp=null;
timeSpendInTest();
function timeSpendInTest(){
    timerCountUp=setInterval(()=>{
        timeSpent++;
    },1000);
}
//---
obtainUserName();
init();
image.onload=()=>{
    ctx.drawImage(image,0,0,canvas.width,canvas.height);
};
image.src="naming.png";
function init() {
    canvas = document.getElementById("canvas");
    canvas.width=window.innerWidth-20;
    canvas.height=window.innerHeight/1.5;
    ctx = canvas.getContext("2d");
    console.log(canvas)
    w = canvas.width;
    h = canvas.height;
}




function saveAnswers(){
    var confirm=window.confirm("¿Desea continuar?");
    if (confirm === true) {
        if(text1.value=="" || text2.value=="" ||text3.value==""){
            window.alert("Escriba el nombre de todos los dibujos")
        }
        else{
                conectionREST();
                new Audio("click.wav").play();
                setTimeout(()=>{
                    window.location.href = "../4-Memory/memoryHTML.html?user="+user;
                },300);
            }
    }
}

function obtainUserName(){
    var paramstr = window.location.search.substr(1);
    var paramarr = paramstr.split ("&");
    var params = {};

    for ( var i = 0; i < paramarr.length; i++) {
        var tmparr = paramarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    user=params['user'];
}

function conectionREST(){
    fetch("http://localhost:8080/api/user/moca",
    {
        method:'POST',
        body:JSON.stringify({
            MOCA3:{
                "usuario":user,
                "tiempo":timeSpent,
                "imagenIzq":text1.value,
                "imagenCentro":text2.value,
                "imagenDer":text3.value
            }
        }),
        headers:{
            "Content-type":"application/json"
        }
    }).then(response=>response.json());   
}