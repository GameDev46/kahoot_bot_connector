const Kahoot = require("kahoot.js-latest");
const http = require("http");
const express = require("express");
const fs = require("fs");
const path = require('path');
const url = require("url")

const app = express();

let kahoots = {};
let kahootUniqueID = 0;

let gameID = "";
let bot_count = 150;

const botNames = ["Thomas", "Peter", "Charlotte", "Sarah", "Bob", "Jeff", "Tony", "😂", "😆", "😃", "KahootMan52", "🥸", "Isabella", "GamerMan53", "qwerty", "123456789", "Steven", "Stephen", "Jeremy", "£&@/)/£/", "🍌", "🥔", "🥖", "⚽️🏀🏈⚾️", "💢", "Imagine losing", "⠀⠀", "KahootMan56", "GamerBoy72", "KahootMan"];

function startNewKahoot() {

	// Add the new bots
	for (var i = 0; i < bot_count; i++) {

		// Randomly select the bots name
		let botName = botNames[Math.floor(Math.random() * (botNames.length - 1))];
		botName = `${botName} ${kahootUniqueID}`;

		// Create the new bot
		kahoots[botName] = new Kahoot();
		kahoots[botName].botID = botName
		
		// Join the kahoot game
		kahoots[botName].join(gameID, botName).catch(err => {
			console.log(`Failed to join: ${err.description}`);
			// Remove the bot
			removeKahoot(this.botID)
		})

		
		kahoots[botName].on("Joined", () => {		
			console.log("successfully joined game")
		});
		
		kahoots[botName].on("QuestionStart", question => {
			// Randomly select an answer
			let questionAnsNum = Math.floor(Math.random() * question.numberOfChoices);		
			question.answer(questionAnsNum);
		});
		
		kahoots[botName].on("Disconnect", error => {
			console.log("Disconnected: " + error);
			// Remove the bot
			removeKahoot(this.botID)

		});

		kahoots[botName].on("QuizEnd", () => {
			// Remove the bot
			removeKahoot(this.botID)
		});

		kahootUniqueID++;
	}

}

function removeKahoot(kahootBotName) {

	if (kahootBotName in kahoots) {
		// Remove kahoot
		delete kahoots[kahootBotName]

		console.log("Remove Kahoot: " + kahootBotName);
		console.log("Total kahoots: " + kahoots.length)
	}
}

			
app.use(express.static(path.join(__dirname, '/public')));


app.get("/", (req, res) => {
	fs.readFile("/public/index.html", "utf8", (err, data) => {
		if (err) throw err;

		res.write(data)
		return res.end();
	})
})

app.get("/api/spam", (req, res) => {
	let q = url.parse(req.url, true);
	let urlQuest = q.query;
	
	gameID = urlQuest.gameId;
	bot_count = urlQuest.botCount;

	if (bot_count > 100) bot_count = 100;
	else if (bot_count < 0) return res.end();
	
	startNewKahoot();
	return res.end();
})


const port = process.env.PORT || 3000
app.listen(port, () => {console.log("Listening on port " + port)})
const port = process.env.PORT || 3000
app.listen(port, () => {console.log("Listening on port " + port)})
