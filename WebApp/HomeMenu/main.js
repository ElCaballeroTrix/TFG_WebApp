var text1=document.getElementById("Text1");
var text2=document.getElementById("Text2");
var text3=document.getElementById("Text3");
var text4=document.getElementById("Text4");
var text5=document.getElementById("Text5");
var text6=document.getElementById("Text6");

function startTest(){
    var confirm=window.confirm("¿Desea continuar?");
    if(confirm==true){
        if(text1.value!="" && text2.value!="" &&text3.value!="" && 
            text4.value!="" && text5.value!="" ){
                conectionREST();
                new Audio("TestSelection/click.wav").play();
                setTimeout(()=>{
                    window.location.href = "TestSelection/testSelectionHTML.html?user="+text1.value;
                },300);
        }
        else{
            window.alert("Rellene todos los campos");
        }
    }
}

function conectionREST(){
    fetch("http://localhost:8080/api/user/usuarios",
    {
        method:'POST',
        body:JSON.stringify({
            usuario:text1.value,
            estudios:text2.value,
            sexo:text3.value,
            nacimiento:text4.value,
            fecha:text5.value,
            edad:text6.value
        }),
        headers:{
            "Content-type":"application/json"
        }
    }).then(response=>response.json());   
}