var ToDo = require("../models/todo.js"),
	User = require("../models/user.js"),
    toDosController = {};

var username = null
toDosController.index = function (req, res) { 
    console.log("Вызван ToDosController.index");
    username = req.params.username || null
    var respondWithToDos = function (query) { 
        ToDo.find(query, function (err, toDos) {
            if (err !== null) {
                res.json(500, err);
            } else {
                res.status(200).json(toDos);
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

toDosController.show = function (req, res) {
console.log("вызвано действие: показать");
res.send(200);
};

toDosController.create = function (req, res) {
    console.log("вызвано действие: добавить toDosController.create");
    console.log(req.body);

	var newToDo = new ToDo({
		"description": req.body.description,
		"tags": req.body.tags
	});

	console.log("username: " + username);

	User.find({"username": username}, function (err, result) {
		if (err) {
			res.send(500);
		} else {
			if (result.length === 0) {
				newToDo.owner = null;
			} else {
                console.log( result[0]._id);
				newToDo.owner = result[0]._id;
			}
			newToDo.save(function (err, result) {
				console.log(result);
				if (err !== null) {
					// элемент не был сохранен!
					console.log(err);
					res.json(500, err);
				} else {
					res.status(200).json(result);
				}
			});
		}
	});
};

toDosController.update = function (req, res) {
console.log("вызвано действие: обновить");
res.send(200);
};

toDosController.destroy = function (req, res) {
    var id = req.params.id;
    ToDo.deleteOne({"_id": id}, function (err, todo) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (todo.n === 1 && todo.ok === 1 && todo.deletedCount === 1) {
                res.status(200).json(todo);
            } else {
                res.status(404).json({"status": 404});
            }
        }
    });
};
module.exports = toDosController;