let url = [
	"https://coolors.co/20222f-1a1f56-2c1e7d-118ab2-0134aa-0060e8-0297fb-00befa-83def3-d1ecf7-f2f6f9-fce503-fe6d02-e7011d-4b0f31",
	// "https://coolors.co/0060e8-0297fb-00befa-83def3-d1ecf7",
	// "https://coolors.co/f2f6f9-fce503-fe6d02-e7011d-4b0f31"
];
let palette;
let w = innerWidth;
let z = innerHeight;
let  num = 20;
var maxDiameter; 
var theta; 
const points=[]
const n=5
let   t=0
let myCanvas
let mainGraphics

function setup() {
  v = z
  loadVars();
  loadHills();
  rr(0, 0, DIM, DIM*.75);
	createCanvas(windowWidth, windowHeight);

  	// createCanvas(500, 500);
	// noSmooth();
  frameRate(60)
  smooth(90);
  maxDiameter = 50; 
  filter(POSTERIZE);
	theta = 0; 
}

const loadVars = () => {
  colorSeed = random(0, 100);
  brightSeed = random(30, 100);
  skyOff = random(0, 50);
  sunX = random(0, width);
  sunY = random(-50, 20);
  sunSize = random(80, 200);
};

let h = [];
const noiseVal = 0.003;
const COUNT = 5;
let colorSeed;
let brightSeed;
let skyOff;
let sunX;
let sunY;
let sunSize;
function draw() {
  displayHills();
  displayGlare(true);
  displayGrain();
  noLoop();
}


const displayHills = () => {
  for (let hill of h) {
    hill.display();
    hill.move();
  }
};
//這是個畫山脈
mainGraphics.push()
// 	// background(255)
// 	// let lastX=0,lastY=0;
  mainGraphics.image(mainGraphics,0,6)

  mainGraphics.beginShape()

  mainGraphics.strokeWeight(1)
  mainGraphics.noFill()
  mainGraphics.translate(0,-200)
  // let mouseRatio = map(mouseX,0,width,0,1)
  let mouseRatio = noise(frameCount/50,mouseX/50)*1.5
  for(let x=0;x<width;x+=5){
    let y =
        mouseRatio*sin(x/80+frameCount/50)*50+
        mouseRatio*sin(x/20+frameCount/50)*20
    +mouseRatio*noise(x/100,frameCount/50)
    *noise(x/500,frameCount/50)
    *(map(sin(x/
             (10+ noise(x/2000,frameCount/500)*40)
             ),-1,1,0,1) )
    *height/5+height/3
    +noise(x/100,frameCount/50)*100
    ;
    // fill(0)
    mainGraphics.curveVertex(x,y)
    if (y>height*0.45){
      mainGraphics.push()
        mainGraphics.noStroke()
        mainGraphics.fill(93 +sin(x)*50, 206+sin(x*1.2+y/10)*50, 244+sin(x*1.2)*30)
        mainGraphics.ellipse(x +random(-1,1),y+random(-1,1),5)
      mainGraphics.pop()
    }
  }
  mainGraphics.stroke(255,map(sin(frameCount/(20+ (1-mouseRatio) *500) ),-1,1,50,255) )
  mainGraphics.endShape()
mainGraphics.pop()




image(mainGraphics,0,0)

// let c = get( int(width/2), int(height/2))
// rect(width/2,height/2,50,50)



  // ellipse(mouseX, mouseY, 20, 20);

const loadHills = () => {
  for (let y = height / 2, o = 0; y < height + 300; y += COUNT, o += 2) {
    h.push(new Hill(y + o, 0));
  }
};

class Hill {
  constructor(y, t) {
    this.y = y;
    this.t = t;
  }

