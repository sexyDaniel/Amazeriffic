$(document).ready(function(){
    $(".input").on("click", function () {
        $.getJSON("users.json", function (users) {
            var login = $(".login").val();
            console.log(login)
            if(!checkUser(users,login)){
                alert("Такого пользователя нет");
                $(".login").val("")
                return false
            }  
            if(login!==''){
                document.location.href = "http://localhost:3000/users/"+login+"/notes.html"
                return false;
            }
        })
    })

    $(".reg").on("click", function () {
        $.getJSON("users.json", function (users) {
            var login = $(".login").val();
            console.log(login)
            if(checkUser(users,login)){
                alert("Такой пользователь уже есть");
                $(".login").val("")
                return false
            }  
            if(login!==''){
                var newUser = {"username":login}
                $.post("/users", newUser, function (result) {
                    console.log(result);
                    alert("Вы зарегистрированы");
                    $("#username").val("")
                    document.location.href = "http://localhost:3000/users/"+login+"/notes.html"
                });    
                return false;
            }
        })
    })
});

var checkUser=(users,newUser)=>{
    console.log(users)
    for(var i =0; i<users.length;i++){
        if(users[i].username===newUser){
            return true
        }
    }
    return false
}