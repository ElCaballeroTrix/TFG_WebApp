let board=document.querySelector('.board');
let playAgain=document.getElementById('play');
let showTimer=document.getElementById('timer');
let musicButton=document.getElementById('music');
playAgain.disabled=true;
musicButton.style.visibility="hidden";
playAgain.style.visibility="hidden";
let towers=7;
let currentTower=1;
let level=1;
let playerPosition=0;
var user=null;
obtainUserName();
let matrix=[
    [0,0,0,0,0,10],
    [0,0,0,0,0,5],
    [0,0,0,0,4,3],
    [0,0,0,2,1,3],
    [0,0,2,1,1,3],
    [0,2,1,1,1,3],
    [9,1,1,1,1,3],
];
let matrixValue=[
    [0,0,0,0,        0,825400],
    [0,0,0,0,        0,410200],
    [0,0,0,  0,  7300,200000],
    [0,0,0, 244,  900,14600],
    [0,0,16, 32, 1850,57000],
    [0,2,4, 120,  470,29000],
    ["J",1,8,  60, 3600,100000],
];
let matrixSelectedValue=[new Array(6).fill(0,0),new Array(6).fill(0,0),new Array(6).fill(0,0),new Array(6).fill(0,0),new Array(6).fill(0,0),new Array(6).fill(0,0),new Array(6).fill(0,0),];
matrixSelectedValue[6][1]=1;
let returnedValuesArray=[];
//****COPY OF MATRIX FOR RESTART GAME */
let restartMatrix=JSON.parse(JSON.stringify(matrix));
let restartMatrixValue=JSON.parse(JSON.stringify(matrixValue));
let restartMatrixSelectedValue=JSON.parse(JSON.stringify(matrixSelectedValue));
//**** */
let playerValue=2;
let timerCountUp=null;
let time=0;
let regressiveTimerId=null;
let timerSequence=3;
let imageDimension=90;
//Audio
let song;
let goodFinalAudio=new Audio('Sounds/goodEnding.wav');
let badFinalAudio=new Audio("Sounds/badEnding.wav");
let robotDeathSound=new Audio("Sounds/robot_death.wav");
let zombieDeathSound=new Audio("Sounds/zombie_death.wav");
let swordAttack=new Audio("Sounds/swordAttack.wav");
//-----------------------------------------------------------------
//fillValues();
drawBoard();
addEventListeners();

//***Comentar=SHIFT + ALT + A***
//***********Music************* */
function preload(){
    song=loadSound('Sounds/Epic-Adventure.mp3');
    musicButton.style.visibility="visible";
}
function setup(){
   music();
   song.stop();
}

function music(){
    song.play();
    song.setVolume(0.05);
    song.loop();
}
function turnMusic(){
    if(song.isPlaying()){
        musicButton.innerText="ENCENDER MÚSICA";
        song.stop();
    }
    else{
        musicButton.innerText="APAGAR MÚSICA";
        music();
    }
}
/***************/
//***********Timer********** */
timerCountUp=setInterval(()=>{
    time++;
    let timeFormatSeg=time%60+"";
    let timeFormatMin=Math.floor(time/60)+"";
    let min=0;
    let seg=0;
    if(timeFormatMin.length<2){
        min="0"+timeFormatMin;
    }
    else{
        min=timeFormatMin;
    }
    if(timeFormatSeg.length<2){
        seg="0"+timeFormatSeg;
    }
    else{
        seg=timeFormatSeg;
    }

    showTimer.innerHTML=`${min}:${seg}`;
},1000);
//********************** */
function drawBoard(){
    board.innerHTML='';
    for(let i=0;i<matrix.length;i++){
        for(let j=playerPosition;j<=currentTower;j++){
            switch(matrix[i][j]){
                case 9:
                    board.innerHTML+=`<div class='player'><canvas id="player" width="${imageDimension}" height="${imageDimension}"></canvas><div id="overlay">${playerValue}</div></div>`;
                    break;
                case 1:
                case 2:
                case 3:
                    board.innerHTML+=`<div class='enemy'><canvas class="zombie" width="${imageDimension}" height="${imageDimension}"></canvas><div id="overlay">${matrixValue[i][j]}</div></div>`;
                break;
                case 4:
                case 5:
                    board.innerHTML+=`<div class='enemy2'><canvas class="robot" width="${imageDimension}" height="${imageDimension}"></canvas><div id="overlay">${matrixValue[i][j]}</div></div>`;
                    break;
                case 10:
                    board.innerHTML+=`<div class='gem' id='gem'><img src="${"gem.png"}" width="${imageDimension-20}" height="${imageDimension-20}" /></div>`;
                    break; 
                default:
                    board.innerHTML+=`<div class='empty'></div>`;  
                    break;
            }
        }
    };   

}