  display() {
    let sat = map(this.y - 500, 0, height, 20, 100);
    strokeWeight(1);
    stroke(colorSeed, sat, brightSeed < 50 ? 100 : 40);
    fill(colorSeed, sat, brightSeed);
    beginShape();
    vertex(-100, height + 100);
    for (let i = 0; i < width; i += 1) {
      let ny = noise(i * noiseVal, this.y / 100, this.t * noiseVal);
      let yOff = map(ny, 0, 1, 0, height / 3);
      vertex(i, this.y - yOff);
    }
    vertex(width + 100, height + 100);

    endShape(CLOSE);
    
    //trees
    for (let i = 0; i < width; i += 1) {
      
      if(random(100)<0.5){
        fill(colorSeed, sat, brightSeed-20);
        noStroke();
        let ny = noise(i * noiseVal, this.y / 100, this.t * noiseVal);

        let yOff = map(ny, 0, 1, 0, height / 3);

        let tMap = map(this.y,0,height,0,3)
        translate(i, this.y - yOff)
        rotate(random(-10,10))
        let rH = random(3,10)
        rect(0,0,tMap,rH+this.y/100)
        ellipse(0,-(rH+this.y/100)/2,tMap*2)
        resetMatrix();
      }
    }
  }

  move() {
    this.t += 10;
  }
}

function displayGrain() {
    for(let i = 0; i <300000; i++){
      noStroke();
      fill(colorSeed, 20, 100, 5);

      rect(random(width), random(height), random(0,2),random(0,2))
    }
}

