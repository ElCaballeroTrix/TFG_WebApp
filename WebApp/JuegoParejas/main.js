//Inicialización de variables
let uncoveredCards=0;
let card1=null;
let card2=null;
let card1ID;
let card2ID;
let firstResult=null;
let secondResult=null;
let moves=0;
let successes=0;
let numberOfSuccesses=8;
let timer=false;
let timerSequence=120;
let initialTimer=timerSequence;
let regressiveTimerId=null;
let indexShowAllCards=0;
let level=1;
let boardSize=4;
let previousBoardSize=4;
var user=null;
obtainUserName();

//Apuntando a documento HTML
let showMoves=document.getElementById('moves');
let showSuccesses=document.getElementById('successes');
let showTimeLeft=document.getElementById('timeLeft');
let board=document.getElementById('board');
let buttonLevel1=document.getElementById('nivel1');
let buttonLevel2=document.getElementById('nivel2');
buttonLevel1.disabled=true;
//Generación de números aleatorios
let numbers=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers=numbers.sort(()=>{return Math.random()-0.5})
console.log(numbers)
//Imagenes
var images=new Array();
images[0]='';images[1]='./kiwi.png';
images[2]='./manzana.png';images[3]='./naranja.png';
images[4]='./pera.png';images[5]='./platano.png';
images[6]='./uvas.png';images[7]='./pinia.png';
images[8]='./cerezas.png';images[9]='./pitaya.png';
images[10]='./melocoton.png';images[11]='./fresa.png';
images[12]='./frutosdelBosque.png';images[13]='./granada.png';
images[14]='./pimiento.png';images[15]='./coco.png';
images[16]='./berenjena.png';images[17]='./ciruelas.png';
images[18]='./tomate.png';
//Sonido
let goodAudio=new Audio("./bien.wav");
let badAudio=new Audio("./mal.wav");
let goodFinalAudio=new Audio("./goodEnding.wav");
let badFinalAudio=new Audio("./badEnding.wav");

function countTime(){
    regressiveTimerId=setInterval(()=>{
        timerSequence--;
        showTimeLeft.innerHTML=`Tiempo: ${timerSequence} segundos`;
        if(timerSequence==0){
            clearInterval(regressiveTimerId);
            blockCards();
            badFinalAudio.play();
            conexionREST();
            showCards();
        }
    },1000);
}

function blockCards(){
    for(let i=0;i<Math.pow(boardSize,2);i++){
        let blockCard=document.getElementById(i);
        blockCard.disabled=true;
    }
}
function unblockCards(){
    for(let i=0;i<Math.pow(boardSize,2);i++){
        let blockCard=document.getElementById(i);
        if(blockCard.innerHTML==""){
            blockCard.disabled=false;
        }
    }
}

function showCards(){
    let timerShowCards=setInterval(()=>{
        let blockCard=document.getElementById(indexShowAllCards);
        blockCard.innerHTML=`<img src="${images[numbers[indexShowAllCards]]}">`;
        indexShowAllCards++;
        if(indexShowAllCards==16){
            clearInterval(timerShowCards);
            disableLevel(false);
        }
    },400);
}

