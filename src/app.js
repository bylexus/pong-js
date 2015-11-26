import Board from "./Board";
import ScoreBoard from "./ScoreBoard";
import Ball from "./Ball";
import Paddle from "./Paddle";
import Wall from "./Wall";

const canvas = document.getElementById('canvas');
const scoreCanvas = document.getElementById('scoreCanvas');
const board = new Board(canvas,canvas.getContext('2d'));
const scoreBoard = new ScoreBoard(scoreCanvas,scoreCanvas.getContext('2d'));

const ball = new Ball(board.canvas, board.context);
const paddleLeft = new Paddle(board.canvas, board.context, 10,65 /* A */,89 /* Y */);
const paddleRight = new Paddle(board.canvas, board.context, board.canvas.width-30,75 /* K */, 77 /* M */);
const topWall = new Wall(board.canvas,board.context,{x:0,y:0,width:canvas.width,height:10});
const bottomWall = new Wall(board.canvas,board.context,{x:0,y:canvas.height-10,width:canvas.width,height:10});
const leftWall = new Wall(board.canvas,board.context,{x:0,y:0,width:10,height:canvas.height});
const rightWall = new Wall(board.canvas,board.context,{x:canvas.width-10,y:0,width:10,height:canvas.height});

paddleLeft.collides = function(ball) {
	ball.dirX = 1;
};

paddleRight.collides = function(ball) {
	ball.dirX = -1;
};

topWall.collides = function(ball) {
	ball.dirY = 1;
};
bottomWall.collides = function(ball) {
	ball.dirY = -1;
};
leftWall.collides = function(ball,collider) {
	collider.highlight();
	ball.dirX = 1;
	scoreBoard.incrementRight();
};
rightWall.collides = function(ball,collider) {
	collider.highlight();
	ball.dirX = -1;
	scoreBoard.incrementLeft();
};

scoreBoard.update();

ball.addColliders([paddleLeft,paddleRight,topWall,bottomWall,leftWall,rightWall]);
board.addDrawable(ball);
board.addDrawable(paddleLeft);
board.addDrawable(paddleRight);
board.addDrawable(leftWall);
board.addDrawable(rightWall);
board.addDrawable(topWall);
board.addDrawable(bottomWall);
board.start();

