var url = 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&amp;refresh=true&amp;env=dev&amp;type=startPanel&amp;vars%5Btype%5D=startPanel&amp;sid=none&amp;_=1582203987867';
         
var req = new XMLHttpRequest();
//Http.open("GET", "https://jsonplaceholder.typicode.com/posts");
req.open("GET", url);
req.onreadystatechange = function(){
	if(this.readyState == 4 && this.status == 200){
		 const data = req.responseText;
		 req = format(data);
		 var jsonObject = convertToJson(req);
		 var dataObject = jsonObject["data"];
		 var stepsArray = getSteps(dataObject);
		 var tiplates = getTiplates(dataObject);
		 getTips(stepsArray);


}
}
req.responseType = 'text';
req.send();



function format(response) {
	var res = response.split("__5szm2kaj(");
	var res = res[1];
	res = res.substring(0, res.length-1);
	return res;
}


function convertToJson(textfile){
	var jsonObject = JSON.parse(textfile);
	return jsonObject;

}

function getSteps(dataObject){
	var structure = dataObject["structure"];
	var steps = structure["steps"];
	return steps;
}

function getTiplates(dataObject){
	var tiplates = dataObject["tiplates"];
	var hoverTip = tiplates["hoverTip"];
	var tip = tiplates["tip"];
	return [hoverTip,tip];
}
function getTips(stepsArray){
	var first = stepsArray[3];
	var action = first["action"];
	var contents = action["contents"];
	var content = contents["#content"];
	var selector = action["selector"]
	makeTip(content,selector);
	const myH2 = document.createElement('h2');
	// myH2.textContent = first.title;
	myH2.textContent =content;
	
	document.body.appendChild(myH2);

}

function makeTip(content,selector){
	var se = document.querySelector(selector);
	console.log(se);

}
