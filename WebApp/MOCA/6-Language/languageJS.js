var section2=document.getElementById("section2");

var recordButton=document.getElementById("record");
var recordStopButton=document.getElementById("recordStop");
var recordButton2=document.getElementById("record2");
var recordStopButton2=document.getElementById("recordStop2");
var recordButton3=document.getElementById("record3");
var recordStopButton3=document.getElementById("recordStop3");
var showTimer=document.getElementById("timer");
var pair1=document.getElementById("pair1");
var pair2=document.getElementById("pair2");
var text1=document.getElementById("Text1");
var text2=document.getElementById("Text2");
document.getElementById('section2').style["width"]=window.innerWidth-20+"px";

var time=60;
var timerCountDown=null;
var user=null;
recordStopButton.disabled=true;
recordButton2.disabled=true;
recordStopButton2.disabled=true;
recordButton3.disabled=true;
recordStopButton3.disabled=true;
recordStopButton3.style.visibility="hidden";
pair1.style["border"]="0px";
pair2.style["border"]="0px";
text1.disabled=true;
text2.disabled=true;


//***Recordings
var recording1=null;
var recording2=null;
var recording3=null;
var continueNextTest=false;

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
record(recordButton,recordStopButton);
record(recordButton2,recordStopButton2);
record(recordButton3,recordStopButton3);

function record(record,recordStop){
    record.addEventListener('click', async () => {
        if(record==recordButton3){
            timer();
        }
        record.disabled=true;
        recordStop.disabled=false;
        let stream = await navigator.mediaDevices.getUserMedia({audio: true, video: false});
        let mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        let chunks = [];
        mediaRecorder.ondataavailable = (e)=>{
             chunks.push(e.data);
        }
        //function to catch error
        mediaRecorder.onerror = (e)=>{
             alert(e.error);
        }

        mediaRecorder.onstop = (e)=>{
             let blod = new Blob(chunks);
             const reader = new FileReader();
             var base64data;
             reader.readAsDataURL(blod); 
             reader.onloadend = function() {
                base64data = reader.result;  
                if(recording1==null){
                    recording1=base64data;
                 }
                else if(recording2==null){
                    recording2=base64data;
                }
                else{
                    recording3=base64data;
                 }       
            }   
        }
        recordStop.addEventListener('click',()=>{
            if(!recordStopButton.disabled){
                recordButton2.disabled=false;
            }
            else if(!recordStopButton2.disabled){
                recordButton3.disabled=false;
            }
            recordStop.disabled=true;
            mediaRecorder.stop();
        });
    })
}

function showPairs(){
    pair1.style["border"]="1px solid black";
    pair2.style["border"]="1px solid black";
    pair1.innerHTML="tren-bicicleta";
    pair2.innerHTML="reloj-regla";
    text1.disabled=false;
    text2.disabled=false;
}



function saveAnswers(){
    var confirm=window.confirm("¿Desea continuar?");
    if (confirm === true) {
        if(continueNextTest){
            conectionREST();
            new Audio("click.wav").play();
            setTimeout(()=>{
                window.location.href = "../7-DelayedRecall/delayedRecallHTML.html?user="+user;
            },300);
        }
        else{
            window.alert("Tienes que acabar todo");
        }
    }
}
function timer(){
    timerCountDown=setInterval(()=>{
        time--;
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
        if(time==0){
            clearInterval(timerCountDown);
            recordStopButton3.click();
            showTimer.innerHTML="";
            continueNextTest=true;
            showPairs();
        }
    },1000);
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
            MOCA6:{
                "usuario":user,
                "tiempo":timeSpent,
                "audio1":recording1,
                "audio2":recording2,
                "audio3":recording3,
                "pareja1":text1.value,
                "pareja2":text2.value
            }
        }),
        headers:{
            "Content-type":"application/json"
        }
    }).then(response=>response.json());   
}