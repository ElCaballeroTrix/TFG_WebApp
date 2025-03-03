var showTimer=document.getElementById("timer");
var user=null;
document.getElementById('section2').style["width"]=window.innerWidth-20+"px";
var text1=document.getElementById("Text1");var text2=document.getElementById("Text2");
var text3=document.getElementById("Text3");var text4=document.getElementById("Text4");
var text5=document.getElementById("Text5");

var dayMonth=document.getElementById("Date1");var month=document.getElementById("Date2");
var year=document.getElementById("Date3");var dayWeek=document.getElementById("Date4");
var place=document.getElementById("Date5");var locality=document.getElementById("Date6");

var hint1=false;var hint2=false;var hint3=false;
var hint4=false;var hint5=false;
document.getElementById("buttonPista2Text1").disabled=true;
document.getElementById("buttonPista2Text2").disabled=true;
document.getElementById("buttonPista2Text3").disabled=true;
document.getElementById("buttonPista2Text4").disabled=true;
document.getElementById("buttonPista2Text5").disabled=true;
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



function showHint(id,hint){
    var snackbar1_1 = document.getElementById("snackbar1_1");var snackbar1_2 = document.getElementById("snackbar1_2");
    var snackbar2_1 = document.getElementById("snackbar2_1");var snackbar2_2 = document.getElementById("snackbar2_2");
    var snackbar3_1 = document.getElementById("snackbar3_1");var snackbar3_2 = document.getElementById("snackbar3_2");
    var snackbar4_1 = document.getElementById("snackbar4_1");var snackbar4_2 = document.getElementById("snackbar4_2");
    var snackbar5_1 = document.getElementById("snackbar5_1");var snackbar5_2 = document.getElementById("snackbar5_2");
    switch(hint){
        case 1:
            switch (id){
                case 1:
                    hint1=true;
                    snackbar1_1.innerHTML="Relacionado con CARA";
                    snackbar1_1.className="show";
                    setTimeout(function(){ snackbar1_1.className = snackbar1_1.className.replace("show", ""); document.getElementById("buttonPista2Text1").disabled=false;}, 3000);
                    break;
                case 2:
                    hint2=true;
                    snackbar2_1.innerHTML="Tipo de Fibra natural";
                    snackbar2_1.className="show";
                    setTimeout(function(){ snackbar2_1.className = snackbar2_1.className.replace("show", ""); document.getElementById("buttonPista2Text2").disabled=false;}, 3000);
                    break;
                case 3:
                    hint3=true;
                    snackbar3_1.innerHTML="Es un Edificio";
                    snackbar3_1.className="show";
                    setTimeout(function(){ snackbar3_1.className = snackbar3_1.className.replace("show", ""); document.getElementById("buttonPista2Text3").disabled=false;}, 3000);
                    break;
                case 4:
                    hint4=true;
                    snackbar4_1.innerHTML="Tipo de Flor";
                    snackbar4_1.className="show";
                    setTimeout(function(){ snackbar4_1.className = snackbar4_1.className.replace("show", ""); document.getElementById("buttonPista2Text4").disabled=false;}, 3000);
                    break;
                case 5:
                    hint5=true;
                    snackbar5_1.innerHTML="Es un Color";
                    snackbar5_1.className="show";
                    setTimeout(function(){ snackbar5_1.className = snackbar5_1.className.replace("show", ""); document.getElementById("buttonPista2Text5").disabled=false;}, 3000);
                    break;
            }
            break;
        case 2:
            switch (id){
                case 1:
                    snackbar1_2.innerHTML="ROSTRO, OJOS o CABEZA";
                    snackbar1_2.className="show";
                    setTimeout(function(){ snackbar1_2.className = snackbar1_2.className.replace("show", ""); }, 3000);
                    break;
                case 2:
                    snackbar2_2.innerHTML="ALGODÓN, SEDA o LANA";
                    snackbar2_2.className="show";
                    setTimeout(function(){ snackbar2_2.className = snackbar2_2.className.replace("show", ""); }, 3000);
                    break;
                case 3:
                    snackbar3_2.innerHTML="PALACIO, MONASTERIO o IGLESIA";
                    snackbar3_2.className="show";
                    setTimeout(function(){ snackbar3_2.className = snackbar3_2.className.replace("show", ""); }, 3000);
                    break;
                case 4:
                    snackbar4_2.innerHTML="AMAPOLA, CLAVEL o ROSA";
                    snackbar4_2.className="show";
                    setTimeout(function(){ snackbar4_2.className = snackbar4_2.className.replace("show", ""); }, 3000);
                    break;
                case 5:
                    snackbar5_2.innerHTML="AZUL, VERDE o ROJO";
                    snackbar5_2.className="show";
                    setTimeout(function(){ snackbar5_2.className = snackbar5_2.className.replace("show", ""); }, 3000);
                    break;
            }
            break;
        
    }
}



function saveAnswers(){
    var confirm=window.confirm("¿Desea continuar?");
    if (confirm === true) {
        if(text1.value!="" && text2.value!="" && text3.value!="" && text4.value!="" 
        && text5.value!="" && dayMonth.value!="" && month.value!="" 
        && year.value!="" && dayWeek.value!="" && place.value!="" 
        && locality.value!=""){
            conectionREST();
            window.location.href = "../../HomeMenu/TestSelection/testSelectionHTML.html?user="+user;
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
            MOCA7:{
                "usuario":user,
                "tiempo":timeSpent,
                "palabra1":text1.value,
                "palabra2":text2.value,
                "palabra3":text3.value,
                "palabra4":text4.value,
                "palabra5":text5.value,
                "pistaPalabra1": hint1,
                "pistaPalabra2": hint2,
                "pistaPalabra3": hint3,
                "pistaPalabra4": hint4,
                "pistaPalabra5": hint5,
                "diaMes":dayMonth.value,
                "mes":month.value,
                "año":year.value,
                "diaSemana":dayWeek.value,
                "lugar":place.value,
                "localidad":locality.value
            }
        }),
        headers:{
            "Content-type":"application/json"
        }
    }).then(response=>response.json());   
}