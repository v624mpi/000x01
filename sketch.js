
var tree; //a graphics buffer to draw the tree into

var paths = []; //an array for all the growing branches


function setup() {
  createCanvas(800, 1000); //canvas size
  tree = createGraphics(800, 1000); //decide how big the image is to hold the tree drawing
  ellipseMode(CENTER);
  smooth();
  frameRate(60); //makes tree grow slowly
  
  paths.push(new Pathfinder());
}
function draw() {
  //background(200, 200, 220);
  //blue
  //background("#162277");
    background("#E7E8EE");
  //red
  //background("#000000");
  image(tree, 0, 0, width, height); //here we draw the tree to the screen every frame
  //pallete = '#89FF00', '#FDFF00', '#075800', '#C8D48A', '#7A98AB', '#6A889E', '#343B43', '#324443', '#4A5C5C'
  //tree.stroke(random(['#142227', '#3E5F71', '#B3BFCF', '#244352', '#7A98AB', '#6A889E', '#343B43', '#324443', '#4A5C5C'])); //tree has no stroke
   //tree.stroke(random(['#89FF00', '#FDFF00', '#075800', '#C8D48A', '#7A98AB'])); //tree has no stroke
   //1 "01005E", "000000", "3662AB", "FD6032", "FFFFFF", "FFFC05"
   //tree.stroke(random(["#01005E", "#000000", "#3662AB", "#FD6032", "#FFFFFF", "#FFFC05"])); //tree has no stroke
   //2 "#9DB8D8", "#FDC59A", "#7586BA", "#BAC8AE", "#D0B4CD", "#ffee9d"
   tree.stroke(random(["#0C175F", "#94A4D7", "#3C4B9E", "#213999"])); //tree has no stroke
  tree.strokeWeight(random(0.02,0.8));


  for (var i=0; i<paths.length; i++) { //start drawing the tree by going thru all the branches
    var loc = paths[i].location.copy(); //grab a copy of their location
    var diam = paths[i].diameter; //grab a copy of the branch diameter
    //blue
    //tree.fill("#0C175F"); //color of the tree
    //red 600C0C
    //tree.fill("#600C0C"); //color of the tree
    //dark 0D181B
    tree.fill("#E7E8EE"); //color of the tree
    //tree.noFill();
    tree.ellipse(loc.x, loc.y, diam, diam); //here we draw the next ellipse for each branch into the tree buffer
    paths[i].update(); //update the position and direction for the growth of each branch

  }
}


function Pathfinder(parent) { //the class for making branches - note that it allows for another branch object to be passed in...
  if (parent===undefined) { //if this is the first branch, then use the following settings - note that this is how you deal with different constructors
    this.location = createVector(400, 1000); //placemnet of the first branch, or trunk
    this.velocity = createVector(0, -1); //direction for the trunk, here -1 in the y axis = up
    this.diameter = 200; //size of trunk
  } else {
    this.location = parent.location.copy(); //for a new branch, copy in the last position, the end of the branch
    this.velocity = parent.velocity.copy(); //for a new branch, copy the direction the old branch was going
    var area = PI*sq(parent.diameter/1.5); //find the area of the branch cross section
    var newDiam = sqrt(area/random (1,1.5)/PI)*1.2; //divide it by two and calculate the diameter of this new branch
    this.diameter = newDiam; //save the new diameter
    parent.diameter = newDiam; //the parent branch keeps on growing, but with the new diameter as well
  }
  this.update = function() { //update the growth of the tree
    if (this.diameter>2) { //this indicates when the tree should stop growing, the smallest branch diameter
      this.location.add(this.velocity); //update the location of the end of the branch
      var bump = new createVector(random(-0.97, 0.97), random(-0.5, 0.5)); //this determines how straight or curly the growth is, here it is +-13% variation
      bump.mult(0.1); //this reduces that by ten so now it is +-1.3% variation
      this.velocity.add(bump); //apply that to the velocity for the next growth
      this.velocity.normalize(); //make sure our vector is normalized to be between 0-1
      if (random(0, 2)< random(0.015,0.025)) { //this is the probability that the tree splits, here it is 1% chance
        paths.push(new Pathfinder(this)); //if it is time for a split, make a new path
      }
    }
  }
}



  let lapse = 0;    // mouse timer
  function mousePressed() {
    // prevents mouse press from registering twice
    if (millis() - lapse > 400) {
      save('pix.jpg');
      lapse = millis();
    }
  }
