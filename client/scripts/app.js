var main = function(toDosObj){
    var tabs = [];
	// добавляем вкладку Новые
	tabs.push({
        "name": "Новые",
        "content": function (callback) {
            $.getJSON("toDosTags.json", function (toDoObjects) {
                var $content,
                    i;
                $content = $("<ul>");
                for (i = toDoObjects.length - 1; i >= 0; i--) {
                    var $todoListItem = liaWithDeleteOnClick(toDoObjects[i]);
                    $content.append($todoListItem);
                }
                callback(null, $content);
            }).fail(function (jqXHR, textStatus, error) {
                callback(error, null);
            });
        }
    });
    tabs.forEach(function (tab) {
		var $aElement = $("<a>").attr("href",""),
			$spanElement = $("<span>").text(tab.name);
		$aElement.append($spanElement);
		$("main .tabs").append($aElement);

		$spanElement.on("click", function () {
			var $content;
			$(".tabs a span").removeClass("active");
			$spanElement.addClass("active");
			$("main .content").empty();
			tab.content(function (err, $content) {
				if (err !== null) {
					alert ("Возникла проблема при обработке запроса: " + err);
				} else {
					$("main .content").append($content);
				}
			});
			return false;
		});
	});
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

var liaWithDeleteOnClick = function(todo) {
    var $todoListItem = $("<li>").text(todo.description),
        $todoRemoveLink = $("<a>").attr("href", "todos/" + todo._id);
    $todoRemoveLink.text("Удалить");
    $todoRemoveLink.addClass("delete")
    console.log("todo._id: " + todo._id);
    console.log("todo.description: " + todo.description);
    $todoRemoveLink.on("click", function () {
        $.ajax({
            "url": "todos/" + todo._id,
            "type": "DELETE"
        }).done(function (response) {
            $(".tabs a:first-child span").trigger("click");
        }).fail(function (err) {
            console.log("error on delete 'todo'!");
        });
        return false;
    });
    $todoListItem.append($todoRemoveLink);
    return $todoListItem;
};
