var main = function(toDosObj){
    var toDos = toDosObj.map(function(toDo){
        return toDo.description
    })
    $(".tabs a span").toArray().forEach(function(element){
        $(element).on("click",function(){
            var $element = $(element)
            var $content;
            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();
            if($element.parent().is(":nth-child(1)")){
                $content = $("<ul>")
                for(var num = toDos.length-1;num>=0;num--){
                    $content.append($("<li>").text(toDos[num]))
                }
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(2)")){
                $content = $("<ul>")
                toDos.forEach(function(todo){
                    $content.append($("<li>").text(todo))
                })
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(3)")){
                $content = $('<textarea type="text" class="newQuestion" placeholder="Введите новую задачу"/>'+
				'<button class="addBtn">+</button>')
                $("main .content").append($content);
                var newQuestion;
                $(".addBtn").on("click",function(){
                    newQuestion = $(".newQuestion").val();
                    if(newQuestion!=''){
                        toDos.push(newQuestion);
                        alert("Добавлена новая задача");
                        $(".newQuestion").val("")
                    }
                })
            } 
            return false;
        })
    })
    $(".tabs a:first-child span").trigger("click");
}
$(document).ready(function(){
    $.getJSON("toDosTags.json",function(toDosObj){
        main(toDosObj)
    })
});
