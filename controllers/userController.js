var User = require("../models/user.js"),
    ToDo = require("../models/todo.js");
var username=null
var UsersController = {};
UsersController.index = function (req, res) {
    console.log("Вызван UsersController.index");
    username = req.params.username || null
    var respondWithToDos = function (query) { 
        User.find(query, function (err, users) {
            if (err !== null) {
                res.json(500, err);
            } else {
                res.status(200).json(users);
            }
        });
    };
    if (username !== null) {
        console.log("Поиск пользователя: "+username);
        User.find({"username": username}, function (err, result) {
            if (err !== null) {
                res.json(500, err);
            } else if (result.length === 0) {
                res.status(404).json({"result_length": 0});
            } else {
                console.log( result[0]._id);
                respondWithToDos({"owner": result[0]._id});
            }
        });
    } else {
        respondWithToDos({});
    }
};

// Отобразить пользователя
UsersController.show = function (req, res) {
console.log("вызвано действие: показать");
res.send(200);
};

// Создать нового пользователя
UsersController.create = function (req, res) {
    console.log("вызвано действие: добавить UsersController.create");
    console.log(req.body);

	var newUser = new User({
		"username": req.body.username
	});

	newUser.save(function (err, result) {
        console.log(result);
        if (err !== null) {
            console.log(err);
            res.json(500, err);
        } else {
            res.status(200).json(result);
        }
    });
};

// Обновить существующего пользователя
UsersController.update = function (req, res) {
    var id = req.params.id;
    var newUser = {$set: {username: req.body.username}};
    User.updateOne({"_id": id}, newUser, function (err, user) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (user.n === 1 && user.nModified === 1 && user.ok === 1) {
                res.status(200).json(user);
            } else {
                res.status(404).json({"status": 404});
            }
        }
    });
};

// Удалить существующего пользователя
UsersController.destroy = function (req, res) {
    var id = req.params.id;
    ToDo.deleteMany({"owner": id}, function(err, result){
        console.log(result);
    });
    User.deleteOne({"_id": id}, function (err, user) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (user.n === 1 && user.ok === 1 && user.deletedCount === 1) {
                res.status(200).json(user);
            } else {
                res.status(404).json({"status": 404});
            }
        }
    });
};
module.exports = UsersController;