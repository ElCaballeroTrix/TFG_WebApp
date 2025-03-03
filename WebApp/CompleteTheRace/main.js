var circle=document.getElementById("circle");
circle.width=window.innerWidth;
circle.height=window.innerHeight/2;
var ctx=circle.getContext("2d");
var stopBallButton=document.getElementById("stopBall");
stopBallButton.disabled=true;
var playButton=document.getElementById("play");
playButton.disabled=true;
var level1Button=document.getElementById("level1");
var level2Button=document.getElementById("level2");
var level3Button=document.getElementById("level3");
var user=null;
obtainUserName();

var image=new Image();
let circleColor=[
    "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1184%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient1185)'%3e%3c/rect%3e%3cpath d='M1440 0L904.7 0L1440 170.41z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M904.7 0L1440 170.41L1440 325.07L896.46 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M896.46 0L1440 325.07L1440 463.38L633.6800000000001 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M633.6800000000001 0L1440 463.38L1440 506.6L527.6300000000001 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 560L422.21 560L0 358.68z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 358.68L422.21 560L901.95 560L0 345.15000000000003z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 345.15L901.95 560L1038.67 560L0 142.40999999999997z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 142.40999999999997L1038.67 560L1174.6200000000001 560L0 91.50999999999996z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1184'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='84.72%25' y1='139.29%25' x2='15.28%25' y2='-39.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1185'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(0%2c 101%2c 232%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",
    "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1190%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient1191)'%3e%3c/rect%3e%3cpath d='M1440 0L904.7 0L1440 170.41z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M904.7 0L1440 170.41L1440 325.07L896.46 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M896.46 0L1440 325.07L1440 463.38L633.6800000000001 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M633.6800000000001 0L1440 463.38L1440 506.6L527.6300000000001 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 560L422.21 560L0 358.68z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 358.68L422.21 560L901.95 560L0 345.15000000000003z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 345.15L901.95 560L1038.67 560L0 142.40999999999997z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 142.40999999999997L1038.67 560L1174.6200000000001 560L0 91.50999999999996z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1190'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='84.72%25' y1='139.29%25' x2='15.28%25' y2='-39.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1191'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(163%2c 108%2c 108%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(232%2c 0%2c 0%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",
    "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1278%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient1279)'%3e%3c/rect%3e%3cpath d='M1440 0L904.7 0L1440 170.41z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M904.7 0L1440 170.41L1440 325.07L896.46 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M896.46 0L1440 325.07L1440 463.38L633.6800000000001 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M633.6800000000001 0L1440 463.38L1440 506.6L527.6300000000001 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 560L422.21 560L0 358.68z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 358.68L422.21 560L901.95 560L0 345.15000000000003z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 345.15L901.95 560L1038.67 560L0 142.40999999999997z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 142.40999999999997L1038.67 560L1174.6200000000001 560L0 91.50999999999996z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1278'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='84.72%25' y1='139.29%25' x2='15.28%25' y2='-39.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1279'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(108%2c 163%2c 139%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(0%2c 239%2c 134%2c 1)' offset='0.99'%3e%3c/stop%3e%3cstop stop-color='rgba(232%2c 0%2c 0%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",
    "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1938%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient1939)'%3e%3c/rect%3e%3cpath d='M1440 0L904.7 0L1440 170.41z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M904.7 0L1440 170.41L1440 325.07L896.46 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M896.46 0L1440 325.07L1440 463.38L633.6800000000001 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M633.6800000000001 0L1440 463.38L1440 506.6L527.6300000000001 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 560L422.21 560L0 358.68z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 358.68L422.21 560L901.95 560L0 345.15000000000003z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 345.15L901.95 560L1038.67 560L0 142.40999999999997z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 142.40999999999997L1038.67 560L1174.6200000000001 560L0 91.50999999999996z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1938'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='84.72%25' y1='139.29%25' x2='15.28%25' y2='-39.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1939'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(108%2c 163%2c 139%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(220%2c 207%2c 207%2c 1)' offset='0.01'%3e%3c/stop%3e%3cstop stop-color='rgba(0%2c 0%2c 0%2c 1)' offset='0.99'%3e%3c/stop%3e%3cstop stop-color='rgba(232%2c 0%2c 0%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",
    "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1206%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient1207)'%3e%3c/rect%3e%3cpath d='M1440 0L904.7 0L1440 170.41z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M904.7 0L1440 170.41L1440 325.07L896.46 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M896.46 0L1440 325.07L1440 463.38L633.6800000000001 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M633.6800000000001 0L1440 463.38L1440 506.6L527.6300000000001 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 560L422.21 560L0 358.68z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 358.68L422.21 560L901.95 560L0 345.15000000000003z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 345.15L901.95 560L1038.67 560L0 142.40999999999997z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 142.40999999999997L1038.67 560L1174.6200000000001 560L0 91.50999999999996z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1206'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='84.72%25' y1='139.29%25' x2='15.28%25' y2='-39.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1207'%3e%3cstop stop-color='rgba(0%2c 255%2c 223%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(0%2c 233%2c 255%2c 1)' offset='0.99'%3e%3c/stop%3e%3cstop stop-color='rgba(0%2c 255%2c 223%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"
    ];
