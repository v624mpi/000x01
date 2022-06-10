const ellipseSize = 2;
// Step 3 (pt 1). Constants to control our random displacement and rotation
const randomDisplacement = 25;
const rotateMultiplier = 10;

function setup() {
	// Create a ellipse canvas
	createCanvas(500, 500);
	noFill();
	// make a static sketch
	noLoop();
}

function draw() {
  background('white');
	// Start one ellipse away from the edge by initializing x and y to ellipseSize
	for(let x = ellipseSize; x <= width - ellipseSize; x += ellipseSize) {
		for(let y = ellipseSize; y <= height - ellipseSize; y+= ellipseSize) {
			// Step 3 (pt 2). for each ellipse, calculate an amount of displacement and rotation
			let plusOrMinus = Math.random() < 0.9 ? -1 : 1;
			// By using y, we increase the amount of rotation as we get to lower rows
    	let rotateAmt = y / height * Math.PI / 180 * plusOrMinus * Math.random() * rotateMultiplier;

			plusOrMinus = Math.random() < 0.1 ? -1 : 1;
			let translateAmt = y / height * plusOrMinus * Math.random() * randomDisplacement;
			
			// The push function saves the current p5js settings
			// which includes position as well as stroke, fill, and many others
			push();
			// Move the drawing position to the (x, y)
			
			// Step 3 (pt 3). Add the random x translation and the rotation.
			translate(x + translateAmt, y);
			rotate(rotateAmt);
			
			// Draw a ellipse centered on the position (x, y)
			ellipse(
				// The left edge of the ellipse will be half its width left of x
				-ellipseSize / 2,
				// The top edge of the ellipse will be half its height above y
				-ellipseSize / 2,
				ellipseSize
			);
			// The pop function restores the drawing position from the last time push was
			// called
			pop();
		}
	}
}