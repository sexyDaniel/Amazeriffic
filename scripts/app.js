var main = function(){
    for(tabActive = 1;tabActive<=3;tabActive++){
        $(".tabs a:nth-child("+tabActive+") span").on("click",function(){
            $(".tabs span").removeClass("active");
            $(this).addClass("active");
            return false;
        });
    }
}
$(document).ready(main);