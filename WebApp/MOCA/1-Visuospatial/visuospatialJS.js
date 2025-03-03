var canvas, ctx, flag = false,
prevX = 0,
currX = 0,
prevY = 0,
currY = 0,
dot_flag = false;

var x = "black",
y = 3;
var imageLeft=new Image();
var imageRight=new Image();
var user=null;

//https://stackoverflow.com/questions/2368784/draw-on-html5-canvas-using-a-mouse
//Calcute time spend in activity
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
imageLeft.onload=()=>{
    ctx.drawImage(imageLeft,0,2,canvas.width/2,canvas.height);
};
imageRight.onload=()=>{
    ctx.drawImage(imageRight,canvas.width/2,0,canvas.width/2,canvas.height);
}
imageLeft.src="grafo.png";
imageRight.src="cubo.png"
function init() {
    canvas = document.getElementById("canvas");
    canvas.width=window.innerWidth-20;
    canvas.height=window.innerHeight/1.5;
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;
    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}


function draw() {
ctx.beginPath();
ctx.moveTo(prevX, prevY);
ctx.lineTo(currX, currY);
ctx.strokeStyle = x;
ctx.lineWidth = y;
ctx.stroke();
ctx.closePath();
}
function erase() {
    var m = confirm("¿Estas seguro que quieres borrar el dibujo?");
    if (m) {
        ctx.clearRect(0, 0, w, h);
    }
    ctx.drawImage(imageLeft,0,2,canvas.width/2,canvas.height);
    ctx.drawImage(imageRight,canvas.width/2,0,canvas.width/2,canvas.height);
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}


function saveCanvas(){
    var confirm=window.confirm("¿Desea continuar?");
    if (confirm === true) {
        /* var link = document.getElementById('link');
        link.setAttribute('download', 'Dibujo1Parte.png');
        link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
        console.log(link.href);  */ 
        conectionREST();  
        new Audio("click.wav").play();
        setTimeout(()=>{
            window.location.href = "../2-DrawClock/clockHTML.html?user="+user;
        },300);
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
    const reader = new FileReader();
    canvas.toBlob(function(blob){
        var dibujo;
        reader.readAsDataURL(blob); 
        reader.onloadend = function() {
        dibujo = reader.result;  
        fetch("http://localhost:8080/api/user/moca",
        {
            method:'POST',
            body:JSON.stringify({
                MOCA1:{
                    "usuario":user,
                    "tiempo":timeSpent,
                    "dibujo":dibujo,
                }
            }),
            headers:{
                "Content-type":"application/json"
            }
        }).then(response=>response.json());  
        }
    })
     
}