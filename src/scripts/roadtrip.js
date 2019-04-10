
var roadTripObj = {};

function setPageValues(xmlDoc){
	var xmldoc = xmlDoc;
	console.log(xmldoc);
	let title = xmldoc.getElementsByTagName("title")[0];
	document.getElementById("title").innerHTML = title.innerHTML;
	let subtitle = xmldoc.getElementsByTagName("subtitle")[0];
	console.log(subtitle);
	document.getElementById("subtitle").innerHTML = subtitle.innerHTML;

	let previewURL = xmldoc.querySelectorAll("preview url")[0].innerHTML;
	let previewURLWidth = xmldoc.querySelectorAll("preview width")[0].innerHTML;
	let previewURLHeight = xmldoc.querySelectorAll("preview height")[0].innerHTML;
	console.log(previewURLWidth);
	document.getElementById("video_frame").width = previewURLWidth;
	document.getElementById("video_frame").height = previewURLHeight;
	console.log(document.getElementById("video_frame").width)
	document.getElementById("video_frame").src = previewURL;
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
	xhttp.open("GET", "/config/config.xml", true);
	xhttp.send();
}

document.addEventListener("DOMContentLoaded", function(){

	httpRequest();
});