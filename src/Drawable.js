export default class Drawable {
	constructor(canvas, context) {
		this.canvas = canvas;
		this.ctx = context;
	}

	draw(ts, delta) {
		throw new Error('Not implemented. Please implement in child classes.');
	}

	bounds() {
		throw new Error('Not implemented. Please implement in child classes.');
	}

	intersects(other) {
		const otherBounds = other.bounds();
		const myBounds = this.bounds();
		return !(
			otherBounds.minX > myBounds.maxX || 
			otherBounds.maxX < myBounds.minX || 
			otherBounds.minY > myBounds.maxY ||
			otherBounds.maxY < myBounds.minY
		);
	}

	highlight(){}
}