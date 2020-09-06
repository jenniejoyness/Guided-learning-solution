
var url = 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&amp;refresh=true&amp;env=dev&amp;type=startPanel&amp;vars%5Btype%5D=startPanel&amp;sid=none&amp;_=1582203987867';
     

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

	createCss(cssContent);
	createTemplates(dataObject);

	var stepsArray = getStepsStructure(dataObject);
	var stepsInfo= getStepsInfo(stepsArray);
    
    tippy();
	makeTips(stepsInfo);
	//makeTipWithBootstrap();
	


}

jsonp(url,callback);



function regToolTip(selector){
	selector.appendChild(style);
	var div = document.createElement('div');
	div.setAttribute("class","tooltip");
	selector.appendChild(div);
	var span = document.createElement('span');
	span.setAttribute("class","tooltiptext")
	span.textContent = "Jennie"
	div.appendChild(span);


}


function createCss(cssContent) {
	var style = document.createElement('style');
	style.innerHTML = cssContent;
	document.head.appendChild(style);

}


function getStepsStructure(dataObject){
	var structure = dataObject["structure"];
	var steps = structure["steps"];
	return steps;
}



// return the tip selectors and the content
function getStepsInfo(stepsArray) {
	var stepsInfo = [];
	var stepObj = [];
	stepsArray.forEach(function(step){
		stepObj = [];
		var action = step["action"];
		var id = step["id"];
		stepObj.push(id);
		if (action.type == "closeScenario") {
	            stepObj.push("closeScenario")
	         
		} else if (action.type == "tip") {
			stepObj.push("tip")
			   selector = action["selector"]
			    contents = action["contents"];
			    content = contents["#content"];
			    stepObj.push(selector);
			    stepObj.push(content);
		}
		stepsInfo.push(stepObj);
		
	})

	return stepsInfo;

}
var counter =1;
// create tip elements
// step [id,type,selector,content]
function makeTips(stepsInfo){
    var step = stepsInfo[0];
		//check type
	if (step[1] == "tip") {
		var selectorObj = getSelector(step[2]);
		if(selectorObj.id == ""){
			selectorObj.id = step[0];
		}
		var div = document.createElement('div');
		var tip = document.getElementById("tip");
        div.innerHTML =  tip.innerHTML;
        selectorObj.parentNode.insertBefore(div, selectorObj);
        //content
        var content = div.getElementsByClassName("popover-content")[0];
        content.innerHTML += step[3];
        //steps
		var count = div.getElementsByClassName("steps-count")[0];
		var split = count.textContent.split(" ");
		count.textContent = split[0] + counter + split[1] + stepsInfo.length;
		counter += 1;
        
        var popover = div.getElementsByClassName("popover-title")[0];
        var close = popover.getElementsByTagName('button')[0];
        close.tip = div;

		close.addEventListener("click", closeButton);

	} else if (step[1] == "closeScenario") {
		console.log("closing");
	}
	

}
  

function closeButton(event){
	event.currentTarget.parentNode.parentNode.remove();

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

function getSelectorWithcontainText(selectorText){
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

