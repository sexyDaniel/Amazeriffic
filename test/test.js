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
    console.log("organizeByTags вызвана");
};
var main = function () {
    "use strict";
    var organizeByTags = function(){
        console.log("organizeByTags вызвана");
    };
    organizeByTags(toDoObjects);
};
$(document).ready(main);
    