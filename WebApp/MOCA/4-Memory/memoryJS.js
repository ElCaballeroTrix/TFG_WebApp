var section2=document.getElementById("section2");
section2.style["height"]=window.innerHeight/3+"px";
var recordButton=document.getElementById("record");
var recordStopButton=document.getElementById("recordStop");
var audio = document.querySelector('#audio');
var showTimer=document.getElementById("timer");
var time=60;
var showTime=true;
var timerCountDown=null;
var user=null;
recordButton.disabled=true;
recordStopButton.disabled=true;
document.getElementById('section2').style["width"]=window.innerWidth-20+"px";

//***Recordings
var recording1=null;
var recording2=null;

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
sound();

function sound(){
    audio.addEventListener('play',function(){
        audio.style["pointer-events"]="none";
        //recordButton.disabled=false;
    });
    audio.addEventListener("ended", function(){
        recordButton.disabled=false;
    });
}
record();
function record(){
    recordButton.addEventListener('click', async () => {
        recordButton.disabled=true;
        recordStopButton.disabled=false;
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
                console.log(base64data);    
                if(recording1==null){
                    recording1=base64data;
                 }
                 else{
                    recording2=base64data;
                 }         
            }   
        }
        recordStopButton.addEventListener('click',()=>{
            recordStopButton.disabled=true;
            if(showTime){
                timer();
            }
            mediaRecorder.stop();
        });
    })
}


function saveAnswers(){
    var confirm=window.confirm("¿Desea continuar?");
    if (confirm === true) {
        if(recording1==null || recording2==null){
            window.alert("Tienes que grabarte 2 veces")
        }
        else{
                conectionREST();
                new Audio("click.wav").play();
                setTimeout(()=>{
                    window.location.href = "../5-Attention/attentionHTML.html?user="+user;
                },300);
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
            audio.style["pointer-events"]="auto";
            showTime=false;
            showTimer.innerHTML=``;
            clearInterval(timerCountDown);
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
            MOCA4:{
                "usuario":user,
                "tiempo":timeSpent,
                "audio1":recording1,
                "audio2":recording2
            }
        }),
        headers:{
            "Content-type":"application/json"
        }
    }).then(response=>response.json());   
}