circleColor.sort(()=>{return Math.random()-0.5});
image.src=circleColor[0];
//Sounds
let goodEnding=new Audio("goodEnding.wav");
let badEnding=new Audio("badEnding.wav");
let level=1;
let levelInterval=200;
var fadeEffect=null;
var idAnimation=null;
//Timer
var time=0;
let regressiveTimerId=null;
//Win Positions
var winPositions=new Array();
winPositions=[{greaterThan:{x:(window.innerWidth-260),y:350},lowerThan:{x:(window.innerWidth-200),y:350}},
                {greaterThan:{x:(window.innerWidth/2-60),y:350},lowerThan:{x:(window.innerWidth/2),y:350}},
                {greaterThan:{x:(window.innerWidth-260),y:90},lowerThan:{x:(window.innerWidth-200),y:30}},
            ];
let secondPhase=false;


function play(){
    circle.width=window.innerWidth;
    circle.height=window.innerHeight/2;
    circle.style.opacity=1;
    switch(level){
        case 1:
            animate1();
            break;
        case 2:
            animate2();
            break;
        case 3:
            animate3();
            break;
    }
    fadeOutEffect();
    //Timer
    level1Button.disabled=true;
    level2Button.disabled=true;
    level3Button.disabled=true;
    regressiveTimerId=setInterval(()=>{
        time++;
    },1000);
    playButton.disabled=true;
    stopBallButton.disabled=false;
}
function fadeOutEffect(){
    fadeEffect= setInterval(function(){
        if(!circle.style.opacity){
            circle.style.opacity=1;
        }
        if(circle.style.opacity>0){
            circle.style.opacity-=0.1;
        }
        else{
            clearInterval(fadeEffect);
        }
    },levelInterval);
}
function stopBall(userStoppedBall){
    stopBallButton.disabled=true;
    cancelAnimationFrame(idAnimation);
    clearInterval(fadeEffect);
    if(!userStoppedBall){
        badEnding.play();
    }
    level1Button.disabled=false;
    level2Button.disabled=false;
    level3Button.disabled=false;
    circle.style.opacity=1;
    let xMoved=0;
    let yMoved=0;
    let result=0;
    let finalPosition;
    if(level==1){
        finalPosition=winPositions[0];
    }
    else if(level==2){
        finalPosition=winPositions[1];
    }
    else{
        finalPosition=winPositions[2];
    }
    if(ball.x<finalPosition.greaterThan.x){
        badEnding.play();
        xMoved=finalPosition.greaterThan.x-ball.x;
        yMoved=finalPosition.greaterThan.y-ball.y;
        result=Math.sqrt(Math.pow(xMoved,2)+Math.pow(yMoved,2));
    }
    else{
        if(userStoppedBall){
            goodEnding.play();
            confetti({
                particleCount:150,
                spread:180
            });
        }
        result=0;
    }
    clearInterval(regressiveTimerId);
    console.log("mayorQue: "+finalPosition.greaterThan.x+", menorque: "+finalPosition.lowerThan.x);
    fetch("http://localhost:8080/api/user/metaBola",
    {
        method:'POST',
        body:JSON.stringify({
            nivel:level,
            tiempo:time,
            usuario:user,
            usuarioDetuvoLaBola:userStoppedBall,
            distancia:result.toFixed(2),
            puntoPulsado:{
                x:ball.x,
                y:ball.y
            },
            puntosValidos:{
                "mayorQue":finalPosition.greaterThan,
                "menorQue":finalPosition.lowerThan
            },
            ppi:window.screen.width
        }),
        headers:{
            "Content-type":"application/json"
        }
    }).then(response=>response.json());
    time=0;
}

