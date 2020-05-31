// Challenge 1: Your age in days

function ageInDays() {
  var birthyear = prompt("In which year you were born... Good Friend?");
  var ageInDayss = (2020 - birthyear) * 365 * 0.25;
  var result = parseInt(ageInDayss);
  var h1 = document.createElement("h1");
  var textAnswer = document.createTextNode("You are " + result + " days old.");
  h1.setAttribute("id", "ageInDays");
  h1.appendChild(textAnswer);
  document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
  document.getElementById("ageInDays").remove();
}

//Challenge 2
function catGenerator() {
  var image = document.createElement("img");
  var div = document.getElementById("cat-gen");
  image.src =
    "https://thecatapi.com/api/images/get?format=src&type=gif&size=verysmall";
  div.appendChild(image);
}

//Challenge 3
function rpsGame(yourchoice) {
  var humanChoice = yourchoice.id;
  var botChoice = compChoice();
  var result = resultDecider(humanChoice, botChoice);
  var message = messageMaker(result);
  messageDisplayer(message, humanChoice, botChoice);
}

function messageDisplayer(message, userChoice, botChoice) {
  var userImg = document.getElementById(userChoice).src;
  var botImg = document.getElementById(botChoice).src;

  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  var humanDiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var messageDiv = document.createElement("div");

  var colorOfResult;
  if (message == "You Lost!") {
    colorOfResult = "red";
  } else if (message == "You Won!") {
    colorOfResult = "green";
  } else {
    colorOfResult = "yellow";
  }

  humanDiv.innerHTML =
    "<img src='" + userImg + "'width='140px' heigth='150px'> ";
  botDiv.innerHTML = "<img src='" + botImg + "' width='140px' heigth='150px'>";
  messageDiv.innerHTML =
    "<h1 style='color: " +
    colorOfResult +
    " ; padding-top: 50px; '>" +
    message +
    "</h1>";

  document.getElementById("fles-box-rps-div").appendChild(humanDiv);
  document.getElementById("fles-box-rps-div").appendChild(messageDiv);
  document.getElementById("fles-box-rps-div").appendChild(botDiv);
}

function messageMaker(result) {
  var message;
  if (result == -1) {
    message = "You Lost!";
  } else if (result == 0) {
    message = "You Tied!";
  } else if (result == 1) {
    message = "You Won!";
  }
  return message;
}

// Make the computer to choice one of the choices.
function compChoice() {
  var botChoice = Math.floor(Math.random() * 3);
  if (botChoice == 0) {
    var compChoice = "scissors";
    return compChoice;
  } else if (botChoice == 1) {
    var compChoice = "rock";
    return compChoice;
  } else {
    var compChoice = "paper";
    return compChoice;
  }
}

// Decide who win.
function resultDecider(userChoice, botChoice) {
  var result;
  if (userChoice == "scissors") {
    if (botChoice == "rock") {
      result = -1;
      return result;
    } else if (botChoice == "scissors") {
      result = 0;
      return result;
    } else {
      result = 1;
      return result;
    }
  }
  if (userChoice == "rock") {
    if (botChoice == "rock") {
      result = 0;
      return result;
    } else if (botChoice == "scissors") {
      result = -1;
      return result;
    } else {
      result = 1;
      return result;
    }
  }
  if (userChoice == "paper") {
    if (botChoice == "rock") {
      result = 1;
      return result;
    } else if (botChoice == "scissors") {
      result = -1;
      return result;
    } else {
      result = 0;
      return result;
    }
  }
}

// Challenge 4
var blackjackGame = {
  you: { spanScore: "your-score" },
};

function blackjackHit() {}
