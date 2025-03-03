//https://www.researchgate.net/publication/276832825/figure/fig1/AS:1086783378980870@1636120757957/Montreal-Cognitive-Assessment-MOCA.jpg
//https://catch-on.org/wp-content/uploads/2016/12/MoCA-Test-Spanish.pdf

var text1=document.getElementById("Text1");
var text2=document.getElementById("Text2");
var text3=document.getElementById("Text3");
var text4=document.getElementById("Text4");
var text5=document.getElementById("Text5");

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

function startMOCA(){
    var confirm=window.confirm("¿Desea continuar?");
    if(confirm==true){
        if(text1.value!="" && text2.value!="" &&text3.value!="" && 
            text4.value!="" && text5.value!="" ){
                conectionREST();
            window.location.href = "1-Visuospatial/visuospatialHTML.html?user="+text1.value;
        }
        else{
            window.alert("Rellene todos los campos");
        }
    }
}

function conectionREST(){
    fetch("http://localhost:8080/api/user/moca",
    {
        method:'POST',
        body:JSON.stringify({
            MOCA0:{
                "usuario":text1.value,
                "estudios":text2.value,
                "sexo":text3.value,
                "nacimiento":text4.value,
                "fecha":text5.value,
                "tiempo":timeSpent
            }
        }),
        headers:{
            "Content-type":"application/json"
        }
    }).then(response=>response.json());   
}