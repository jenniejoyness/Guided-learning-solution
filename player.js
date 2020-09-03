var url = 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&amp;refresh=true&amp;env=dev&amp;type=startPanel&amp;vars%5Btype%5D=startPanel&amp;sid=none&amp;_=1582203987867';
         

//Http.open("GET", "https://jsonplaceholder.typicode.com/posts");

//httpGetAsync(url,callback)

function httpGetAsync(theUrl, callback)
{
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() { 
        if (req.readyState == 4 && req.status == 200)
            callback(req.responseText);
    }
    req.open("GET", theUrl, true); // true for asynchronous 
    req.send(null);

}

function jsonp(url, callback) {
    var callbackName = 'jsonp_callback';
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

function callback(jsonpObject) {
	var dataObject = jsonpObject["data"];
	var cssContent = dataObject["css"];
    var stepsArray = getSteps(dataObject);
	var tiplates = getTiplates(dataObject);
	var tipArray = getTips(stepsArray);
	//makeTip(tipArray[0], tipArray[1], tiplates[0]);

	//css file
	createCss(cssContent);

}

jsonp(url,callback);




function createCss(cssContent) {
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = cssContent;
	document.body.appendChild(style);

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
	var first = stepsArray[1];
	var action = first["action"];
	var contents = action["contents"];
	var content = contents["#content"];
	var selector = action["selector"]
	return [content,selector];

}

function makeTip(content,selector,tiplates){
	var se = document.querySelector(selector);
	const div = document.createElement('div');
	div.textContent = tiplate;
	document.se.appendChild(div);

}
