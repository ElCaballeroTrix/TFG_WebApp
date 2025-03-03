var circle=document.getElementById("circle");
var xCircle=0;
var yCircle=0;
let goodAudio=new Audio("./bien.wav");
let badAudio=new Audio("./mal.wav");
let goodFinalAudio=new Audio("./goodEnding.wav");
let badFinalAudio=new Audio("./badEnding.wav");
let score=document.getElementById('score');
let playButton=document.getElementById('play');
let punctuation=document.getElementById('punctuation');
let finalScore=0;
let levels=0;
let regressiveTimerId;
let time=0;
var user=null;
obtainUserName();

function play(){
    generateRandomCircle();
    addEventListeners();
    if (levels==0 || levels==10){
        levels=0;
        finalScore=0;
        punctuation.innerHTML=`${levels}/10`;
        document.getElementById('message').innerHTML=``;
    }
    score.innerHTML=``;
    playButton.disabled=true;
    playButton.innerHTML=`SIGUIENTE`;
    //Timer
    regressiveTimerId=setInterval(()=>{
        time++;
    },1000);
}


function drawCircle(width,height,R){
    var canvas = document.getElementById('circle');
    canvas.width=width;
    canvas.height=height;
    if (canvas.getContext){
        var ctx = canvas.getContext('2d'); 
        xCircle= canvas.width / 2;
        yCircle = canvas.height / 2;
        const image = new Image();
        image.onload = ()=>{
            ctx.save();
            ctx.beginPath();
            ctx.arc(xCircle, yCircle, R, 0, 2 * Math.PI, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(image,0,0,xCircle*2,yCircle*2);
            ctx.beginPath();
            ctx.arc(0, 0, R, 0, Math.PI * 2, true);
            ctx.clip();
            ctx.closePath();
            ctx.restore();
        };
        let circleColor=[
        "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1184%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient1185)'%3e%3c/rect%3e%3cpath d='M1440 0L904.7 0L1440 170.41z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M904.7 0L1440 170.41L1440 325.07L896.46 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M896.46 0L1440 325.07L1440 463.38L633.6800000000001 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M633.6800000000001 0L1440 463.38L1440 506.6L527.6300000000001 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 560L422.21 560L0 358.68z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 358.68L422.21 560L901.95 560L0 345.15000000000003z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 345.15L901.95 560L1038.67 560L0 142.40999999999997z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 142.40999999999997L1038.67 560L1174.6200000000001 560L0 91.50999999999996z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1184'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='84.72%25' y1='139.29%25' x2='15.28%25' y2='-39.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1185'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(0%2c 101%2c 232%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",
        "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1190%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient1191)'%3e%3c/rect%3e%3cpath d='M1440 0L904.7 0L1440 170.41z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M904.7 0L1440 170.41L1440 325.07L896.46 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M896.46 0L1440 325.07L1440 463.38L633.6800000000001 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M633.6800000000001 0L1440 463.38L1440 506.6L527.6300000000001 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 560L422.21 560L0 358.68z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 358.68L422.21 560L901.95 560L0 345.15000000000003z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 345.15L901.95 560L1038.67 560L0 142.40999999999997z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 142.40999999999997L1038.67 560L1174.6200000000001 560L0 91.50999999999996z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1190'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='84.72%25' y1='139.29%25' x2='15.28%25' y2='-39.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1191'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(163%2c 108%2c 108%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(232%2c 0%2c 0%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",
        "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1278%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient1279)'%3e%3c/rect%3e%3cpath d='M1440 0L904.7 0L1440 170.41z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M904.7 0L1440 170.41L1440 325.07L896.46 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M896.46 0L1440 325.07L1440 463.38L633.6800000000001 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M633.6800000000001 0L1440 463.38L1440 506.6L527.6300000000001 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 560L422.21 560L0 358.68z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 358.68L422.21 560L901.95 560L0 345.15000000000003z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 345.15L901.95 560L1038.67 560L0 142.40999999999997z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 142.40999999999997L1038.67 560L1174.6200000000001 560L0 91.50999999999996z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1278'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='84.72%25' y1='139.29%25' x2='15.28%25' y2='-39.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1279'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(108%2c 163%2c 139%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(0%2c 239%2c 134%2c 1)' offset='0.99'%3e%3c/stop%3e%3cstop stop-color='rgba(232%2c 0%2c 0%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",
        "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1938%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient1939)'%3e%3c/rect%3e%3cpath d='M1440 0L904.7 0L1440 170.41z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M904.7 0L1440 170.41L1440 325.07L896.46 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M896.46 0L1440 325.07L1440 463.38L633.6800000000001 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M633.6800000000001 0L1440 463.38L1440 506.6L527.6300000000001 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 560L422.21 560L0 358.68z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 358.68L422.21 560L901.95 560L0 345.15000000000003z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 345.15L901.95 560L1038.67 560L0 142.40999999999997z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 142.40999999999997L1038.67 560L1174.6200000000001 560L0 91.50999999999996z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1938'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='84.72%25' y1='139.29%25' x2='15.28%25' y2='-39.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1939'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(108%2c 163%2c 139%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(220%2c 207%2c 207%2c 1)' offset='0.01'%3e%3c/stop%3e%3cstop stop-color='rgba(0%2c 0%2c 0%2c 1)' offset='0.99'%3e%3c/stop%3e%3cstop stop-color='rgba(232%2c 0%2c 0%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",
        "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1206%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient1207)'%3e%3c/rect%3e%3cpath d='M1440 0L904.7 0L1440 170.41z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M904.7 0L1440 170.41L1440 325.07L896.46 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M896.46 0L1440 325.07L1440 463.38L633.6800000000001 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M633.6800000000001 0L1440 463.38L1440 506.6L527.6300000000001 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 560L422.21 560L0 358.68z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 358.68L422.21 560L901.95 560L0 345.15000000000003z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 345.15L901.95 560L1038.67 560L0 142.40999999999997z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 142.40999999999997L1038.67 560L1174.6200000000001 560L0 91.50999999999996z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1206'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='84.72%25' y1='139.29%25' x2='15.28%25' y2='-39.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1207'%3e%3cstop stop-color='rgba(0%2c 255%2c 223%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(0%2c 233%2c 255%2c 1)' offset='0.99'%3e%3c/stop%3e%3cstop stop-color='rgba(0%2c 255%2c 223%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"
        ];
        circleColor.sort(()=>{return Math.random()-0.5});
        image.src=circleColor[0];
        circle.style.visibility="visible";
    }
}

function addEventListeners(){
    circle.addEventListener('click',event=>{
        const areaCircle=circle.getBoundingClientRect()
        const x = event.clientX - areaCircle.left
        const y = event.clientY - areaCircle.top
        if(x<xCircle+10 && x>xCircle-10 && y<yCircle+10 && y>yCircle-10){
            goodAudio.play();
            score.style["color"]="blue";
        }
        else{
            badAudio.play();
            score.style["color"]="#7a0808";
        }
        
        let xMoved=x-xCircle;
        let yMoved=y-yCircle;
        let result=Math.sqrt(Math.pow(xMoved,2)+Math.pow(yMoved,2));
        score.innerHTML=`Te quedastes a ${result.toFixed(2)}px del centro`;
        finalScore+=result;
        levels++;
        punctuation.innerHTML=`${levels}/10`;
        circle.style.visibility="hidden";
        clearInterval(regressiveTimerId);
        endGame();
        playButton.disabled=false;
        //Comunicación REST
        fetch("http://localhost:8080/api/user/centroBola",
        {
            method:'POST',
            body:JSON.stringify({
                tiempo:time,
                usuario:user,
                distancia:result.toFixed(2),
                puntoPulsado:{        
                    x:x,
                    y:y
                },
                nivel:levels,
                ppi:window.screen.width
            }),
            headers:{
                "Content-type":"application/json"
            }
        }).then(response=>response.json());
        time=0;
    },{once:true});
}

function generateRandomCircle(){
    var circle = document.getElementById('circle');
    let randomNumber=[200,230,250,270,300];
    randomNumber=randomNumber.sort(()=>{return Math.random()-0.5});
    let randomHeight=[50,70,100,130,150,170,200,230,250,270,300,330,350,370,400,420,450,470,500,530,550,570,600,630,650,670,700,730,750,770,800,830,850,870,900];
    randomHeight=randomHeight.sort(()=>{return Math.random()-0.5});
    let i=0;
    if((window.innerHeight-450)<randomHeight[i]){
        let goodNumber=false;
        while((window.innerHeight-450)<randomHeight[i] && !goodNumber){
            if((window.innerHeight-450)>randomHeight[i]){
                goodNumber=true;
            }            
            i++;
        }
    }
    let randomWidth=[50,70,100,130,150,170,200,230,250,270,300,330,350,370,400,420,450,470,500,
        530,550,570,600,630,650,670,700,730,750,770,800,830,850,870,900,920,950,970,1000,
        1030,1050,1080,1100,1130,1150,1170,1200,1230,1250,1270,1300,1330,1350,1370,1400,1430,
        1450,1470,1500,1530,1550,1570,1600,1630,1650,1670,1700,1730,1750,1770,1800,1830,1850];
    randomWidth=randomWidth.sort(()=>{return Math.random()-0.5});
    let j=0;
    if((window.innerWidth-320)<randomWidth[j]){
        let goodNumber=false;
        while((window.innerWidth-320)<randomWidth[j] && !goodNumber){
            if((window.innerWidth-320)>randomWidth[j]){
                goodNumber=true;
            }
            j++;
        }
    }
    circle.style.position='relative';
    circle.style.top= randomHeight[i]+'px';
    circle.style.left = randomWidth[j]+'px';
    drawCircle(randomNumber[0],randomNumber[0],randomNumber[0]/2);
}

function endGame(){
    if(levels==10){
        if(finalScore<=120){
            confetti({
                particleCount:150,
                spread:180
            });
            score.style["color"]="blue";
            goodFinalAudio.play();
        }
        else{
            score.style["color"]="#7a0808";
            badFinalAudio.play();
        }
        score.innerHTML=`Tu resultado final es de ${finalScore.toFixed(2)}`;
        document.getElementById('message').innerHTML=`Vuelve a probar otra vez`;
        playButton.innerHTML=`JUEGA OTRA VEZ`;
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