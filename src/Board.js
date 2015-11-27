export default class Board {
	constructor(canvas, context) {
		this.canvas = canvas;
		this.context = context;
		this.drawables = [];
		this.running = true;
		window.requestAnimationFrame(this.draw.bind(this));
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
		this.context.fillStyle = '#333';
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);

		if (!this.startTime) this.startTime = ts;
		if (!this.lastTime) this.lastTime = ts;

		const delta = ts - this.lastTime;
		this.lastTime = ts;
		

		this.drawables.forEach((drawable) => drawable.draw(ts, delta));

		if (this.running) {
			window.requestAnimationFrame(this.draw.bind(this));	
		} else {
			this.context.font = "30px sans-serif";
			let metrics = this.context.measureText("PAUSE - space for start");
			this.context.fillStyle = '#ccc';
			this.context.fillText("PAUSE - space for start",(canvas.width - metrics.width)/2,(canvas.height + 30 )*0.3);
		}
	}

	addDrawable(drawable) {
		this.drawables.push(drawable);
	}
}