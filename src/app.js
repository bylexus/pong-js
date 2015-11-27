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

const centerWall = new Wall(board.canvas,board.context,{x:canvas.width/2-5,y:0,width:10,height:canvas.height}, '#888');

const pingAudio = document.getElementById('pingAudio');
const pongAudio = document.getElementById('pongAudio');
const hornAudio = document.getElementById('hornAudio');

const changeBallSpeedOnPaddleTouch = function(ball, paddle) {
	if (paddle.dirY === 1) {
		if (ball.dirY === 1) {
			ball.increaseSpeedY();
		} else if (ball.dirY === -1) {
			ball.decreaseSpeedY();
		}
		
	} else if (paddle.dirY === -1) {
		if (ball.dirY === -1) {
			ball.increaseSpeedY();
		} else if (ball.dirY === 1) {
			ball.decreaseSpeedY();
		}
	}
};

const togglePause = function() {
	if (board.running) {
		board.stop();
	} else {
		board.start();
	}
};

paddleLeft.collides = function(ball, collider) {
	ball.dirX = 1;
	pingAudio.play();
	changeBallSpeedOnPaddleTouch(ball, collider);
};

paddleRight.collides = function(ball, collider) {
	ball.dirX = -1;
	pongAudio.play();
	changeBallSpeedOnPaddleTouch(ball, collider);
};

topWall.collides = function(ball) {
	ball.dirY = 1;
};
bottomWall.collides = function(ball) {
	ball.dirY = -1;
};
leftWall.collides = function(ball,collider) {
	collider.highlight();
	hornAudio.play();
	ball.dirX = 1;
	scoreBoard.incrementRight();
};
rightWall.collides = function(ball,collider) {
	collider.highlight();
	hornAudio.play();
	ball.dirX = -1;
	scoreBoard.incrementLeft();
};

scoreBoard.update();

ball.addColliders([paddleLeft,paddleRight,topWall,bottomWall,leftWall,rightWall]);

board.addDrawable(paddleLeft);
board.addDrawable(paddleRight);

board.addDrawable(centerWall);
board.addDrawable(leftWall);
board.addDrawable(rightWall);
board.addDrawable(topWall);
board.addDrawable(bottomWall);

board.addDrawable(ball);

canvas.focus();

document.addEventListener('keydown', function(event) {
	if (event.keyCode === 32) {
		togglePause();
	}
});