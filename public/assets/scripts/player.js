"use strict";
var users = [];
var myText = {};
var player = {
    ball: {},
    scoreBoard: {},
    score: 0,
    x: 0,
    y: 0
};

function setPlayer(user) {

}

function buildPlayerScore() {
    myText = new createjs.Text(my_name, "12px Arial", "#ffffff"); //creates text object
    myText.x = 300;
    myText.y = 0;
}