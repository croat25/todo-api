var person={
	name:'andrew',
	age:21
}

function updateperson(obj){
	// obj={
	// 	name:'andrew',
	// 	age:24
	// }
	obj.age=24;
}

updateperson(person);
console.log(person);

var grades=[21,41];

console.log(grades);
function updategrades(obj){
	debugger;
	grades.push(obj);
}

updategrades(45);
console.log(grades);