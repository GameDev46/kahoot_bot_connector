const botCountItem = document.getElementById("botCount");
const roomIdItem = document.getElementById("gameID");

document.getElementById("sendRequest").addEventListener("click", e => {

  fetch("/api/spam?botCount=" + botCountItem.value + "&gameId=" + roomIdItem.value)
	.then(res => {
		alert("Success")
	})
	.catch(err => {
		alert("error occured, please try again")
	})
	
})