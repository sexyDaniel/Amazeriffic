var main = function(toDosObj){
    var toDos = toDosObj.map(toDo=>{return toDo.description})
    $(".tabs a span").toArray().forEach(element=>{
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
                toDos.forEach(todo=>{
                    $content.append($("<li>").text(todo))
                })
                $("main .content").append($content);
            }else if ($element.parent().is(":nth-child(3)")){
                console.log("Tegs click")
                var organizedByTag = organizeByTags(toDosObj)
                organizedByTag.forEach(tag=>{
                    var $tagName = $("<h4>").text(tag.name)
                    $tagName.addClass("tagLable")
                    $content = $("<ul>")
                    tag.toDos.forEach(description=>{
                        var $li = $("<li>").text(description)
                        $content.append($li)
                    })
                    $("main .content").append($tagName)
                    $("main .content").append($content)
                })
            } else if ($element.parent().is(":nth-child(4)")){
                $content = $('<textarea type="text" class="description" placeholder="Введите новую задачу"/>'
			+'<textarea type="text" class="tags" placeholder="Введите теги"/>'+'<button class="addBtn">+</button>')
                $("main .content").append($content);
                $(".addBtn").on("click",function(){
                    var description=$(".description").val();
                    var tags = $(".tags").val().split(",");
                    console.log(tags)                      
                    if(description!=''){
                        var newToDo = {"description":description,"tags":tags}
                        $.post("/todos", newToDo, function (result) {
                            console.log(result);
                            toDosObj.push(newToDo)
                            toDos = toDosObj.map(toDo=> {return toDo.description}) 
                            alert("Добавлена новая задача");
                            $(".description").val("")
                            $(".tags").val("")
                        });                           
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

var organizeByTags = function (toDoObjects) {
    var tags = []
    toDoObjects.forEach(toDo => {
        toDo.tags.forEach(tag=>{
            if(tags.indexOf(tag)===-1)
            tags.push(tag)
        })
    });
    var tagObjects = tags.map(tag=>{
        var toDoWithTags = []
        toDoObjects.forEach(toDo=>{
            if(toDo.tags.indexOf(tag)!==-1){
                toDoWithTags.push(toDo.description)
            }
        })
        return {"name":tag,"toDos":toDoWithTags}
    })
    return tagObjects
};
