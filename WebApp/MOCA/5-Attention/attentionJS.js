var section2=document.getElementById("section2");

var recordButton=document.getElementById("record");
var recordStopButton=document.getElementById("recordStop");
var recordButton2=document.getElementById("record2");
var recordStopButton2=document.getElementById("recordStop2");
var buttonA=document.getElementById("buttonA");
var audio1 = document.querySelector('#audio1');
var audio2 = document.querySelector('#audio2');
var audio3 = document.querySelector('#audio3');
var text1=document.getElementById("Text1");
var text2=document.getElementById("Text2");
var text3=document.getElementById("Text3");
var text4=document.getElementById("Text4");
var text5=document.getElementById("Text5");

var user=null;
recordButton.disabled=true;
recordStopButton.disabled=true;
recordButton2.disabled=true;
recordStopButton2.disabled=true;
buttonA.disabled=true;
audio2.style["pointer-events"]="none";
audio3.style["pointer-events"]="none";
text1.disabled=true;
text2.disabled=true;
text3.disabled=true;
text4.disabled=true;
text5.disabled=true;
document.getElementById('section2').style["width"]=window.innerWidth-20+"px";

//***Recordings
var recording1=null;
var recording2=null;
var aClicked=0;

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
    audio1.addEventListener('play',function(){
        audio1.style["pointer-events"]="none";
        //recordButton.disabled=false;
    });
    audio1.addEventListener("ended", function(){
        recordButton.disabled=false;
    });
    audio2.addEventListener('play',function(){
        audio2.style["pointer-events"]="none";
        //recordButton2.disabled=false;
    });
    audio2.addEventListener("ended", function(){
        recordButton2.disabled=false;
    });
    audio3.addEventListener('play',function(){
        audio3.style["pointer-events"]="none";
        buttonA.disabled=false;
    });
    audio3.addEventListener("ended", function(){
        buttonA.disabled=true;
        text2.disabled=false;
        text1.disabled=false;
        text3.disabled=false;
        text4.disabled=false;
        text5.disabled=false;
    });
    
}
record(recordButton,recordStopButton);
record(recordButton2,recordStopButton2);

function record(record,recordStop){
    record.addEventListener('click', async () => {
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
                 else{
                    recording2=base64data;
                 }         
            }   
        }
        recordStop.addEventListener('click',()=>{
            if(!recordStopButton.disabled){
                audio2.style["pointer-events"]="auto";
            }
            else{
                audio3.style["pointer-events"]="auto";
            }
            recordStop.disabled=true;
            mediaRecorder.stop();
        });
    })
}

function letterAButton(){
    aClicked++;
}


function saveAnswers(){
    var confirm=window.confirm("¿Desea continuar?");
    if (confirm === true) {
        //Falta poner que esten con cosas los textos
        if(recording1==null || recording2==null || text1.value==""
        || text2.value==""|| text3.value==""|| text4.value==""
        || text5.value==""){
            window.alert("Tienes que acabar todo");
        }
        else{
                conectionREST();
                new Audio("click.wav").play();
                setTimeout(()=>{
                    window.location.href = "../6-Language/languageHTML.html?user="+user;
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
            MOCA5:{
                "usuario":user,
                "tiempo":timeSpent,
                "audio1":recording1,
                "audio2":recording2,
                "numeroDeA":aClicked,
                "resta7_1":text1.value,
                "resta7_2":text2.value,
                "resta7_3":text3.value,
                "resta7_4":text4.value,
                "resta7_5":text5.value,

            }
        }),
        headers:{
            "Content-type":"application/json"
        }
    }).then(response=>response.json());   
}