import Drawable from "./Drawable";

export default class Wall extends Drawable {
	constructor(canvas, context, bounds, color = '#ccc') {
		super(canvas, context);
		this._bounds = bounds;
		this.highlightStart = false;
		this.highlightDuration = 500;
		this.color = color;
	}

	draw(ts, delta) {

		if (this.highlightStart) {
			const diff = new Date().getTime() - this.highlightStart;
			if (diff > this.highlightDuration) {
				this.highlightStart = null;
			}
			let val = Math.round(255*Math.sin(Math.PI*diff/this.highlightDuration));
			let down = Math.max(204-val);
			this.ctx.fillStyle = 'rgb('+Math.min(204+val,255)+','+down+','+down+')';
		} else {
			this.ctx.fillStyle = this.color;	
		}
		
		this.ctx.fillRect(this._bounds.x,this._bounds.y,this._bounds.width,this._bounds.height);
	}

	bounds() {
		return {
			minX: this._bounds.x,
			minY: this._bounds.y,
			maxX: this._bounds.x + this._bounds.width,
			maxY: this._bounds.y + this._bounds.height
		};
	}

	highlight() {
		this.highlightStart = new Date().getTime();
	}
}