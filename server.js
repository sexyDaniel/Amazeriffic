var express = require("express"),
	http = require("http"),
	mongoose = require("mongoose"),
	usersController = require("./controllers/userController.js"),
	toDosController = require("./controllers/todoController.js"),
	app = express();

http.createServer(app).listen(3000);
app.use('/',express.static(__dirname + "/client"));
app.use('/users/:username',express.static(__dirname + "/client"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/amazerific', {useNewUrlParser: true,useUnifiedTopology: true })

app.get("/toDosTags.json", toDosController.index);
app.post("/todos", toDosController.create);
app.put("/todos/:id", toDosController.update);
app.delete("/todos/:id", toDosController.destroy);

app.get("/users/Admin12345/users.json", usersController.index);
app.post("/users",usersController.create);
app.post("/login",usersController.login);
app.post("/registration",usersController.registration);
app.put("/users/Admin12345/:id", usersController.update);
app.delete("/users/Admin12345/:id", usersController.destroy);

app.get("/users/:username/toDosTags.json", toDosController.index);
app.get("/users/:username/notes.html", toDosController.index);
app.post("/users/:username/toDosTags", toDosController.create);
app.put("/users/:username/todos/:id", toDosController.update);
app.delete("/users/:username/todos/:id", toDosController.destroy);

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});