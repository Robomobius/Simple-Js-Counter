let number = getCookie("counterNumber");
let max = getCookie("counterMaxNum");
var displayTo = document.getElementById("numberText");
var maxInput = document.getElementById("maxInputBox");
var progressinner = document.getElementById("progbar");

if (number != "") {
	displayTo.innerHTML = number;
} else {
	number = 0;
}

if (max == "") {max = 500;}

let progress = 0;
const lerpolate = (x, y, a) => x * (1 - a) + y * a;
		
updateMaxNumber(max);
let proglerp = 0;
window.setInterval(lerp, 30);
window.addEventListener("keydown", countUp);
window.setInterval(isHideQuestionMark, 1);

function countUp()
{
	if(number<max) {
		number++;
		updateNum();
	}
}
function countDown()
{
	if(number>0) {
		number--;
		updateNum();
	}
}
function updateMaxNumber(inp) {
	if ((!isNaN(inp)) && inp != "") {
		max = inp;
		var expiryDate = new Date();
		expiryDate.setMonth(expiryDate.getMonth() + 1);
		document.cookie = "counterMaxNum=" + max + "; path = /; expires=" + expiryDate.toGMTString();
		if (number > inp){
			number = inp;
		}
		updateNum();
	} else {
		alert("Not a number!");
	}
}
function setNumber(inp) {
	if ((!isNaN(inp)) && inp != "") {
		if(0 <= inp && inp <= max) {
			number = inp;
			updateNum();
		}
	} else {
		alert("Not a number!");
	}
}
function updateNum() {
	displayTo.innerHTML = number;
	
	var expiryDate = new Date();
	expiryDate.setMonth(expiryDate.getMonth() + 1);
	document.cookie = "counterNumber=" + number + "; path=/; expires=" + expiryDate.toGMTString();

	progressbar();
}
function getCookie(cookiename) {
	var cookiestring = RegExp(cookiename+"=[^;]+").exec(document.cookie);
	return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "")
}
function reset() {
	number = 0;
	updateNum();
}
function progressbar() {
	progresstemp = 100*(number/max);
	progress = (progresstemp > 100 ? 100 : progresstemp < 0 ? 0 : progresstemp);
	progressinner.innerHTML = Math.floor(progress) + "%";
}
function lerp() {
	tmp = lerpolate(proglerp, progress, 0.2);
	proglerp = tmp;
	progressinner.style.minWidth = Math.max(proglerp, 5) + "%";
}
function controls() {
	controlwindow = window.open('controlpanel.html', "Counter Controls", "toolbar=yes,scrollbars=no,resizable=yes,top=500,left=500,width=600,height=800");
	if (restoreButtons !== null) {
		var restoreButtons = setInterval(showButtons, 4);
	}
	maxInputBox.style.display = "none";
	document.getElementById("text").style.display = "none";
	document.getElementById("setButton").style.display = "none";
	document.getElementById("b1").style.display = "none";
	document.getElementById("b2").style.display = "none";
	document.getElementById("b3").style.display = "none";
}
function isHideQuestionMark() {
	if (number/max > 0.01) {
		document.getElementById("text").style.display = "none";
	}
}
function showButtons() {
	if (controlwindow.closed) {
		maxInputBox.style.display = "";
		document.getElementById("setButton").style.display = "";
		document.getElementById("b1").style.display = "";
		document.getElementById("b2").style.display = "";
		document.getElementById("b3").style.display = "";
	}
}
function setBackground(colour) {
	document.body.style.background = "radial-gradient(circle, #cdcdcd 20%, " + colour + " 150%)";
}
function setBorder(colour) {
	document.documentElement.style.setProperty('--border', colour);
}
function changefont(font) {
	document.body.style.fontFamily = font;
}
function setTextCol(col) {
	document.body.style.color = col;
}
function submitBgImage(file) {
	document.body.style.background = "url(" + URL.createObjectURL(file) + ") no-repeat center /cover";
}
function submitLogoImage(file) {
	document.getElementById('logoImage').src = URL.createObjectURL(file);
}
function resetstyle(){
	document.body.style.background = 'radial-gradient(circle, var(--background) 50%, var(--border) 300%)';
	setTextCol("var(--dark)");
	changefont("sudburyBasin");
	setBorder("#e4cd25");
	drawLogo(false);
}
function drawLogo(bool){
	if(bool)
		{
		document.getElementById('logoImage').style.display = 'flex';
	} else {
		document.getElementById("logoImage").style.display = "none";
	}
}