//Level 1
function animate1() {
    idAnimation=requestAnimationFrame(animate1);
    ctx.clearRect(0,0,circle.width,circle.height);
    draw1();
    ball.x += 1;
    if(ball.x==window.innerWidth-200){
        stopBall(false);
    }
    drawCircle();
}
//Level 2
function animate2() {
    idAnimation=requestAnimationFrame(animate2);
    ctx.clearRect(0,0,circle.width,circle.height);
    draw2();
    moveBallInBezierCurve();
    if(ball.x==points[3].x){
        stopBall(false);
    }
}
//Level 3
function animate3() {
    idAnimation=requestAnimationFrame(animate3);
    ctx.clearRect(0,0,circle.width,circle.height);
    draw3();
    if(ball.t==1 && !secondPhase){
        secondPhase=true;
        let xPrevious=ball.x;
        let yPrevious=ball.y;
        ball = {x:xPrevious,y:yPrevious,speed:0.002,t:0,radius:30};
        points = [
            {x:ball.x,y:ball.y},
            {x:window.innerWidth-200-30-125,y:295},
            {x:window.innerWidth-200-30-70,y:200},
            {x:window.innerWidth-200,y:30} 
        ];
    }
    moveBallInBezierCurve();
    if(ball.x==points[3].x){
        stopBall(false);
    }
}
// Draw level 1
function draw1(){
    ctx.clearRect(0,0,circle.width,circle.height);
    ctx.lineWidth = 65;

    ctx.beginPath();
    ctx.moveTo(points[0].x,points[0].y);
    ctx.bezierCurveTo(points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y);
    ctx.strokeStyle = 'black';
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(window.innerWidth-260,317.5,5,65);
    ctx.fillStyle = 'white';
    ctx.fill();    
}

// Draw level 2
function draw2(){
    ctx.clearRect(0,0,circle.width,circle.height);
    ctx.lineWidth = 65;

    ctx.beginPath();
    ctx.moveTo(points[0].x,points[0].y);
    ctx.bezierCurveTo(points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y);
    ctx.strokeStyle = 'black';
    ctx.lineCap = "round";
    ctx.stroke();

}

// Draw level 3
function draw3(){
    ctx.clearRect(0,0,circle.width,circle.height);
    ctx.lineWidth = 65;

    ctx.beginPath();
    ctx.moveTo(30,30);
    ctx.bezierCurveTo(70, 200, 125, 295, window.innerWidth/2, 300);
    ctx.strokeStyle = 'black';
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(window.innerWidth/2, 300);
    ctx.bezierCurveTo(window.innerWidth-200-30-125, 295, 
        window.innerWidth-200-30-70, 200, 
        window.innerWidth-200, 30);
    ctx.stroke();
}



// Draw the circle
function drawCircle(){
    ctx.fillStyle="cyan";
    ctx.strokeStyle="gray";
    ctx.lineWidth=3;
    xPosition=ball.x;
    yPosition=ball.y;
    ctx.save();
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI * 2,false);
    ctx.closePath();
    ctx.clip(); 
    circle.style.visibility="visible";
    ctx.drawImage(image,ball.x-ball.radius,ball.y-ball.radius,ball.radius*2,ball.radius*2);
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.restore();
}

function changeLevel(id){
    level=id;
     switch(level){
         case 1:
            ball = {x:30,y:350,speed:0.001,t:0,radius:30};
            points = [
                {x:ball.x,y:ball.y},
                {x:window.innerWidth-200,y:350},
                {x:window.innerWidth-200,y:350},
                {x:window.innerWidth-200,y:350} 
            ];
            levelInterval=200;  
            break;
         case 2:
            ball = {x:30,y:30,speed:0.001,t:0,radius:30};
            points = [
                {x:ball.x,y:ball.y},
                {x:70,y:200},
                {x:125,y:295},
                {x:window.innerWidth/2,y:350} 
            ];
            levelInterval=800;
            break;
         case 3:
            ball = {x:30,y:30,speed:0.001,t:0,radius:30};
            points = [
                {x:ball.x,y:ball.y},
                {x:70,y:200},
                {x:125,y:295},
                {x:window.innerWidth/2,y:300} 
            ];
            levelInterval=1000;
            break;
     }
     circle.style.opacity=0;
     cancelAnimationFrame(idAnimation);
     playButton.disabled=false;
 }

function moveBallInBezierCurve() {
    let [p0, p1, p2, p3] = points;
    //Calculate the coefficients based on where the ball currently is in the animation
    let cx = 3 * (p1.x - p0.x);
    let bx = 3 * (p2.x - p1.x) - cx;
    let ax = p3.x - p0.x - cx - bx;

    let cy = 3 * (p1.y - p0.y);
    let by = 3 * (p2.y - p1.y) - cy;
    let ay = p3.y - p0.y - cy -by;

    let t = ball.t;

    //Increment t value by speed
    ball.t += ball.speed;
    
    //Calculate new X & Y positions of ball
    let xt = ax*(t*t*t) + bx*(t*t) + cx*t + p0.x;
    let yt = ay*(t*t*t) + by*(t*t) + cy*t + p0.y;
    console.log("X: "+xt)
    if(ball.t > 1){
        ball.t=1;
    }

    //We draw the ball to the canvas in the new location
    ball.x = xt;
    ball.y = yt;
    drawCircle();
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
