
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

var tooltip = ".tooltip {\nposition: relative;\ndisplay: inline-block;\nborder-bottom: 1px dotted black;\n}\n" +
 ".tooltip .tooltiptext {\nvisibility: hidden;\nwidth: 120px;\nbackground-color: black;\ncolor: #fff;\ntext-align: center;\nborder-radius: 6px;\npadding: 5px 0;\nposition: absolute;\nz-index: 1;\n}\n"
 + ".tooltip:hover .tooltiptext {\nvisibility: visible;\n}"
var style = document.createElement('style');
style.innerHTML = tooltip;
//document.head.appendChild(style);


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

function tippy(){

//     var script = document.createElement("script");
// 	script.src = "https://unpkg.com/@popperjs/core@2/dist/umd/popper.min.js";
// 	document.body.appendChild(script);

// 	script = document.createElement("script");
// 	script.src = "https://unpkg.com/tippy.js@6/dist/tippy-bundle.umd.js";
// 	document.body.appendChild(script);

	script = document.createElement("script");
	script.src = "https://unpkg.com/@popperjs/core@2";
	document.body.appendChild(script);
	script = document.createElement("script");
	script.src="https://unpkg.com/tippy.js@6";
    document.body.appendChild(script);
}





// var r = document.createElement("div");
// r.setAttribute("class", "tooltip");
// document.head.appendChild(r);


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

// create tip elements
// step [id,type,selector,content]
function makeTips(stepsInfo){

	stepsInfo.forEach(function (step) {
		//check type
	if (step[1] == "tip") {
		var selectorObj = getSelector(step[2]);
		if(selectorObj.id == ""){
			selectorObj.id = step[0];
		}
		var div = document.createElement('div');
		var tip = document.getElementById("tip");
		
		tippy(selectorObj.id, {
        content: 'My tooltip!',
          });
		
	    
	    // adding the steps content and the tip template
		//selectorObj.innerHTML += step[3] + tip.innerHTML + "jennie";
		//if making another div
		//selectorObj.appendChild(div);
	} else if (step[1] == "closeScenario") {
		console.log("closing");
	}
	})

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


function makeTipWithBootstrap() {

	var el = document.createElement("link");
	el.setAttribute("rel","stylesheet");
	el.setAttribute("href","https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css");
	document.head.appendChild(el);
	el = document.createElement("script");
	el.setAttribute("src","https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js");
	document.head.appendChild(el);
	el = document.createElement("script");
	el.setAttribute("src","https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js");
	document.head.appendChild(el);
	var div = document.createElement("div");
	div.setAttribute("class","container");
	document.body.appendChild(div);
	el = document.createElement("h1");
	el.textContent = "Tooltip";
	div.appendChild(el);
	el = document.createElement("a");
	el.setAttribute("href","#");
	el.setAttribute("data-toggle","tooltip");
	el.setAttribute("title","Hooray");
	el.textContent = "Hover over me";
	div.appendChild(el);








}
// $(document).ready(function(){
//   $('[data-toggle="tooltip"]').tooltip();   
// });

