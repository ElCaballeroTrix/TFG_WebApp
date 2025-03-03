let words=[
    "piña","manzana","calabaza","rabanito","tomate","espárrago","cebolla","lechuga",
    "pepino","acelga","berenjena","maíz","frambuesa","mora","sandía","uva","limón",
    "melón","pera","arándanos","higo","naranja","kiwi","ciruela","plátano","cereza",
    "remolacha","puerro","coco","aguacate","granada","mango","melocotón","nectarina"
];

let level=3;
let wordsToBeFound=new Array();
let board=document.querySelector('.board');
let timerElement=document.getElementById('timer');
let noTimer=false;
let sizeMatrix=3;
let finalMatrix;
let regressiveTimerId;
var user=null;
obtainUserName();
//Se activan por defecto el boton de "3 words", Countdown "ON", y Display Time: 00:06
let levelSelected=document.getElementById("3L");
levelSelected.disabled=true;
document.getElementById("ON").disabled=true;
let timer=document.getElementById("06").innerHTML;
let activeTimer=document.getElementById("06");
activeTimer.disabled=true;
//Una vez estas en la matriz de búsqueda, tenemos que saber el número de
//clicks y los encontrados
let clickedWords=0;
let foundWords=0;
let punctuation=document.getElementById('punctuation');
let description=document.getElementById('description');
punctuation.style.visibility = "hidden";
//Sound
let goodEnding=new Audio("goodEnding.wav");
let badEnding=new Audio("badEnding.wav");
let clickSound=new Audio("click.wav");

//Calcute time spend in activity
var timeSpent=0;
var timerCountUp=null;

function timeSpendInTest(){
    timerCountUp=setInterval(()=>{
        timeSpent++;
    },1000);
}

drawMatrix();

function drawMatrix(){
    board.innerHTML='';
    words=words.sort(()=>{return Math.random()-0.5})
    switch(level){
        case 3:
            wordsToBeFound=[words[0],words[1],words[2]];
            document.getElementsByClassName('board')[0].style["grid-template-columns"]="repeat(3,1fr)";
            sizeMatrix=3;
        break;
        case 4:
            wordsToBeFound=[words[0],words[1],words[2],words[3]];
            document.getElementsByClassName('board')[0].style["grid-template-columns"]="repeat(4,1fr)";
            sizeMatrix=4;
        break;    
        case 6:
            wordsToBeFound=[words[0],words[1],words[2],words[3],words[4],words[5]];
            document.getElementsByClassName('board')[0].style["grid-template-columns"]="repeat(3,1fr)";
            sizeMatrix=3;
        break;
        case 8:
            wordsToBeFound=[words[0],words[1],words[2],words[3],words[4],words[5],words[6],words[7]];
            document.getElementsByClassName('board')[0].style["grid-template-columns"]="repeat(4,1fr)";
            sizeMatrix=4;
        break;
        case 10:
            wordsToBeFound=[words[0],words[1],words[2],words[3],words[4],words[5],words[6],words[7],words[8],words[9]];
            document.getElementsByClassName('board')[0].style["grid-template-columns"]="repeat(5,1fr)";
            sizeMatrix=5;
        break;
        case 12:
            wordsToBeFound=[words[0],words[1],words[2],words[3],words[4],words[5],words[6],words[7],words[8],words[9],words[10],words[11]];
            document.getElementsByClassName('board')[0].style["grid-template-columns"]="repeat(4,1fr)";
            sizeMatrix=4;
        break;
        case 16:
            wordsToBeFound=[words[0],words[1],words[2],words[3],words[4],words[5],words[6],words[7],words[8],words[9],words[10],words[11],words[12],words[13],words[14],words[15]];
            document.getElementsByClassName('board')[0].style["grid-template-columns"]="repeat(4,1fr)";
            sizeMatrix=4;
        break;
    }
    for(let i=0;i<wordsToBeFound.length;i++){
        board.innerHTML+=`<div class='word'>${wordsToBeFound[i]}</div>`;
        document.getElementsByClassName('word')[i].style["color"]="transparent";
    }
}
function drawMatrix2(){
    board.innerHTML='';
    words=words.sort(()=>{return Math.random()-0.5});
    document.getElementsByClassName('board')[0].style["grid-template-columns"]="repeat("+sizeMatrix+",1fr)";
    let auxiliarMatrix=words.map((x) => x);
    for(let i=0;i<auxiliarMatrix.length;i++){
        for(let j=0;j<wordsToBeFound.length;j++){
            if(auxiliarMatrix[i]==wordsToBeFound[j]){
                auxiliarMatrix.splice(i,1);
                i--;
            }
        }
    }
    //Sacamos la nueva matriz, con las palabras a buscar y nuevas
    finalMatrix=wordsToBeFound.map((x) => x);
    for(let i=0;i<wordsToBeFound.length;i++){
        finalMatrix.push(auxiliarMatrix[i]);
    }
    finalMatrix=finalMatrix.sort(()=>{return Math.random()-0.5});
    for(let i=0;i<finalMatrix.length;i++){
        board.innerHTML+=`<div class='word' id='${i}'>${finalMatrix[i]}</div>`;
    }
}

