
var url = 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&amp;refresh=true&amp;env=dev&amp;type=startPanel&amp;vars%5Btype%5D=startPanel&amp;sid=none&amp;_=1582203987867';
var counter = 1;
var idArray = [];
var stepsInfo = {};   
var currentSelector;  

start(url,GLS);

//requests a json guide from the url and sends to the callback function to deal with the json object
function start(url, callback) {
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


//collects info from the jsonp object
// creates css and templates on the html page
// starts the ball rolling with making the first tip
function GLS(jsonpObject) {
	//parses data from jasonp object
	var dataObject = jsonpObject["data"];
	var cssContent = dataObject["css"];
	// creates new elements on the http page
	createCss(cssContent);
	createTemplates(dataObject);
	// sorts new info for the tips
	var stepsArray = getStepsStructure(dataObject);
	createStepsInfo(stepsArray);
    //start first tip
	makeTip(idArray[0]);	

}



// add the css to the html page
function createCss(cssContent) {
	var style = document.createElement('style');
	style.innerHTML = cssContent;
	document.head.appendChild(style);

}

//return the steps feild from the dataObject
function getStepsStructure(dataObject){
	var structure = dataObject["structure"];
	var steps = structure["steps"];
	return steps;
}



// Defines the dictionary with the info of steps and an idArray
function createStepsInfo(stepsArray) {
	var stepObj = [];
	stepsArray.forEach(function(step){
		stepObj = [];
		var action = step["action"];
		var id = step["id"];
		
		idArray.push(id);
		if (action.type == "closeScenario") {
	            stepObj.push("closeScenario")
	         
		} else if (action.type == "tip") {
			stepObj.push("tip")
			   selector = action["selector"]
			    contents = action["contents"];
			    content = contents["#content"];
			    placement = action["placement"];
			    stepObj.push(selector);
			    stepObj.push(content);
			    stepObj.push(placement);
		}
		//stepsInfo.push(stepObj);
		stepsInfo[id] = stepObj ;
		
	})


}

// creates tip element from the template and all the other info found in the stepsInfo dictionary
// step = [type,selector,content,placement]
function makeTip(id){
    currentSelector = stepsInfo[id][1];

    var step = stepsInfo[id];
	var selectorObj = getSelector(step[1]);

	var div = document.createElement('div');
	// get tip template and insert in html
	var tip = document.getElementById("tip");
	div.innerHTML =  tip.innerHTML;
	//content
	var content = div.getElementsByClassName("popover-content")[0];
	content.innerHTML += step[2];
	//steps
	var count = div.getElementsByClassName("steps-count")[0];
	var split = count.textContent.split(" ");
	count.textContent = split[0] + counter + split[1] + (idArray.length -1);
	//position
	positionElement(div, step[3])
	// insert into html
	selectorObj.parentNode.insertBefore(div, selectorObj);
	// find all the buttons
	var popover = div.getElementsByClassName("popover-title")[0];
	var close = popover.getElementsByTagName('button')[0];
	var next =  div.getElementsByClassName("next-btn")[0];
	var prev = div.getElementsByClassName("prev-btn");
	var reminder = prev[0];
	var back = prev[1];
	// event listeners for the buttons
	close.addEventListener("click", closeButton);
	next.addEventListener("click", nextButton);
	reminder.addEventListener("click", reminderButton);
	back.addEventListener("click", backButton);

}

function positionElement(element, position){
	element.style.position = 'relative'
	if(position == "right"){
		element.style.right = '20px';
	} else if (position == "left"){ 
		element.style.left = '20px';

	} else if (position == "bottom"){
		element.style.bottom ='20px';

	} else if (position == "top"){
		element.style.top = '20px';

	}
}
  

function closeButton(event){
	event.currentTarget.parentNode.parentNode.remove();

}

function nextButton(event) {
	var selectorObj;
	var idCounter = 0;
	for (var id in stepsInfo){
		// the selector in the stepsInfo dictionary matches the current selector
	    if (stepsInfo[id][1] == currentSelector) {
	    	// delete tip
			event.currentTarget.parentNode.parentNode.parentNode.parentNode.remove();
		//end of steps, do not make new tip
		if (idCounter + 1 == idArray.length) {
			currentSelector = stepsInfo[id][1];
			return;
			//otherwise make new tip
		} else {
			counter +=1;
			makeTip(idArray[idCounter +1]);
			return;
		}
}
	idCounter +=1;
}
	
    
}

function backButton(event){
	var selectorObj;
	var idCounter = 0;
	event.currentTarget.parentNode.parentNode.parentNode.parentNode.remove();
		for (var id in stepsInfo){
	    if (stepsInfo[id][1] == currentSelector) {
	    	// delete tip
			event.currentTarget.parentNode.parentNode.parentNode.parentNode.remove();
		//cannot go back because it is the first step
		if (idCounter  == 0) {
			currentSelector = stepsInfo[id][1];
			return;
			//otherwise create the previous tip again
		} else {
			counter -=1;
			makeTip(idArray[idCounter - 1]);
			return;
		}
}
	idCounter +=1;
}


}

function reminderButton(event){
	// for now just remove
	event.currentTarget.parentNode.parentNode.parentNode.parentNode.remove();
	
}

// returns selector from the document
function getSelector(selectorText){

	var selectorObj;
	//check if the selectorTex is a real selector or not
	if(includesContains(selectorText)) {
		//parse and find the selector in the document
		selectorObj =  getSelectorWithcontainText(selectorText);
	} else {
		//find selector in document
		selectorObj = document.querySelector(selectorText);
	}
	return selectorObj;

}

// invesitages if the selectorText is a real selector and returns a boolean
function includesContains(selectorText){
	if (selectorText.includes("contains")) {
		return true;
	} else {
		return false;
	}
}

// finds the real selector from the selectorText.
function getSelectorWithcontainText(selectorText){
	var split = selectorText.split(":")
	var selector = split[0];
	var containsText = split[1];
	containsText = containsText.split("contains(\"")[1];
	containsText = containsText.split("\"\)")[0];
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
	//var fragment = document.createDocumentFragment();
	templateNames.forEach(function (name) {
		var tiplates = dataObject["tiplates"];
		tiplate = tiplates[name];
		var templateObj = document.createElement("template");
		templateObj.id = name;
		templateObj.innerHTML = tiplate;
			document.body.appendChild(templateObj);
	})

}

