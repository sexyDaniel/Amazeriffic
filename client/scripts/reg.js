$(document).ready(function(){
    $(".input").on("click", function () {
        var login = {"login":$(".login").val()}
        $.post("/login", login, function (result) {
            console.log(result);
            if (result.message==="yes"&&result.admin){
                alert("Добро пожаловать Admin12345");
                document.location.href = "/users/"+login.login+"/admin.html"
            }else if(result.message==="yes"&&!result.admin){
                alert("Добро пожаловать " + login.login);
                document.location.href = "/users/"+login.login+"/notes.html"
            }else{
                alert("Неправильно введенный логин или его нет");
            }
        });      
    })

    $(".reg").on("click", function () {
        var login = {"login":$(".login").val()}
        $.post("/registration",login, function (result) {
            console.log(result)
            if (result.message==="yes"){
                alert("Вы зарегестрированы. Добро пожаловать "  + login.login);
                document.location.href = "/users/"+login.login+"/notes.html"
            }else if(result.message==="no"){
                alert("Такой пользователь уже есть");
            }
        })
    })
});
