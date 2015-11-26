export default class Board {
	constructor(canvas, context) {
		this.canvas = canvas;
		this.context = context;
		this.drawables = [];
		this.running = false;
	}

	start() {
		this.startTime = null;
		this.lastTime = null;
		this.red = 0;
		this.running = true;
		window.requestAnimationFrame(this.draw.bind(this));
	}

	stop() {
		this.running = false;
	}

	draw(ts) {
		if (!this.running) return;
		if (!this.startTime) this.startTime = ts;
		if (!this.lastTime) this.lastTime = ts;

		const delta = ts - this.lastTime;
		this.lastTime = ts;
		this.context.fillStyle = '#333';
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);

		this.drawables.forEach((drawable) => drawable.draw(ts, delta));

		window.requestAnimationFrame(this.draw.bind(this));	
	}

	addDrawable(drawable) {
		this.drawables.push(drawable);
	}
}