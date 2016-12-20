//basic server

var express=require("express");
var bodyparser=require('body-parser');
var app=express();

var port=process.env.PORT || 3000;
var todonextid=1;
var todos=[];
app.use(bodyparser.json());
app.get('/',function(req,res){
	res.send("todo api root");

});

//GET /todos
// get /todos/id
app.get('/todos',function(req,res){
	res.json(todos);
});


app.get('/todos/:id',function(req,res){

		var todoid=parseInt(req.params.id,10);
		var matchtodo;

		todos.forEach(function(todo){
			if(todoid===todo.id){
				matchtodo=todo;
			}
		});
		if(matchtodo){
			res.json(matchtodo);
		}
		else{
			res.status(404).send();
		}
		
});
app.post('/todos',function(req,res){
	var body=req.body;
	body.id=todonextid;
	todonextid++;
	todos.push(body);
	res.json(body);
});

app.listen (port,function(){
	console.log("express listenning on port"+ port+"!");
});