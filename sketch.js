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
  w = min(windowWidth, windowHeight);
	createCanvas(w, w);
  	// createCanvas(500, 500);
	noSmooth();
  frameRate(60)
  // smooth(90);
  maxDiameter = 50; 
  filter(POSTERIZE);
	theta = 0; 
  pcX = 25;
  spcY = 25;
  pad = w/10;
}
  pad = w/10;
// var cell = 10;
// var a = 0;





function draw() {
  var diam = 100 + sin(theta) * maxDiameter ;
	// background('#f2f6f9');
////
// push();
// noStroke();
// let c1 = color('#118ab2');
// 	let c2 = color('#fce503');
// for(var j = cell/2; j < windowWidth; j += cell){
//   for(var i = cell/2; i < windowHeight; i += cell){
//   //	translate(i,j);
    
//     var d = dist(windowWidth/2,windowHeight/2,i,j);
//     fill(lerpColor(c2,c1,d));
//     var size = map(d,0,70+sin(a-i+j)*cell,cell,sin(a+j)*cell/2);
//     ellipse(i,j,size,size);
//   }	
// }
// a += 0.1;
// pop();

/////
createCell(pad,pad,w-pad*2,w-pad*2,7)

////



	randomSeed(frameCount / 500);
	// blendMode(DIF);

	copy(0,0,width,height,-1,-1,width+2,height+ 2);  
	palette = shuffle(createPalette(random(url)), true);
	// background(0);
	blendMode(DIFFERENCE);
	let offset = -windowWidth / 10;
	let yStep = (windowHeight - offset *  diam / random(2,200)) / random(2,100);
	for (let y = yStep; y <= height - offset; y += yStep) {

		let num = int(1 + diam * noise(y, frameCount / random(2,200)));
		let arr = [];
		for (let i = 0; i < num; i++) {
			let n = sq(sq(noise(y / diam, frameCount / 400))) * (windowHeight - offset * 20);
			n = max(n, 5);
			arr.push(n);
		}
		drawingContext.setLineDash(arr);
		drawingContext.lineDashOffset = y - frameCount / 500;
		strokeWeight(yStep);
		strokeCap(SQUARE);
    // stroke(random(['#83def3','#d1ecf7','#f2f6f9','#fce503']));
		stroke(palette);
		line(offset, y, width - offset, y);
	}
//width,yStep,diam
	let xStep = (windowWidth - offset *  diam / random(1,200)) / random(2,100);
	for (let x = yStep; x <= width - offset; x += xStep) {

		let num = int(10 + diam * noise(x, frameCount / 500));
		let arr = [];
		for (let i = 0; i < num; i++) {
			let n = sq(sq(noise(x / diam, frameCount / 200))) * (width - offset * 20);
			n = max(n, 1);
			arr.push(n);
		}
		drawingContext.setLineDash(arr);
		drawingContext.lineDashOffset = x - frameCount / 200;
		strokeWeight(xStep);
		strokeCap(SQUARE)
    // stroke(random(['#20222f','#1a1f56','#2c1e7d','#118ab2',]));
		stroke(random(palette));
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
// save jpg
let lapse = 0;    // mouse timer
function mousePressed(){
  if (millis() - lapse > 400){
    save("img_" + month() + '-' + day() + '_' + hour() + '-' + minute() + '-' + second() + ".jpg");
    lapse = millis();
  } 
}
push();

function createCell(posX, posY, wid, hei, depth){
  stroke(random(['#83def3','#d1ecf7','#f2f6f9','#fce503']));
  if(depth>0){
    if(random()>0.5){
      createCell(posX, posY, wid, hei/2, depth-1)
      createCell(posX, posY+hei/2, wid, hei/2, depth-1)
    }else{
      createCell(posX, posY, wid/2, hei, depth-1)
      createCell(posX+wid/2, posY, wid/2, hei, depth-1)
    }

  }else{
    rect(posX, posY, wid, hei)
  }
}
pop();

function draw2() {
	let step = 1;
	copy(0, 0, width, height, -step, -step, width + step * 2, height + step * 2);

	randomSeed(frameCount / 100);

	let offset = width / 20;
	let x, y, xMin, yMin, xMax, yMax, xStep, yStep;

	xMin = offset;
	yMin = offset;
	xMax = width - offset;
	yMax = height - offset;

	y = yMin;
	while (y < yMax) {
		yStep = random((yMax - yMin) / 25, (yMax - yMin) / 3);
		if (y + yStep > yMax || yMax - (y + yStep) < (yMax - yMin) / 50) {
			yStep = yMax - y;
		}
		x = xMin;
		while (x < xMax) {
			xStep = random((xMax - xMin) / 25, (xMax - xMin) / 3);
			if (x + xStep > xMax || xMax - (x + xStep) < (xMax - xMin) / 20) {
				xStep = xMax - x;
			}
			// rect(x, y, xStep, yStep);
			drawOsc(x, y, xStep, yStep);
			x += xStep;
		}
		y += yStep;
	}

	// noLoop();

}

function drawOsc(x, y, w, h) {
	push();
	translate(x, y + h / 2);
	// line(0, 0, w, 0);

	let n = 0;
	let rn = random(TWO_PI);
	let wave_type = int(random(7));
	let freq = random(0.25, 4);
	fill(getColorByTheta((n + rn) / 10000, frameCount / 100, freq * 5 * sin(rn + frameCount / 100)));
	noStroke();
	beginShape();
	while (n < w) {
		let v = osc(n + rn, wave_type) * sin((x + y * width + n) / 50 + frameCount / 15);
		vertex(n, v * h);
		n++;
	}
	vertex(n,h/2);
	vertex(0,h/2);
	endShape(CLOSE);


	pop();
}


function osc(x, n = -1) {
	let v = 0.5;
	switch (n) {
		case 0:
			v = round(sin(-x * .1)) * .25;
			break;
		case 1:
			v = sin(x * .2) * .25;
			break;
		case 2:
			v = abs(sin(x * .1)) * .5;
			break;
		case 3:
			v = abs(sin(x * .01 + x * .1)) * .5;
			break;
		case 4:
			v = (x * .025) % 1 < .5 ? -.5 : .5;
			break;
		case 5:
			v = ceil(sin(x * .1)) * .25;
			break;
		case 6:
			v = sin(x * .1) * cos(x * 1) * .5;
			break;
	}
	return v;
}

function getColorByTheta(theta, time, freq) {
	let th = freq * theta + time * freq;
	let r = 0.5 + 0.5 * sin(th);
	g = 0.5 + 0.5 * sin(th - PI * 1 / 3);
	b = 0.5 + 0.5 * sin(th - PI * 2 / 3);
	return color(r * 255, g * 255, b * 255);
}