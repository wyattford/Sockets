var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
        $("#messageForm").show();
    }
    else {
        $("#conversation").hide();
        $("#messageForm").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        stompClient.subscribe('/topic/messageBoard', function (message) {
          var messageJson = JSON.parse(message.body);
          showMessage(messageJson["name"], messageJson["content"]);
        });
    });
}

function showMessage(name, content) {
    $("#messageBoard").append("<tr><td>"+name+"</td><td>" + content + "</td></tr>");
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
  stompClient.send("/app/incomingMessages", {}, JSON.stringify({'name': $("#username").val(),'content': $("#message").val()}));
  document.getElementById('message').value = "";
}



$(function () {
    $( "#play" ).click(function() { play(); });
});

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#sendMessage" ).click(function() { sendMessage(); });
});