var main = function(){
    var toDos = ["Прочитать книгу",
    "Купить молоко",
    "Написать курсач",
    "Сдать лабу",
    "Посмотреть лекцию",
    "Пройти собеседование",
    "Сделать домашку"]
    $(".tabs a span").toArray().forEach(function(element){
        $(element).on("click",function(){
            var $element = $(element)
            var $content;
            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();
            if($element.parent().is(":nth-child(1)")){
                console.log("1")
            } else if ($element.parent().is(":nth-child(2)")){
                $content = $("<ul>")
                toDos.forEach(function(todo){
                    $content.append($("<li>").text(todo))
                })
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(3)")){
                console.log("3")
            } 
            return false;
        })
    })
}
$(document).ready(main);