let url = [
	"https://coolors.co/20222f-1a1f56-2c1e7d-118ab2-0134aa-0060e8-0297fb-00befa-83def3-d1ecf7-f2f6f9-fce503-fe6d02-e7011d-4b0f31",
	// "https://coolors.co/0060e8-0297fb-00befa-83def3-d1ecf7",
	// "https://coolors.co/f2f6f9-fce503-fe6d02-e7011d-4b0f31"
];
let palette;
let w = innerWidth;
let h = innerHeight;
let  num = 20;
var maxDiameter; 
var theta; 

function setup() {
  v = h
	createCanvas(windowWidth, windowHeight);
  	// createCanvas(500, 500);
	// noSmooth();
  frameRate(60)
  smooth(90);
  maxDiameter = 50; 
  filter(POSTERIZE);
	theta = 0; 
}

function draw() {
  var diam = 100 + sin(theta) * maxDiameter ;

	randomSeed(frameCount / 500);
	blendMode(BLEND);
	// background('#20222f');
	copy(0,0,width,height,-1,-1,width+2,height+ 2);  
	palette = shuffle(createPalette(random(url)), true);
	// background(0);
	// blendMode(DIFFERENCE);
	let offset = -windowWidth / 10;
	let yStep = (windowHeight - offset *  diam / random(2,22)) / random(2,20);
	for (let y = yStep; y <= height - offset; y += yStep) {

		let num = int(1 + diam * noise(y, frameCount / 200));
		let arr = [];
		for (let i = 0; i < num; i++) {
			let n = sq(sq(noise(y / diam, frameCount / 400))) * (windowHeight - offset * 20);
			n = max(n, 5);
			arr.push(n);
		}
		drawingContext.setLineDash(arr);
		drawingContext.lineDashOffset = y - frameCount / 1000;
		strokeWeight(yStep);
		strokeCap(SQUARE);
    stroke(random(['#83def3','#d1ecf7','#f2f6f9','#fce503','#fe6d02','#e7011d','#4b0f31']));
		// stroke(palette);
		line(offset, y, width - offset, y);
	}
//width,yStep,diam
	let xStep = (diam - offset * 1) / 7;
	for (let x = yStep; x <= width - offset; x += xStep) {

		let num = int(1 + diam * noise(x, frameCount / 100));
		let arr = [];
		for (let i = 0; i < num; i++) {
			let n = sq(sq(noise(x / diam, frameCount / 900))) * (width - offset * 2);
			n = max(n, 1);
			arr.push(n);
		}
		drawingContext.setLineDash(arr);
		drawingContext.lineDashOffset = x - frameCount / 200;
		strokeWeight(xStep);
		strokeCap(SQUARE)
    stroke(random(['#20222f','#1a1f56','#2c1e7d','#118ab2','#0134aa','#0060e8','#0297fb','#00befa']));
		// stroke(random(palette));
		line(x, offset, x, height - offset * 2);
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}