function addEventListeners(){
    //Añadimos la opción de hacer click en Enemigos y la Gema
    let playerCanvas=document.querySelector('.player');
    let enemies=document.querySelectorAll('.enemy');
    let gems=document.querySelectorAll('.gem');
    gems.forEach((gem)=>gem.addEventListener('click',event=>{
        console.log(matrixValue[0][1])
        if(playerValue > matrixValue[0][1]){
            confetti({
                particleCount:300,
                spread:200
            });
            playerCanvas.children[1].innerText="";
            goodFinalAudio.play();
            clearInterval(timerCountUp);
            gem.style["pointer-events"]="none";
            gem.style["background-color"]="#009B77";
            playAgain.disabled=false;
            playAgain.style.visibility="visible";
            conexionServer(gem,actualPosition[0],actualPosition[1]);
        }
    }));
    //Zombies addListener
    enemies.forEach((enemy,index)=>enemy.addEventListener('click',event=>{
        let actualPosition=searchPosition(enemy.innerText);
        let valueZombie=matrixValue[actualPosition[0]][actualPosition[1]];
        if(playerValue!=0){
            let weakEnemy=enemySupposedToBeAttacked(enemies);
            if(playerValue>valueZombie){
                playerValue+=valueZombie;
                gameFrame=0;
                currentAnimationPlayer="attack";
                currentAnimationZombie[index]="death";
                swordAttack.play();
                enemy.children[1].innerText="";
                playerCanvas.children[1].innerText=playerValue;
                matrixValue[actualPosition[0]][actualPosition[1]]=0;
                enemy.disabled=true;
                enemy.style["pointer-events"]="none";
                enemy.style["background-color"]="#ac0404";
                zombieDeathSound.play();
                if(towerFinished()){
                    regressiveTimerId=setInterval(()=>{
                        timerSequence--;
                        if(timerSequence==0){
                            clearInterval(regressiveTimerId);
                            towerFall(); 
                            timerSequence=3; 
                        }
                    },1000);
                }
            }
            else{
                gameFrame=0;
                currentAnimationPlayer="death";  
                playerCanvas.children[1].innerText="";
                playerValue=0;
                enemies.forEach(enemyLeft=>{enemyLeft.disabled=true;});
                badFinalAudio.play();
                playAgain.disabled=false;
                playAgain.style.visibility="visible";
                clearInterval(timerCountUp);
            }
            conexionServer(weakEnemy,actualPosition[0],actualPosition[1]);
        }
    },{once:true}));
    //Robots eventListeners
    let enemies2=document.querySelectorAll('.enemy2');
    enemies2.forEach((enemy,index)=>enemy.addEventListener('click',event=>{
        let actualPosition=searchPosition(enemy.innerText);
        let valueRobot=matrixValue[actualPosition[0]][actualPosition[1]];
        if(playerValue!=0){
            let weakEnemy=enemySupposedToBeAttacked(enemies);
            if(playerValue>valueRobot){
                playerValue+=valueRobot;
                gameFrame=0;
                currentAnimationPlayer="attack";
                currentAnimationRobot[index]="death";
                swordAttack.play();
                enemy.children[1].innerText="";
                playerCanvas.children[1].innerText=playerValue;
                matrixValue[actualPosition[0]][actualPosition[1]]=0;
                enemy.disabled=true;
                enemy.style["pointer-events"]="none";
                enemy.style["background-color"]="#ac0404";
                robotDeathSound.play();
                if(towerFinished()){
                    regressiveTimerId=setInterval(()=>{
                        timerSequence--;
                        if(timerSequence==0){
                            clearInterval(regressiveTimerId);
                            towerFall(); 
                            timerSequence=3; 
                        }
                    },1000);
                }
            }
            else{
                gameFrame=0;
                currentAnimationPlayer="death";  
                playerCanvas.children[1].innerText="";
                playerValue=0;
                enemies.forEach(enemyLeft=>{enemyLeft.disabled=true;});
                badFinalAudio.play();
                playAgain.disabled=false;
                playAgain.style.visibility="visible";
                clearInterval(timerCountUp);

            }
            conexionServer(weakEnemy,actualPosition[0],actualPosition[1]);
        }
    },{once:true}));
}
function searchPosition(element){
    let rowElementToReturn=0;
    let indexToReturn=0;
    matrixValue.forEach((row,index)=>{
        let rowElement=row.findIndex(item=>item==element)
        if(rowElement!==-1){
            rowElementToReturn=rowElement;
            indexToReturn=index;
        }
    });
    return [indexToReturn,rowElementToReturn];
}