function draw() {
  var diam = 100 + sin(theta) * maxDiameter ;

	randomSeed(frameCount / 500);
	blendMode(HARD_LIGHT);
	// background('#20222f');
	copy(0,0,width,height,-1,-1,width+2,height+ 2);  
	palette = shuffle(createPalette(random(url)), true);
	// background(0);
	// blendMode(DIFFERENCE);
	let offset = -windowWidth / 40;
	let yStep = (windowHeight - offset *  diam / random(10,22)) / random(2,20);
	for (let y = yStep; y <= height - offset; y += yStep) {

		let num = int(1 + diam * noise(y, frameCount / 500));
		let arr = [];
		for (let i = 0; i < num; i++) {
			let n = sq(sq(noise(y / diam, frameCount / 400))) * (windowHeight - offset * 30);
			n = max(n, 5);
			arr.push(n);
		}
		drawingContext.setLineDash(arr);
		drawingContext.lineDashOffset = y - frameCount / 1000;
		strokeWeight(yStep);
		strokeCap(SQUARE);
    // stroke(random(['#83def3','#d1ecf7','#f2f6f9','#fce503','#fe6d02','#e7011d','#4b0f31']));
		stroke(palette);
		line(offset, y, width - offset, y);
	}
//width,yStep,diam
	let xStep = (diam - offset * 1) / 20;
	for (let x = yStep; x <= width - offset; x += xStep) {

		let num = int(1 + diam * noise(x, frameCount / 800));
		let arr = [];
		for (let i = 0; i < num; i++) {
			let n = sq(sq(noise(x / diam, frameCount / 900))) * (width - offset * 1);
			n = max(n, 1);
			arr.push(n);
		}
		drawingContext.setLineDash(arr);
		drawingContext.lineDashOffset = x - frameCount / 200;
		strokeWeight(xStep);
		strokeCap(SQUARE)
    stroke(random(["#1B064C", "#F72585", "#B5179E", "#7209B7", "#4361EE", "#4361EE", "#4895EF", "#4CC9F0"]));
		// stroke(random(palette));
		line(x, offset, x, height - offset * 2);
	}

  for(let p of points){ // For all the points
    
    // Flow Field -> Uses 2D noise value (0-1) as a direction for the point
    // In this case we use trigonometric values (TWO_PI) but you can use Degrees too.
    // And coding chads can use noiseScale instead of my *0.01
    let n=noise(p.x*0.01,p.y*0.01)*TWO_PI
    
    
    // Magic      aka "Constrains The number of directions the noise value can have"
	  m=5                // M for Marvellously-Majestic-Magnificient-Modifying-Magic
	  a=TWO_PI/m          // Change direction
    b=round(n/TWO_PI*m) // Round the value
    n=a*b;              // New direction
    
    // Moving the points -> because we use trigonometry we can use cos and sin to move
    // To make it move faster you can multiple the values
    // Swaping cos/sin and reversing the sign (+ to - or - to +) rotates where they move
	  p.add(cos(n)*random(2,40),sin(n))
    
    // Colours !
	  if (n-5>1) stroke(255,0,0,t);
    else stroke(0,0,255,t)
    
    // Plot the point
	  circle(p.x,p.y) // Use circles please. Don't be like me
  }
  
  t++; // Time ticking :)
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



function rnd_hash() {
  let chars = "0123456789abcdef";
  let result = '0x';
  for (let i = 64; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

//let tokenData = {"hash":"0x691e99da0aa5f5530a7b3b9dc2b75c8f1c462e4bf20c52bc79fb8dc6c4179ffd","tokenId":"0"}
let tokenData = {"hash":rnd_hash(),"tokenId":"0"}
let seed = parseInt(tokenData.hash.slice(0, 16), 16);
//console.log(tokenData.hash)

class Palette {
  constructor(colors, repeat=3) {
    this.c = colors;
    this.repeat = repeat;
    this.i = 0;
    this.u = 0;
  }
  increment() {
    if (this.i == this.c.length-1) {
      this.i = 0
    } else {
      this.i += 1
    }
  }
  usage() {
    if (this.u % this.repeat == 0) {
      this.increment()
    }
    this.u += 1
  }
  color() {
    this.usage()
    return this.c[this.i]
  }
}

var DEFAULT_SIZE = 1112
var WIDTH = 1112;
var HEIGHT = 834;
var DIM = WIDTH;
var M = DIM / DEFAULT_SIZE
var PAL = ["#1B064C", "#F72585", "#B5179E", "#7209B7", "#4361EE", "#4361EE", "#4895EF", "#4CC9F0"]
var bg = "#000003"
var mod_1 = 0.1
var mod_2 = 0.25

mod_1 = mod_1 > 1 ? 1 : mod_1
mod_1 = mod_1 < 0 ? 0 : mod_1
mod_2 = mod_2 > 1 ? 1 : mod_2
mod_2 = mod_2 < 0 ? 0 : mod_2

var repeat = Math.floor(mod_1*10)+1
var P1 = new Palette(PAL.slice(1), repeat=repeat)

var max_h = rnd_between(1, 20)*M
var max_w = rnd_between(5, 100)*M

function rr(x, y, w, h) {
  fill(P1.color())
  stroke(bg)
  strokeWeight(rnd_between(1, 10)*M)
  if (rnd_between(0, 0.55) > 0.5) {
    rect_partition(x, y, x+w, y+h)
  }
  let sw = rnd_between(0, 0.7) > 0.5;
  let sl = rnd_between(0.1, 0.8);
  if (sw && w > max_w)
  {
    rr(x, y, w * sl, h);
    rr(x + (w * sl), y, w * (1 - sl), h);
  }
  else if (h > max_h)
  {
    rr(x, y, w, h * sl);
    rr(x, y + (h * sl), w, h * (1 - sl));
  }
}
function hatch(x1, x2, y1, y2, x_step, y_step) {
  let y_range = range(y1, y2, y_step) 
  for (let i=0; i < y_range.length-1; i++) {
    let y1 = y_range[i]
    let y2 = y_range[i+1]
    rect_partition(x1, y1, x2, y2, step=x_step) 
  }
}
function rescale(e, t, r, i, a) {
  return ((e - t) / (r - t)) * (a - i) + i
}
function range(start, stop, step) {
    var a = [start], b = start;
    while (b < stop) {
        a.push(b += step || 1);
    }
    return (b > stop) ? a.slice(0,-1) : a;
}
function rect_partition(x1, y1, x2, y2) {
  let step = 15*M
  let breaks = range(x1, x2, step).slice(rnd_between(1,5))
  rect(x1, y1, (x2-x1), (y2-y1))
  let height = y2-y1
  for (let xm of breaks) {
    fill(P1.color())
    rect(x1, y1, (xm-x1), (y2-y1))
    x1 = xm
  }
}
function rnd_dec() {
  seed ^= seed << 13
  seed ^= seed >> 17
  seed ^= seed << 5
  return ((seed < 0 ? ~seed + 1 : seed) % 1000) / 1000
}
function rnd_between(a, b) {
  return a + (b - a) * rnd_dec()
}
function rnd_choice(choices) {
  return choices[Math.floor(rnd_between(0, choices.length * 0.99))]
}

let lapse = 0;    // mouse timer
function mousePressed(){
  // prevents mouse press from registering twice
  if (millis() - lapse > 400){
    save('pix.jpg');
    lapse = millis();
  }
}

