var url = 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&amp;refresh=true&amp;env=dev&amp;type=startPanel&amp;vars%5Btype%5D=startPanel&amp;sid=none&amp;_=1582203987867';
         

//Http.open("GET", "https://jsonplaceholder.typicode.com/posts");

//httpGetAsync(url,callback)


function jsonp(url, callback) {
    var callbackName = 'jsonp_callback';
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
        console.log("done!");
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

function callback(jsonpObject) {
	var dataObject = jsonpObject["data"];
	var cssContent = dataObject["css"];
    var stepsArray = getStepsStructure(dataObject);
	createTemplates(dataObject);
	var tipArray = getTips(stepsArray);
	makeTip(tipArray[0], tipArray[1]);

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


function getStepsStructure(dataObject){
	var structure = dataObject["structure"];
	var steps = structure["steps"];
	return steps;
}



// check every field before
function getTips(stepsArray){
	var first = stepsArray[1];
	var action = first["action"];
	var contents = action["contents"];
	var content = null;
	if (contents != null) {
		content = contents["#content"];
	}
	var selector = action["selector"]
	return [content,selector];

}

// create tip elements
function makeTip(content,selector){
	var selectorObj;
	if(includesContains(selector)) {
		selectorObj = containSelector(selector);
	} else {
		selectorObj = document.querySelector(selector);
	}
	
	const div = document.createElement('div');
	//div.innerHTML = tiplate;
	if (selectorObj != null) {
		//selectorObj.append(div);
		selectorObj.appendChild(div);

	}

}

// invesitages if the selectorText is a real selector and returns a boolean
function includesContains(selectorText){
	if (selectorText.includes("contains")) {
		return true;
	} else {
		return false;
	}
}

function containSelector(selectorText){
	var split = selectorText.split(":")
	var selector = split[0];
	var containsText = split[1];
	containsText = containsText.split("contains(\"")[1];
	containsText = containsText.split("\"\)")[0];a
	var selectors = document.querySelectorAll(selector);
	selectors.forEach( function(sel) {
		if (sel.textContent.includes(containsText)) {
			selector = sel;
		}
	});
	return selector;

}

// creating templates for the tips from json object
function createTemplates(dataObject){
	var templateNames = ["hoverTip", "tip"];
	var tiplate ;
	var fragment = document.createDocumentFragment();
	templateNames.forEach(function (name) {
		var tiplates = dataObject["tiplates"];
		tiplate = tiplates[name];
		var templateObj = document.createElement("template");
		templateObj.id = name;
		// need to fix
		templateObj.innerHTML = tiplate;
        fragment.appendChild(templateObj);
        document.body.appendChild(fragment);

// 		templateObj.innerHTML = tiplate;
// 		document.body.appendChild(templateObj);
	})

}