var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

// GET /todos
app.get('/todos', function (req, res) {
	var queryParams=req.query;
	var filteredTodos=todos;
	//if has property && completed ===true

	if(queryParams.hasOwnProperty('completed') && queryParams.completed==='true'){
		filteredTodos=_.where(filteredTodos,{completed:true});
	}
	else if(queryParams.hasOwnProperty('completed') && queryParams.completed==='false') {
			filteredTodos=_.where(filteredTodos,{completed:false});
	}
	if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
		filteredTodos = _.filter(filteredTodos, function (todo) {
			return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
		});
	}
	res.json(filteredTodos);

});

// GET /todos/:id
app.get('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
});

// POST /todos
app.post('/todos', function (req, res) {
	var body = _.pick(req.body, 'description', 'completed');

	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}

	body.description = body.description.trim();	
	body.id = todoNextId++;

	todos.push(body);
	
	res.json(body);
});


app.delete('/todos/:id',function(req,res){
	var todoId=parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});//wat we wanna filter by
	if(!matchedTodo){
		res.status(404).json({"error":"no todo found with that id"});
	}else{

		todos=_.without(todos,matchedTodo);//the new list equals old list but without matched todo
		res.json(matchedTodo);		
	}
});


app.put("/todos/:id",function(req,res){
	var todoId=parseInt(req.params.id, 10);

	var matchedTodo = _.findWhere(todos, {id: todoId});//wat we wanna filter by

	var body = _.pick(req.body, 'description', 'completed');
	body.hasOwnProperty('completed');
	var validattr={};
	if(!matchedTodo){
		return res.status(404).send();
	}

	if (body.hasOwnProperty('completed')&& _.isBoolean(body.completed)){
		validattr.completed=body.completed;
	}else if(body.hasOwnProperty('completed')){
		return res.status(400).send();

	}else{
			//never provided attritubute
	}
	if (body.hasOwnProperty('description') &&_.isString(body.description) && body.description.trim().length > 0) {
		validattr.description=body.description;
	}else if(body.hasOwnProperty('description')){
			return res.status(400).send();

	}
		_.extend(matchedTodo,validattr);
		res.json(matchedTodo);
		
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});


















