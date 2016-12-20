//basic server

var express=require("express");
var app=express();

var port=process.env.PORT || 3000;

app.get('/',function(req,res){
	res.send("todo api root");

});

app.listen (port,function(){
	console.log("express listenning on port"+ port+"!");
});