var main = function(){
    var tabActive = function(num){
        $(".tabs span").removeClass("active");
        $(".tabs a:nth-child("+num+") span").addClass("active");
        $("main .content").empty();
    }
    $(".tabs a:nth-child(1)").on("click",function(){
        tabActive(1);
        return false;
    });
    $(".tabs a:nth-child(2)").on("click",function(){
        tabActive(2);
        return false;
    });
    $(".tabs a:nth-child(3)").on("click",function(){
        tabActive(3);
        return false;
    });
    
}
$(document).ready(main);