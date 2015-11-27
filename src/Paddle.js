import Drawable from "./Drawable";

export default class Paddle extends Drawable {
	constructor(canvas, context, xPos, upKey = 65, downKey = 89) {
		super(canvas, context);
		this.width = 20;
		this.height = 120;
		this.x = xPos + this.width < canvas.width? xPos : canvas.width - this.width;
		this.y = this.canvas.height / 2;
		this.dirY = 0;
		this.speed = 500;
		
		this.upKey = upKey;
		this.downKey = downKey;

		document.addEventListener('keydown',this.onKeyDown.bind(this));
		document.addEventListener('keyup',this.onKeyUp.bind(this));

		this.maxY = this.canvas.height - this.height / 2;
		this.minY = this.height / 2;

		this.keyState = {
			[this.upKey]: false,
			[this.downKey]: false
		};
	}

	draw(ts, delta) {
		this.dirY = 0;
		if (this.keyState[this.upKey]) this.dirY = -1;
		if (this.keyState[this.downKey]) this.dirY = 1;

		this.y = Math.max(Math.min(this.y + this.dirY * this.speed * delta / 1000,this.maxY),this.minY);

		this.ctx.fillStyle = '#ccc';
		this.ctx.fillRect(this.x,this.y-this.height/2,this.width,this.height);
	}

	bounds() {
		return {
			minX: this.x,
			minY: this.y - this.height / 2,
			maxX: this.x + this.width,
			maxY: this.y + this.height / 2
		};
	}

	onKeyDown(event) {
		let key = event.keyCode;
		if (this.upKey === key) {
			this.keyState[key] = true;
		}
		if (this.downKey === key) {
			this.keyState[key] = true;
		}
	}

	onKeyUp(event) {
		let key = event.keyCode;
		if (this.upKey === key) {
			this.keyState[key] = false;
		}
		if (this.downKey === key) {
			this.keyState[key] = false;
		}
	}
}