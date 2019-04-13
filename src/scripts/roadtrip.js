
var roadTripObj = {
	"videos" : {
		"preview" : ""
	},
	"current_video": "preview",
	"previous_video": "Day 9",
	"previous_video": "Day 1"
};

function navbarToggle(){
	let navbar = document.getElementById("navbar_responsive");
	let navbarOpen = document.getElementById("navbar_open");
	let navbarClose = document.getElementById("navbar_close");
	let is_visible = (navbar.style.display == "block") ? true : false;

	if (is_visible){
		navbar.style.display = "none";
	} else {
		navbar.style.display = "block";
	}

}

function setByClassName(className, value){
	let elements = document.getElementsByClassName(className);
	for (var x = 0; x < elements.length; x++){
		elements[x].innerHTML = value;
	}
}

function createListOfElements(tagName, list, destinationElement){
	let destElement = document.getElementById("days_menu_list");
	for (var x = 0; x < list.length; x++){
		let ele = document.createElement(tagName);
		ele.innerHTML = list[x].innerHTML;
		destElement.appendChild(ele);
	}
}

function setPageValues(xmlDoc){
	var xmldoc = xmlDoc;
	console.log(xmldoc);

	let title = xmldoc.getElementsByTagName("title")[0];
	setByClassName("title", title.innerHTML)

	let subtitle = xmldoc.getElementsByTagName("subtitle")[0];
	setByClassName("subtitle", subtitle.innerHTML);

	let days = xmldoc.querySelectorAll("day number");
	createListOfElements("li", days, "days_menu_list");

	// let previewURLWidth = xmldoc.querySelectorAll("preview width")[0].innerHTML;
	// let previewURLHeight = xmldoc.querySelectorAll("preview height")[0].innerHTML;
	// console.log(previewURLWidth);
	// document.getElementById("video_frame").width = previewURLWidth;
	// document.getElementById("video_frame").height = previewURLHeight;
	// console.log(document.getElementById("video_frame").width)

	let previewURL = xmldoc.querySelectorAll("preview url")[0].innerHTML;
	document.getElementById("video_frame").src = previewURL;

	console.log(roadTripObj);
}

function getXML(responseText){
	var parser = new DOMParser();
	let xmlDoc = parser.parseFromString(responseText, "text/xml");
	setPageValues(xmlDoc);
}

function httpRequest(filePath){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
			getXML(this.responseText);
		}
	}
	xhttp.open("GET", "/RoadTrip/config/config.xml", true);
	xhttp.send();
}

document.addEventListener("DOMContentLoaded", function(){
	httpRequest();
});