function changeLevel(id){
    clearInterval(timerCountUp);
    timeSpent=0;
    punctuation.style.visibility = "hidden";
    description.innerHTML=`Memoriza las palabras`;
    clickedWords=0;
    foundWords=0;
    document.getElementById("play").innerHTML="JUGAR";
    document.getElementById("play").style.visibility = "visible";
    clearInterval(regressiveTimerId);
    timerElement.innerHTML=timer;
    levelSelected.disabled=false;
    levelSelected=document.getElementById(id);
    let idLevel=id.split("L");
    level=parseInt(idLevel[0]);
    levelSelected.disabled=true;
    enableTimers();
    drawMatrix();
}

function changeCountdownShown(id){
    if (id=='OFF'){
        noTimer=true;
        timerElement.innerHTML='__:__';
        document.getElementById("ON").disabled=false;
        document.getElementById("OFF").disabled=true;
    }
    else{
        noTimer=false;
        timerElement.innerHTML=timer;
        document.getElementById("OFF").disabled=false;
        document.getElementById("ON").disabled=true;
    }
}
function changeTime(number){
    activeTimer.disabled=false;
    if(number==1){
        timerElement.innerHTML="1:00";
        timer=document.getElementById("1:00").innerHTML;
        activeTimer=document.getElementById("1:00");
        activeTimer.disabled=true;
    }
    else if(number==6){
        timerElement.innerHTML="00:06";
        timer=document.getElementById("06").innerHTML;
        activeTimer=document.getElementById("06");
        activeTimer.disabled=true;
    }
    else{
        timerElement.innerHTML="00:"+number;
        timer=document.getElementById(number).innerHTML;
        activeTimer=document.getElementById(number);
        activeTimer.disabled=true;
    }
    if(noTimer){
        timerElement.innerHTML='__:__';
    }
}

function play(){
    punctuation.style.visibility = "hidden";
    document.getElementById("play").style.visibility = "hidden";
    drawMatrix();
    showMatrix();
    let time=6;
    switch(timer){
        case "00:06":
            time=6;
            break;
        case "00:15":
            time=15;
            break;
        case "00:20":
            time=20;
            break;
        case "00:40":
            time=40;
            break;
        case "1:00":
            time=60;
            break;
    }
    disableTimers();
    regressiveTimerId=setInterval(()=>{
        time--;
        if(!noTimer){
            if (time>9){
                timerElement.innerHTML=`00:${time}`;
            }
            else{
                timerElement.innerHTML=`00:0${time}`;
         }
        }
        if(time==0){
            clearInterval(regressiveTimerId);
            timeSpendInTest();
            description.innerHTML=`Selecciona las palabras correctas`;
            disableChangeLevel();
            drawMatrix2();
            addEventListeners();
        }
    },1000);
}

function showMatrix(){
    for(let i=0;i<wordsToBeFound.length;i++){
        document.getElementsByClassName('word')[i].style["color"]="black";
    }
}

