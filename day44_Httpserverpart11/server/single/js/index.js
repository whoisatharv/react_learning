function clock() {
	let now = new Date();
	let clockDivision = document.getElementById('clock');
	clockDivision.innerHTML = now.getHours() + ":"+ now.getMinutes() +":"+ now.getSeconds();
	setTimeout(clock, 1000);	
}

window.addEventListener("load", clock)