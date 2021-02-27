var express = require("express"),
http = require("http"),
app = express(),
toDos = [
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
    },
    {
        "description" : "Сделать ",
        "tags" : [ "bfbdbvf" ]
    }
];
app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(3000);
app.get("/toDosTags.json", function (req, res) {
    res.json(toDos);
});
app.post("/todos", function (req, res) {
    console.log("Данные были отправлены на сервер!");
    // простой объект отправлен обратно
    res.json({"message":"Вы размещаетесь на сервере!"});
});
