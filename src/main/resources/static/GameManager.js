

var gameRow = 0;
var gameCol = 0;
var gameRows = {};

document.addEventListener('DOMContentLoaded', createBoard);
function createBoard() {
  for(i=0;i<6;i++) {
    gameRows[i] = document.createElement('div');
    gameRows[i].classList.add("inputrow", "center");
    gameRows[i].setAttribute("id", "row"+i);
    document.getElementById("main-content").appendChild(gameRows[i]);
  }
  for (i = 0; i < 6; i++) {
    var tempCols = {}
    for (a=0;a<5;a++) {
      tempCols[a] = document.createElement('div');
      tempCols[a].classList.add("inputbox");
      tempCols[a].setAttribute("id", "r"+i+"c"+a);
      gameRows[i].appendChild(tempCols[a]);
    }
  }
}
document.addEventListener('keyup', keyPress);
function keyPress(event) {
  var key = event.keyCode;
  if (key==13 && gameCol==5) {
    gameRow++;
    gameCol=0;
    checkWord()
  } else if (key==8) {
    deleteLetter();
  } else if (key>=65&&key<=90) {
    writeLetter(event.key);
  }
  
}


function checkWord() {
  console.log("checking word");
  var word = "";
  var childDivs = document.getElementById("row"+(gameRow-1)).childNodes;
  for (a=0;a<5;a++) {
    console.log("r"+gameRow-1);
    word += childDivs[a].textContent;
  }
  console.log("Sending "+word);
  sendGameGuess(word);
}

function writeLetter(letter) {
  if(gameCol!=5) {
    document.getElementById("r"+gameRow+"c"+gameCol).innerHTML=letter;
    gameCol++;
  }
  
}

function deleteLetter() {
  if(gameCol!=0) {
    gameCol--;
    document.getElementById("r"+gameRow+"c"+gameCol).innerHTML="";
  }
  
}

function showResults(results) {
  console.log(results);
}

var stompClient = null;
document.addEventListener('DOMContentLoaded', connect);
function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/clientMessages"', function (results) {
          console.log("results received");
          showResults(results);
        });
    });
}
function sendGameGuess(guess) {
  stompClient.send("/app/gameEvents", {}, guess);
}