function towerFall(){
    for(let i=0;i<matrix.length;i++){
        matrixValue[i].splice(currentTower,1);
        matrix[i].splice(currentTower,1);
    }
    drawBoard();
    addEventListeners();
    playerCanvas=document.getElementById('player');
    ctxP=playerCanvas.getContext('2d'); 
    zombieCanvas=document.querySelectorAll('.zombie');
    robotCanvas=document.querySelectorAll('.robot');
    currentAnimationZombie=[];
    currentAnimationRobot=[];
    level++;
}
function towerFinished(){
    let towerFinished=true;
    for(let i=0;i<matrix.length;i++){
        if(matrixValue[i][currentTower]!=0){
            towerFinished=false;
        }
    }
    return towerFinished;
}
//*************PLAY AGAIN***** */
function playAgainMethod(){
    showTimer.innerHTML=`00:00`;
    playAgain.disabled=true;
    playAgain.style.visibility="hidden";
    matrix=JSON.parse(JSON.stringify(restartMatrix));
    matrixValue=JSON.parse(JSON.stringify(restartMatrixValue));
    matrixSelectedValue=JSON.parse(JSON.stringify(restartMatrixSelectedValue));
    playerValue=2;
    currentAnimationPlayer="idle";
    drawBoard();
    addEventListeners();
    playerCanvas=document.getElementById('player');
    ctxP=playerCanvas.getContext('2d'); 
    zombieCanvas=document.querySelectorAll('.zombie');
    robotCanvas=document.querySelectorAll('.robot');
    currentAnimationZombie=[];
    currentAnimationRobot=[];
    time=0;
    timerCountUp=setInterval(()=>{
        time++;
        let timeFormatSeg=time%60+"";
        let timeFormatMin=Math.floor(time/60)+"";
        let min=0;
        let seg=0;
        if(timeFormatMin.length<2){
            min="0"+timeFormatMin;
        }
        else{
            min=timeFormatMin;
        }
        if(timeFormatSeg.length<2){
            seg="0"+timeFormatSeg;
        }
        else{
            seg=timeFormatSeg;
        }
    
        showTimer.innerHTML=`${min}:${seg}`;
    },1000);
}

//***************Animation******************
let playerCanvas=document.getElementById('player');
var ctxP=playerCanvas.getContext('2d'); 
let inAttackMode=false;
let zombieCanvas=document.querySelectorAll('.zombie');
let robotCanvas=document.querySelectorAll('.robot');
let currentAnimationPlayer="idle";
let currentAnimationZombie=[];
let currentAnimationRobot=[];
let gameFrame=0;
let staggerFrames=4;
let playerImage=new Image();
playerImage.src="Player/spritesheet.png";

/* playerImage.onload = function() {
    init();
  }; 
function init() {
    window.requestAnimationFrame(animate);
  }*/

let zombieImage=new Image();
zombieImage.src="Zombie/spritesheet.png";
/* zombieImage.onload = function() {
    init();
  }; */
let robotImage=new Image();
robotImage.src="Robot/spritesheet.png";
//Para eliminar el parpadeo, creo que hay que meter las imagenes en un spritesheet
let frameXPlayer=1;
let frameXZombie=1;
let frameXRobot=1;
let spriteWidth=944;
let spriteWidthZombie=629;
let spriteWidthRobot=567;
let spriteHeight=751;
let spriteHeightZombie=526;
let spriteHeightRobot=556;

