var url = 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&amp;refresh=true&amp;env=dev&amp;type=startPanel&amp;vars%5Btype%5D=startPanel&amp;sid=none&amp;_=1582203987867';
         
var req = new XMLHttpRequest();
//Http.open("GET", "https://jsonplaceholder.typicode.com/posts");
req.open("GET", url);
req.onreadystatechange = function(){
	if(this.readyState == 4 && this.status == 200){
		 const data = req.responseText;
		 format(data);

}
}
req.responseType = 'text';
req.send();

function getTips(jsonObj){
	var first = jsonObj[0];
	const myH2 = document.createElement('h2');
	// myH2.textContent = first.title;
	myH2.textContent = "jennie";
	console.log(first.title);
	document.body.appendChild(myH2);

}

function format(response) {
	var res = response.split("__5szm2kaj(");
	var res = res[1];
	res.substring(0, res.length-2);
	console.log(res);
}


// function convertToJson(textfile){
// 	console.log(textfile);
// 	var json = JSON.parse(textfile);

// }


// const input = document.querySelector('input[type="file]')
// input.addEventListener('change', function(e){
// 	console.log(input.files)
// 	const reader = new FileReader()
// 	reader.onload = function () {
// 		var result = reader.result;
// 	}
// 	reader.readAsText(input.files[0])
// },false);