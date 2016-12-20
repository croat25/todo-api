//basic server

var express=require("express");
var app=express();

var port=process.env.PORT || 3000;

var todos=[{
	id:1,
	description: "meet mom for lunch",
	completed: false
},{
	id:2,
	description: "go to market",
	completed: false

},{
	id:3,
	description: "get viva a gift",
	completed: true

}

];

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


app.listen (port,function(){
	console.log("express listenning on port"+ port+"!");
});