var pointsNeeded=5;
let draggableElements=document.querySelector(".draggable-elements");
let droppableElements=document.querySelector(".droppable-elements");
let level=1;
let moves=0;
let points=0;
var user=null;
obtainUserName();

let goodAudio=new Audio("./bien.wav");
let badAudio=new Audio("./mal.wav");
let goodEnding= new Audio("./goodEnding.wav");
let nextLevelSound= new Audio("./nextLevel.wav");
var images=new Array();
images[0]='./Frutas/granada.png';images[1]='./Frutas/kiwi.png';
images[2]='./Frutas/manzana.png';images[3]='./Frutas/naranja.png';
images[4]='./Frutas/pera.png';

var imageName=images.slice();
images=images.sort(()=>{return Math.random()-0.5})

let selectedFruit=null;

//Calcute time spend in activity
var timeSpent=0;
var timerCountUp=null;
timeSpendInTest();
function timeSpendInTest(){
    timerCountUp=setInterval(()=>{
        timeSpent++;
    },1000);
}

drawFruits();
function drawFruits(){
    draggableElements.innerHTML='';
    droppableElements.innerHTML='';
    for(let i=0;i<pointsNeeded;i++){
        let fruitNameID=images[i].split(".");
        fruitNameID=fruitNameID[1].split("/");
        fruitNameID=fruitNameID[2];
        fruitNameID=fruitNameID.charAt().toUpperCase()+fruitNameID.slice(1);
        draggableElements.innerHTML+=                
        `<div class="fruit">
            <img id="${fruitNameID}" draggable="true" class="image" src="${images[i]}" alt="fruta">
        </div>`;
        let fruitName=imageName[i].split(".");
        fruitName=fruitName[1].split("/");
        fruitName=fruitName[2];
        fruitName=fruitName.charAt().toUpperCase()+fruitName.slice(1);
        droppableElements.innerHTML+=
        `<div class="names">
            <p>${fruitName}</p>
        </div>`;
    }

    let fruits=document.querySelectorAll(".image");
    fruits=[...fruits];
    fruits.forEach(fruit=>{
        fruit.addEventListener('dragstart',event=>{
            event.dataTransfer.setData('text',event.target.id);
        });
    });

    let names=document.querySelectorAll('.names');
    names=[...names];
    names.forEach(name=>{
        name.addEventListener('dragover',event=>{
            event.preventDefault()
        });
        name.addEventListener('drop',event=>{
            const draggableElementData=event.dataTransfer.getData('text');
            if(compareDraggable(draggableElementData,name.innerText)){
                let imageFruit=document.getElementById(draggableElementData);
                imageFruit.draggable=false;
                name.innerHTML='';
                name.appendChild(imageFruit);
                if(points==pointsNeeded){
                    if(level==1){
                        level=2;
                        points=0;
                        nextLevelSound.play();
                        setTimeout(()=>{
                            setImagesLevel2();
                            drawFruits();
                        },1000);

                    }
                    else{
                        clearInterval(timerCountUp);
                        goodEnding.play();
                        confetti({
                            particleCount:150,
                            spread:180
                        });
                    }
                }
            }
        });
    });
}

function compareDraggable(dragId,dropText){
    moves++;
    if(dragId==dropText){
        goodAudio.play();
        points++;
        conexionREST(dragId,dropText);
        return true;
    }
    conexionREST(dragId,dropText);
    badAudio.play();
    return false;
}

function setImagesLevel2(){
    images[0]='./Verduras/berenjena.png';images[1]='./Verduras/brocoli.png';
    images[2]='./Verduras/calabaza.png';images[3]='./Verduras/cebolla.png';
    images[4]='./Verduras/lechuga.png';images[5]='./Verduras/maiz.png';
    images[6]='./Verduras/pepino.png';images[7]='./Verduras/pimiento.png';
    images[8]='./Verduras/remolacha.png'; images[9]='./Verduras/zanahoria.png';

    imageName=images.slice();
    images=images.sort(()=>{return Math.random()-0.5});
    pointsNeeded=10;
    timeSpent=0;
    document.getElementById('title').innerHTML=`Adivina la Verdura`;
}

function conexionREST(dragId,dropText){
    let cell=matchingCellID(dropText);
    let matchingCell=matchingCellID(dragId);
    let objectList=new Array();
    let boxList=new Array();
    images.forEach(name=>{objectList.push(name.split(".")[1].split("/")[2])});
    imageName.forEach(name=>{boxList.push(name.split(".")[1].split("/")[2])});
    fetch("http://localhost:8080/api/user/arrastraySuelta",{
        method:'POST',
        body: JSON.stringify({
            movimientos:moves, 
            tiempo: timeSpent,
            usuario: user,
            nivel: level,
            aciertos: points,
            nombreElementoEscogido: dragId,
            listaObjetos:objectList,
            listaCajas:boxList,
            casillaSelecciona:{
                fila:0,
                columna:cell
            },
            casillaValida:{
                fila:0,
                columna:matchingCell
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

function matchingCellID(id){
    for(let i=0;i<imageName.length;i++){
        let fruitName=imageName[i].split(".");
        fruitName=fruitName[1].split("/");
        fruitName=fruitName[2];
        fruitName=fruitName.charAt().toUpperCase()+fruitName.slice(1);
        if(fruitName==id){
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