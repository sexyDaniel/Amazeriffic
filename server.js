var express = require("express"),
	http = require("http"),
	mongoose = require("mongoose"),
	app = express(); 
app.use(express.static(__dirname + "/client"));
var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [ String ]
});
var ToDo = mongoose.model("ToDo", ToDoSchema);
http.createServer(app).listen(3000);
app.get("/toDosTags.json", function (req, res) {
    ToDo.find({}, function (err, toDos) {
        console.log(toDos)
        res.json(toDos);
    });
});
app.use(express.urlencoded());
mongoose.connect('mongodb://localhost/amazerific', {useNewUrlParser: true,useUnifiedTopology: true })
app.post("/todos", function (req, res) {
	console.log(req.body);
	var newToDo = new ToDo({"description":req.body.description,
		"tags":req.body.tags});
	newToDo.save(function (err, result) {
		if (err !== null) {
			console.log(err);
			res.send("ERROR");
		} else {
			ToDo.find({}, function (err, result) {
				if (err !== null) {
					res.send("ERROR");
				}
				res.json(result);
			});
		}
	});
});