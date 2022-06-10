function setup() {
  createCanvas(400, 400);
  //non animation
  noLoop ();

}

function draw() {
  background(000);
  //random size
  A_001 = random (10,20,30,40);
  A_002 = random (40,55,65,80);
  random (A_001,A_002);
  //geometry rect,circle,point
  rect (100,100,random (A_001,A_002),random (A_001,A_002));
}
