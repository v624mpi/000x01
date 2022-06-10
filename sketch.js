let url = [
	"https://coolors.co/ef476f-ffd166-06d6a0-118ab2-073b4c",
	"https://coolors.co/ffa69e-faf3dd-b8f2e6-aed9e0-5e6472",
	"https://coolors.co/f72585-7209b7-3a0ca3-4361ee-4cc9f0",
	"https://coolors.co/d7263d-f46036-2e294e-1b998b-c5d86d",
];
let palette;
let w = innerWidth;
let h = innerHeight;
let  num = 20;
var maxDiameter; 
var theta; 

function setup() {
  v = h
	createCanvas(800, 800);
	// noSmooth();
  smooth(5);
  maxDiameter = 50; 
	theta = 0; 
}

function draw() {
  var diam = 100 + sin(theta) * maxDiameter ;
	randomSeed(frameCount / 500);
	// blendMode(BLEND);
	background(255);
	copy(0,0,width,height,-1,-1,width+10,height+2);  
	palette = shuffle(createPalette(random(url)), true);
	// background(0);
	// blendMode(DIFFERENCE);
	let offset = -width / 10;
	let yStep = (height - offset *  v / random(10,50)) / random(2,20);
	for (let y = offset; y <= height - offset; y += yStep) {

		let num = int(1 + diam * noise(y, frameCount / 200));
		let arr = [];
		for (let i = 0; i < num; i++) {
			let n = sq(sq(noise(y / 10, frameCount / 400))) * (width - offset * 2);
			n = max(n, 1);
			arr.push(n);
		}
		drawingContext.setLineDash(arr);
		drawingContext.lineDashOffset = y - frameCount / 200;
		strokeWeight(yStep);
		strokeCap(SQUARE);
		// stroke(random(palette));
		line(offset, y, width - offset, y);
	}

	let xStep = (width - offset * diam) / 7;
	for (let x = offset; x <= width - offset; x += xStep) {

		let num = int(1 + 20 * noise(x, frameCount / 200));
		let arr = [];
		for (let i = 0; i < num; i++) {
			let n = sq(sq(noise(x / 10, frameCount /  v / random(10,299)))) * (width - offset * 2);
			n = max(n, 1);
			arr.push(n);
		}
		drawingContext.setLineDash(arr);
		drawingContext.lineDashOffset = x - frameCount / 200;
		strokeWeight(xStep);
		strokeCap(SQUARE)
		// stroke(random(palette));
		line(x, offset, x, height - offset * 2);
	}


	for (let y = offset; y <= height / 2 - offset; y += yStep) {

		let num = int(1 + 10 * noise(y, frameCount / 100));
		let arr = [];
		for (let i = 0; i < num; i++) {
			let n = sq(sq(noise(y / 10, frameCount / 200))) * (width - offset * 2);
			n = max(n, 1);
			arr.push(n);
		}
		drawingContext.setLineDash(arr);
		drawingContext.lineDashOffset = y - frameCount / 100;
		strokeWeight(yStep);
		strokeCap(SQUARE)
		line(offset, y , width - offset, y);
	}

}



function createPalette(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = color('#' + arr[i]);
	}
	return arr;
}