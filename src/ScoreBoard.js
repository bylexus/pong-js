export default class ScoreBoard {
	constructor(canvas, context) {
		this.canvas = canvas;
		this.context = context;
		this.leftScore = 0;
		this.rightScore = 0;

		this.gradient = context.createLinearGradient(0,0,0,canvas.height);
		this.gradient.addColorStop(0,'#333');
		this.gradient.addColorStop(1,'#555');
	}

	update() {
		this.context.fillStyle = this.gradient;
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);

		this.context.fillStyle = '#ccc';
		this.context.font = "30px sans-serif";
		this.context.fillText("Left Player Score",10,60);

		let metrics = this.context.measureText("Right Player Score");
		this.context.fillText("Right Player Score",this.canvas.width-10-metrics.width,60);

		this.context.font = "100px sans-serif";
		this.context.fillText(String(this.leftScore),10,this.canvas.height-10);


		metrics = this.context.measureText(String(this.rightScore));
		this.context.fillText(String(this.rightScore),this.canvas.width-10-metrics.width,this.canvas.height-10);
	}

	incrementRight() {
		this.rightScore++;
		this.update();
		return this.rightScore;
	}

	incrementLeft() {
		this.leftScore++;
		this.update();
		return this.leftScore;
	}

}