//Funcion principal
function uncover(id){
    //Deshabilitar cambio de nivel en mitad de partida
   disableLevel(true);
    if(timer==false){
        countTime();
        timer=true;
    }

    uncoveredCards++;
    if(uncoveredCards==1){
        //Mostrar el primer número  
        firstResult=numbers[id];
        card1=document.getElementById(id);
        card1ID=id;
        card1.innerHTML=`<img src="${images[numbers[id]]}">`;
        //Deshabilitar primer boton
        card1.disabled=true;
    }
    else if(uncoveredCards==2){
        card2=document.getElementById(id)
        card2ID=id;
        secondResult=numbers[id];
        card2.innerHTML=`<img src="${images[numbers[id]]}">`;
        card2.disabled=true;
        //Incrementar movimientos
        moves++;
        showMoves.innerHTML=`Movimientos: ${moves}`;
        blockCards();
        if(firstResult==secondResult){
            goodAudio.play();  
            card1=null;
            card2=null;
            successes++;
            showSuccesses.innerHTML=`Aciertos: ${successes}`;
            conexionREST();
            unblockCards();
            if(successes==numberOfSuccesses){
                confetti({
                    particleCount:150,
                    spread:180
                });
                goodFinalAudio.play();
                clearInterval(regressiveTimerId);
                let timeCompleted=initialTimer-timerSequence;
                showSuccesses.innerHTML= `Aciertos: ${successes} \u{1F600}`;
                showTimeLeft.innerHTML=`¡¡¡Fantástico!!! Solo tardastes ${timeCompleted} segundos`;
                disableLevel(false);
            }
        }
        else{
            badAudio.play();
            conexionREST();
            //Mostrar momentaneamente y tapar
            setTimeout(()=>{
                card1.disabled=false;
                card2.disabled=false;
                card1.innerHTML=null;
                card2.innerHTML=null;
                card1=null;
                card2=null;
                unblockCards();
            },800);
        }
        
        uncoveredCards=0;
    }
}

function drawBoard(){
    deleteBoard();
    var value=0;
    for(let i=0; i<boardSize;i++){
        var row=board.insertRow(i);
        let j;
        for(j=0; j<boardSize;j++){
            var cell=row.insertCell();
            cell.innerHTML=`<button id="${j+value}" onclick="uncover(${j+value})"></button>`; 
        }
        value+=j;
    }
}
function deleteBoard(){
     for(let i=previousBoardSize-1; i>=0;i--){
            board.deleteRow(i);
    } 
}

//Change Level
function changeLevel(id){
    level=id;
    switch(id){
        case 1: 
            buttonLevel1.disabled=true;
            buttonLevel2.disabled=false;
            previousBoardSize=6;
            boardSize=4;
            numberOfSuccesses=8;
            timer=false;
            timerSequence=120;
            showTimeLeft.innerHTML=`Tiempo: ${timerSequence} segundos`;
            initialTimer=timerSequence;
            numbers=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
            numbers=numbers.sort(()=>{return Math.random()-0.5})
            drawBoard();
            break;
        case 2: 
            buttonLevel1.disabled=false;
            buttonLevel2.disabled=true;
            previousBoardSize=4;
            boardSize=6;
            numberOfSuccesses=18;
            timer=false;
            timerSequence=240;
            showTimeLeft.innerHTML=`Tiempo: ${timerSequence} segundos`;
            initialTimer=timerSequence;
            numbers=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,
                13,13,14,14,15,15,16,16,17,17,18,18];
            numbers=numbers.sort(()=>{return Math.random()-0.5})
            drawBoard();
            break;
    }
    moves=0;
    successes=0;
    showMoves.innerHTML=`Movimientos: ${moves}`;
    showSuccesses.innerHTML=`Aciertos: ${successes}`;
}
function disableLevel(state){
    if(level==1){
        buttonLevel2.disabled=state;
    }
    else{
        buttonLevel1.disabled=state;
    }
}

function conexionREST(){
    let cell1X=Math.floor(card1ID/boardSize);
    let cell1Y=card1ID%boardSize;
    let cell2X=Math.floor(card2ID/boardSize);
    let cell2Y=card2ID%boardSize;
    let matchingCell=matchingCellID();
    let matchingCellX=Math.floor(matchingCell/boardSize);
    let matchingCellY=matchingCell%boardSize;
    let timeCompleted=initialTimer-timerSequence;
    fetch("http://localhost:8080/api/user/parejas",{
        method:'POST',
        body: JSON.stringify({
            movimientos:moves, 
            tiempo: timeCompleted,
            usuario: user,
            nivel: level,
            aciertos: successes,
            tablero: numbers,
            casillaSelecciona1:{
                fila:cell1X,
                columna:cell1Y
            },
            casillaSelecciona2:{
                fila:cell2X,
                columna:cell2Y
            },
            casillaValida:{
                fila:matchingCellX,
                columna:matchingCellY
            },
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
    for(let i=0;i<numbers.length;i++){
        if(numbers[i]==numbers[card1ID] && i!=card1ID){
            return i;
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