function animate(){
    ctxP.clearRect(0,0,imageDimension,imageDimension);
    let positionPlayerSheet= Math.floor(gameFrame/staggerFrames) % 10;
    if(currentAnimationPlayer=="idle"){
        frameXPlayer=spriteWidth*positionPlayerSheet;
    }
    else if(currentAnimationPlayer=="attack"){
        frameXPlayer=(spriteWidth*positionPlayerSheet)+(spriteWidth*10);
        if(positionPlayerSheet==9){
            currentAnimationPlayer="idle";
        }
    }
    else if(currentAnimationPlayer=="stop"){
        frameXPlayer=(spriteWidth*9)+(spriteWidth*20);
    }
    else if(currentAnimationPlayer=="death"){
        frameXPlayer=(spriteWidth*positionPlayerSheet)+(spriteWidth*20);
        if(positionPlayerSheet==9){
            currentAnimationPlayer="stop";
        }
    }
    ctxP.drawImage(playerImage,frameXPlayer,0,spriteWidth,spriteHeight,0,0,imageDimension,imageDimension);
    //*********ROBOT ANIMATION*****************
    if(robotCanvas!=null){
        robotCanvas.forEach(function(element,index,array){
            var ctxR=robotCanvas[index].getContext('2d'); 
            if(currentAnimationRobot[index]=="death"){
                let positionrobotSheet= Math.floor(gameFrame/staggerFrames) % 10;
                frameXRobot=(spriteWidthRobot*positionrobotSheet)+(spriteWidthRobot*10);
                if(positionrobotSheet==9){
                    currentAnimationRobot[index]="stop";     
                }
            }
            else if(currentAnimationRobot[index]=="stop"){
                frameXRobot=(spriteWidthRobot*10)+(spriteWidthRobot*9);
            }
            else{
                currentAnimationRobot[index]="idle";
                let positionrobotSheet= Math.floor(gameFrame/staggerFrames) % 10;
                frameXRobot=spriteWidthRobot*positionrobotSheet;
            }
            ctxR.clearRect(0,0,imageDimension,imageDimension);
            ctxR.drawImage(robotImage,frameXRobot,0,spriteWidthRobot,spriteHeightRobot,0,0,imageDimension,imageDimension);
        });
    }
    //********************ZOMBIE************
    zombieCanvas.forEach(function(element,index,array){
        var ctxZ=zombieCanvas[index].getContext('2d'); 
        if(currentAnimationZombie[index]=="death"){
            let positionZombieSheet= Math.floor(gameFrame/staggerFrames) % 12;
            frameXZombie=(spriteWidthZombie*positionZombieSheet)+(spriteWidthZombie*15);
            if(positionZombieSheet==10){
                currentAnimationZombie[index]="stop";     
            }
        }
        else if(currentAnimationZombie[index]=="stop"){
            frameXZombie=(spriteWidthZombie*11)+(spriteWidthZombie*15);
        }
        else{
            currentAnimationZombie[index]="idle";
            let positionZombieSheet= Math.floor(gameFrame/staggerFrames) % 15;
            frameXZombie=spriteWidthZombie*positionZombieSheet;
        }
        ctxZ.clearRect(0,0,imageDimension,imageDimension);
        ctxZ.drawImage(zombieImage,frameXZombie,0,spriteWidthZombie,spriteHeightZombie,0,0,imageDimension,imageDimension);
    });
    
    gameFrame++;
    requestAnimationFrame(animate);
    
}

animate();

//-----------------------------------------------------------------
//-----------------Conexión con Servidor REST--------------------

function conexionServer(object,xPosition,yPosition){
    fetch("http://localhost:8080/api/user/torre",
    {
        method:'POST',
        body:JSON.stringify({
            tiempo:time,
            usuario:user,
            tablero:matrixValue,
            casillaPulsada:{
                fila:xPosition,
                columna:yPosition
            },
            casillaValida:{
                fila:object[0],
                columna:object[1]
            },
            nivel:level,
            fuerzaJugador:playerValue,
            ppi:window.screen.width
        }),
        headers:{
            "Content-type":"application/json"
        }
    }).then(response=>response.json());
}

function enemySupposedToBeAttacked(enemies){
    let enemyReturn;
    enemies.forEach(enemy=>{
        let actualPosition=searchPosition(enemy.innerText);
        let valueEnemy=matrixValue[actualPosition[0]][actualPosition[1]];
        if(valueEnemy<playerValue && valueEnemy!=0){
            enemyReturn=actualPosition;
        }
    });
    return enemyReturn;
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