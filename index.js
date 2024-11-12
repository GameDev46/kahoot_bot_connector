/*

 _____                         ______                 ___   ____ 
|  __ \                        |  _  \               /   | / ___|
| |  \/  __ _  _ __ ___    ___ | | | |  ___ __   __ / /| |/ /___ 
| | __  / _` || '_ ` _ \  / _ \| | | | / _ \\ \ / // /_| || ___ \
| |_\ \| (_| || | | | | ||  __/| |/ / |  __/ \ V / \___  || \_/ |
 \____/ \__,_||_| |_| |_| \___||___/   \___|  \_/      |_/\_____/


*/

/* 
	AUTHOR: GameDev46

	replit: https://replit.com/@GameDev46
	youtube: https://www.youtube.com/@gamedev46
	twitter: https://twitter.com/GameDev46
	github: https://github.com/GameDev46
*/

const Kahoot = require("kahoot.js-api");
const http = require("http");
const express = require("express");
const fs = require("fs");
const path = require('path');
const url = require("url")

const app = express();
var kahoots = [];
var kahootNameIndex = [];

var gameID = "";
var bot_count = 150;

const botNames = ["Thomas", "Peter", "Charlotte", "Sarah", "Bob", "Jeff", "Tony", "😂", "😆", "😃", "KahootMan52", "🥸", "Isabella", "GamerMan53", "qwerty", "123456789", "Steven", "Stephen", "Jeremy", "£&@/)/£/", "🍌", "🥔", "🥖", "⚽️🏀🏈⚾️", "💢", "Siri", "Cortana", "Google assistant", "Google", "Bing", "Mark Zuckerberg", "Jeff Bezos", "Bill Gates", "Virgin airlines", "Easy jet", "ur mum", "joe mama", "dwayne johnson", "Benjamin", "moe", "lester", "Beluga", "Imagine losing", "⠀⠀", "Big Boy Elon", "Elon Musk", "Tickle my Tesla", "KahootMan56", "Electrifying Elon ⚡⚡🔌💡", "Big Boy Zuckerberg", "Big Boy BEZOS", "Zucky", "GamerBoy72", "KahootMan"];

// Make blank name more likely

function startNewKahoot() {

	let kahootListLength = kahoots.length;

	for (var i = 0; i < bot_count; i++) {

		// Add new bot
		
		kahoots.push(new Kahoot());

		let botName = botNames[Math.floor(Math.random() * (botNames.length - 1))];
		botName = botName + " " + (i + kahoots.length);

		kahootNameIndex.push(botName);
		
		kahoots[kahootListLength + i].join(gameID, botName).catch(err => {
			console.log(`Failed to join: ${err.description}`);

			// Delete kahoot bot

			removeKahoot(this.kahoots[0])
		})

		
		kahoots[kahootListLength + i].on("Joined", () => {
			
			console.log("successfully joined game")
			
		});
		
		kahoots[kahootListLength + i].on("QuestionStart", question => {

			let questionAnsNum = Math.floor(Math.random() * question.quizQuestionAnswers[question.questionIndex]) + 0
				
			question.answer(questionAnsNum);
			
		});
		
		kahoots[kahootListLength + i].on("Disconnect", error => {
			console.log("disconnected because " + error);

			// Remove the kahoots bot from the list

			removeKahoot(this.kahoots[0])

		});

		kahoots[kahootListLength + i].on("QuizEnd", () => {
			// Remove the kahoot
			removeKahoot(this.kahoots[0])
		});

		// Continue with next bot
	}

console.log("FINISHED")

}

function removeKahoot(kahootItem) {

	if (kahootItem == null) {
		console.log("No item found to delete")
		return;
	}

	let kahootName = kahootItem.name
	let indexOfName = kahootNameIndex.indexOf(kahootName);

	if (kahoots[indexOfName].name == kahootName) {
		// Remove kahoot

		kahoots.splice(indexOfName, 1);
		kahootNameIndex.splice(indexOfName, 1);

		console.log("Remove Kahoot: " + kahootName);
		console.log(kahoots.length)
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
  var q = url.parse(req.url, true);
	var urlQuest = q.query;
	
	gameID = urlQuest.gameId;
	bot_count = urlQuest.botCount;

	if (bot_count > 100) {
		bot_count = 100;
	}
	else if (bot_count < 0) {
		bot_count = 0;
	}
	
	startNewKahoot();
	return res.end();
})


const port = process.env.PORT || 3000
app.listen(port, () => {console.log("Listening on port " + port)})
