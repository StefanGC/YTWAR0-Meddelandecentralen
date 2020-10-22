"use strict";

var StefansImgURL = 'https://ju.instructure.com/images/thumbnails/3098/1J2xDivKYRKw0KXwlntYyubf7F0sj2aJ0BXxUbA0';
var MartinsImgURL = 'https://ju.instructure.com/images/thumbnails/808/ao48dYfwGEXSbs6JOYfdPu5wKbiBmsOSmjDecxji';
var ViktorsImgURL = 'https://ju.instructure.com/images/thumbnails/11524/hwiz78I1cULXl32zhuVAtvnfjn8NquCvNjW9vNkS';

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var imgURL;
    switch (user) {
        case ("Stefan"):
            imgURL = StefansImgURL;
            break;
        case ("Martin"):
            imgURL = MartinsImgURL;
            break;
        case ("Viktor"):
            imgURL = ViktorsImgURL;
            break;
        default:
            imgURL = '/img/anonymous.png';
            break;
    }

    var li = document.createElement("li");
    li.setAttribute('class', 'left clearfix rounded');    
    document.getElementById("messagesList").appendChild(li);

    var span = document.createElement("span");
    span.setAttribute('class', 'chat-img pull-left');
    li.appendChild(span);

    var img = document.createElement("img");
    img.setAttribute('src', imgURL);
    img.setAttribute('alt', 'User Avatar')
    img.setAttribute('class', 'rounded-circle');
    span.appendChild(img);

    var label = document.createElement("label");
    label.textContent = `${user}: `;
    span.appendChild(label);

    var div = document.createElement("div");
    div.setAttribute('class', 'chat-body1 clearfix border border-primary');
    li.appendChild(div);

    var p = document.createElement("p");
    p.textContent = msg;
    div.appendChild(p);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
    document.getElementById("messageInput").value = "";
    document.getElementById("messageInput").setAttribute('placeholder', 'Skriv nästa meddelande');
});

document.getElementById("ApproveUser").addEventListener("click", function () {
    document.getElementById("message_section").setAttribute('style', 'visibility:visible');
    document.getElementById("userInput").disabled = true;
    document.getElementById("ApproveUser").disabled = true;
});