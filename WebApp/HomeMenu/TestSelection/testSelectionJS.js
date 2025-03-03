var user=null;
var clickSound=new Audio("click.wav");
obtainUserName();
function startActivity(testId){
    clickSound.play();
    setTimeout(()=>{
        window.location.href = "../../../../"+testId+"?user="+user;
    },300);
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