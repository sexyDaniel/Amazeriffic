var toDoObjects = [
        {
            "description" : "Прочитать книгу",
            "tags" : [ "Книги", "чтение" ]
        },
        {
            "description" : "Купить молоко",
            "tags" : [ "покупки", "магазин" ]
        },
        {
            "description" : "Написать курсач",
            "tags" : [ "учеба", "обязательно" ]
        },
        {
            "description" : "Сдать лабу",
            "tags" : [ "учеба" ]
        },
        {
            "description" : "Посмотреть лекцию",
            "tags" : [ "учеба", "питомцы" ]
        },
        {
            "description" : "Пройти собеседование",
            "tags" : [ "работа", "полезно" ]
        },
        {
            "description" : "Сделать домашку",
            "tags" : [ "учеба" ]
        }
    ];
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
    console.log(tagObjects);
};
var main = function () {
    "use strict";
    organizeByTags(toDoObjects);
};
$(document).ready(main);
    