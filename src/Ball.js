import Drawable from "./Drawable";

export default class Ball extends Drawable {
	constructor(canvas, context) {
		super(canvas, context);
		this.x = canvas.width / 2;
		this.y = canvas.height / 2;
		this.dirX = 1;
		this.dirY = 1;
		this.speed = 600;
		this.radius = 20;
		this.colliders = [];
	}

	draw(ts, delta) {
		this.x += this.dirX * this.speed * delta / 1000;
		this.y += this.dirY * this.speed * delta / 1000;

		if (this.x > this.canvas.width) {
			this.x = 2*canvas.width - this.x;
			this.dirX = -1;
		}
		if (this.x < 0) {
			this.x = -1*this.x;
			this.dirX = 1;
		}

		if (this.y > this.canvas.height) {
			this.y = 2*canvas.height - this.y;
			this.dirY = -1;
		}
		if (this.y < 0) {
			this.y = -1*this.y;
			this.dirY = 1;
		}

		this.colliders.forEach((c) => {
			if (c.collides && this.intersects(c)) {
				c.collides(this,c);
			}
		});

		this.ctx.fillStyle = '#ccc';
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.radius, 0,Math.PI*2);
		this.ctx.fill();
	}

	bounds() {
		return {
			minX: this.x - this.radius,
			minY: this.y - this.radius,
			maxX: this.x + this.radius,
			maxY: this.y + this.radius
		};
	}


	addColliders(colliders) {
		if (!colliders.forEach) colliders = [colliders]; // if it walks like a duck... array!
		colliders.forEach((c) => this.colliders.push(c));
	}
}