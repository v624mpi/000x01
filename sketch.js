// Step 1. Basic Setup
const squareSize = 30;

function setup() {
	// Create a square canvas
	createCanvas(500, 500);
	noFill();
	// make a static sketch
	noLoop();
}

function draw() {
  background('white');
	// Start one square away from the edge by initializing x and y to squareSize
	for(let x = squareSize; x <= width - squareSize; x += squareSize) {
		for(let y = squareSize; y <= height - squareSize; y+= squareSize) {
			// Step 3 (pt 2). for each square, calculate an amount of displacement and rotation
			let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
			// By using y, we increase the amount of rotation as we get to lower rows
    	let rotateAmt = y / height * Math.PI / 180 * plusOrMinus * Math.random() * rotateMultiplier;

			plusOrMinus = Math.random() < 0.5 ? -1 : 1;
			let translateAmt = y / height * plusOrMinus * Math.random() * randomDisplacement;
			
			// The push function saves the current p5js settings
			// which includes position as well as stroke, fill, and many others
			push();
			// Move the drawing position to the (x, y)
			
			// Step 3 (pt 3). Add the random x translation and the rotation.
			translate(x + translateAmt, y);
			rotate(rotateAmt);
			
			// Draw a square centered on the position (x, y)
			square(
				// The left edge of the square will be half its width left of x
				-squareSize / 2,
				// The top edge of the square will be half its height above y
				-squareSize / 2,
				squareSize
			);
			// The pop function restores the drawing position from the last time push was
			// called
			pop();
		}
	}
}