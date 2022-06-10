const ellipseSize = 40;
const rectSize = 10;


// Step 3 (pt 1). Constants to control our random displacement and rotation

const randomDisplacement = 145;
const rotateMultiplier = 20;

function setup() {
	// Create a ellipse canvas
	createCanvas(windowWidth, windowHeight);
	noFill();

	// make a static sketch
	// noLoop();
}

function draw() {
  background('white');
	// Start one ellipse away from the edge by initializing x and y to ellipseSize
	for(let x = ellipseSize; x <= width - ellipseSize; x += ellipseSize) {
		for(let y = ellipseSize; y <= height - rectSize/2; y+= rectSize/4) {
      fill(random(["#E36397", "#db6800", "#e8ff81", "#29f0b6", "#531253", "#938ba1", "#ea3788"]));
			// Step 3 (pt 2). for each ellipse, calculate an amount of displacement and rotation
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
			
			// Draw a ellipse centered on the position (x, y)
			ellipse(
				// The left edge of the ellipse will be half its width left of x
				-ellipseSize / 2,
				// The top edge of the ellipse will be half its height above y
				-ellipseSize / 2,
				ellipseSize
			);
      rect(
				// The left edge of the ellipse will be half its width left of x
				-rectSize / 2,
				// The top edge of the ellipse will be half its height above y
				-rectSize / 2,
				rectSize
			);
      
			// The pop function restores the drawing position from the last time push was
			// called
			pop();
		}
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}