function addEventListeners(){
    let tokensWords=document.querySelectorAll('.word');
    tokensWords.forEach(token=>{
        token.style["cursor"]="pointer";
        token.style["background-color"]="rgb(245, 245, 245)";
    });
    tokensWords.forEach(token=>token.addEventListener('click',()=>{
        token.style["border-color"]="rgb(22, 214, 221)";
        token.style["background-color"]="rgb(22, 214, 221)";
        clickSound.play();
        clickedWords++;
        punctuation.style.visibility = "visible";
        punctuation.innerHTML=`Palabras Seleccionadas:<color: "red"> ${clickedWords}</color>/${wordsToBeFound.length}`;
        for(let i=0;i<wordsToBeFound.length;i++){
            if(wordsToBeFound[i]==token.innerHTML){
                foundWords++;
            }
        }
        conexionREST(token.id);
        if(clickedWords==wordsToBeFound.length){
            finish();
        }
    }));
}

function finish(){
    let tokensWords=document.querySelectorAll('.word');
    tokensWords.forEach(token=>{
        token.disabled=true;
    });
    if(foundWords==wordsToBeFound.length){
        goodEnding.play();
        confetti({
            particleCount:150,
            spread:180
        });
        document.getElementById("play").innerHTML="Jugar Otra Vez";
    }
    else{
        badEnding.play();
        tokensWords.forEach(token=>{
            let i=0;
            let foundAHiddenWord=false;
            while(i<wordsToBeFound.length && !foundAHiddenWord){
                if(wordsToBeFound[i]==token.innerHTML){
                    foundAHiddenWord=true;
                }
                i++;
            }
            if(!foundAHiddenWord && token.style["background-color"]=='rgb(22, 214, 221)'){
                token.style["border-color"]="rgb(224, 43, 43)";
                token.style["background-color"]="rgb(224, 43, 43)";
            }
            else if(foundAHiddenWord && token.style["background-color"]=='rgb(245, 245, 245)'){
                token.style["border-color"]="black";
                token.style["background-color"]="rgb(22, 214, 221)";
            }
        });
        punctuation.innerHTML=`Puntuación: ${foundWords}/${wordsToBeFound.length}`;
        document.getElementById("play").innerHTML="Jugar Otra Vez";
    }
    //Impedir que se puedan pulsar las letras hasta reinicio o cambio de nivel
    for(let i=0;i<document.querySelectorAll('.word').length;i++){
        document.getElementsByClassName('word')[i].style["pointer-events"]="none";
    }
    enableTimers();
    enableChangeLevel();
    clearInterval(timerCountUp);
    timeSpent=0;
    foundWords=0;
    clickedWords=0;
    document.getElementById("play").style.visibility = "visible";
}

function disableTimers(){
    for(let i=0;i<5;i++){
        document.getElementsByClassName('buttonDisplayTime')[i].disabled=true;
    }
}
function disableChangeLevel(){
    for(let i=0;i<6;i++){
        document.getElementsByClassName('buttonLevel')[i].disabled=true;
    }
}

function enableTimers(){
    for(let i=0;i<5;i++){
        document.getElementsByClassName('buttonDisplayTime')[i].disabled=false;
    }
    activeTimer.disabled=true;
}

function enableChangeLevel(){
    for(let i=0;i<6;i++){
        document.getElementsByClassName('buttonLevel')[i].disabled=false;
    }
    levelSelected.disabled=true;
}

function conexionREST(id){
    let cellX=Math.floor(id/sizeMatrix);
    let cellY=id%sizeMatrix;
    let matchingCell=matchingCellID();
     fetch("http://localhost:8080/api/user/recuerdaPalabras",{
        method:'POST',
        body: JSON.stringify({
            movimientos:clickedWords, 
            tiempo: timeSpent,
            usuario: user,
            nivel: levelSelected.innerHTML,
            aciertos: foundWords,
            temporizador:activeTimer.innerHTML,
            tablero:finalMatrix,
            casillaSelecciona:{
                fila:cellX,
                columna:cellY
            },
            casillasValida:matchingCell,
            ppi:window.screen.width
        }),
        headers:{
            "Content-type":"application/json"
        }
    }).then(response=>response.json()
    ).then(result=>{
        console.log(result);
    }); 
}

function matchingCellID(){
    let matchingList=[];
    for(let i=0;i<(level*2);i++){
        for(let j=0;j<level;j++){
            if(document.querySelectorAll('.word')[i].innerHTML==wordsToBeFound[j]){
                let matchingCellX=Math.floor(i/sizeMatrix);
                let matchingCellY=i%sizeMatrix;
                let cell={fila:matchingCellX,columna:matchingCellY};
                matchingList.push(cell);
            }
        }
        
    }
    return matchingList;
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