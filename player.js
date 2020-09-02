var url = 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&amp;refresh=true&amp;env=dev&amp;type=startPanel&amp;vars%5Btype%5D=startPanel&amp;sid=none&amp;_=1582203987867';
         
const Http = new XMLHttpRequest();
Http.open("GET", "https://jsonplaceholder.typicode.com/posts");
Http.responseType = 'json';
Http.send();

Http.onreadystatechange = function(){
	if(this.readyState == 4 && this.status == 200){
		 //console.log(Http.responseText);
		 const data = Http.response;
		 getTips(data);
 
}
}

function getTips(jsonObj){
	var first = jsonObj[0];
	const myH2 = document.createElement('h2');
	myH2.textContent = first.title;
	document.body.appendChild(myH2);

}