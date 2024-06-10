// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

let seed = 1;
let plant1, plant2, plant3;
let particles;
let particleNum;

// Shows framerate from how quickly it moves

let greenSway = 0;
let greenAlternate = false;
let grassBreeze = 0;

// optimal plant
let opPlant;
let hoverPlant = null; // To keep track of which plant is being hovered over

function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(1000, 600);
  canvas.parent("canvas-container");

  initializePlants();
  initializeParticles();

  // Attach event listener to the button
  $("#randomize-btn").click(randomizePlants);


  drawBackground();
}

// Initialize plants with default values
function initializePlants() {
  plant1 = new Plant(width / 4, 550, [4, 70, 3, 60, color(50, 100, 50), color(100, 100, 50)]);
  plant2 = new Plant(width / 2, 550, [3, 45, 2, 50, color(50, 100, 100), color(100, 50, 20)]);
  plant3 = new Plant(3 * width / 4, 550, [5, 40, 5, 50, color(70, 150, 150), color(150, 100, 150)]);
}

// // draw() function is called repeatedly, it's the main animation loop
 function draw() {
  drawBackground();
  drawParticles();
 }

function mouseMoved() {
  if (isMouseOverPlant(plant1)) {
    hoverPlant = plant1;
  } else if (isMouseOverPlant(plant2)) {
    hoverPlant = plant2;
  } else if (isMouseOverPlant(plant3)) {
    hoverPlant = plant3;
  } else {
    hoverPlant = null;
  }
}

function mousePressed() {
  if (hoverPlant) {
    generatePlantChildren(hoverPlant);
    randomSeed(seed);
    drawBackground();
  }
}

function isMouseOverPlant(plant) {
  // Calculate the center of the plant and its clickable radius
  let centerX = plant.x;
  let centerY = plant.y - plant.structure[3]*3;
  let clickableRadius = plant.structure[3] / 2 + 125;
  let distance = dist(mouseX, mouseY, centerX, centerY);
  return distance < clickableRadius;
}

function drawPlant(plant) {
  if (plant === hoverPlant) {
    stroke(255, 0, 0);
    strokeWeight(3);
    noFill();
    let centerX = plant.x;
    let centerY = plant.y - plant.structure[3] / 2;
    let clickableRadius = plant.structure[3] / 2+ 125;
    let circleDrawRadius = (clickableRadius * 2) + (sin(millis() / 90) * 12);
    ellipse(centerX, centerY, circleDrawRadius, circleDrawRadius); // Draw a red circle around the plant to indicate it's clickable
  }
  plant.drawFeatures();
}

function randomizePlants() {
  seed = Math.floor(Math.random() * 1000); // Change the seed for randomization

  // Randomize plant attributes
  plant1 = new Plant(width / 4, 550, [
    random(2, 6), 
    random(30, 70), 
    Math.floor(random(1, 6)), 
    random(30, 70), 
    color(random(255), random(255), random(255)), 
    color(random(255), random(255), random(255))
  ]);

  plant2 = new Plant(width / 2, 550, [
    random(2, 6), 
    random(30, 70), 
    Math.floor(random(1, 6)), 
    random(30, 70), 
    color(random(255), random(255), random(255)), 
    color(random(255), random(255), random(255))
  ]);

  plant3 = new Plant(3 * width / 4, 550, [
    random(2, 6), 
    random(30, 70), 
    Math.floor(random(1, 6)), 
    random(30, 70), 
    color(random(255), random(255), random(255)), 
    color(random(255), random(255), random(255))
  ]);
}

function generatePlantChildren(parentPlant) {
  seed = Math.floor(Math.random() * 1000); // Change the seed for randomization

  // [depth, angle, stems, length, stemColor, leafColor]
  // Randomize plant attributes

  plant1 = new Plant(width / 4, 550, [
    constrain(parentPlant.structure[0] + random(-3, 3), 2, 5),  
    random(30, 70), 
    constrain(parentPlant.structure[2] + floor(random(-2, 2)), 1, 8), 
    random(30, 70), 
    modulateColor(parentPlant.structure[4], .6, 1.4), 
    parentPlant.structure[5]
  ]);

  plant2 = new Plant(width / 2, 550, [
    constrain(parentPlant.structure[0] + random(-1, 1), 2, 5), 
    parentPlant.structure[1], 
    constrain(parentPlant.structure[2] + floor(random(-1, 1)), 1, 6), 
    constrain(random(parentPlant.structure[3] * .8, parentPlant.structure[3] * 1.5), 30, 90), 
    parentPlant.structure[4], 
    modulateColor(parentPlant.structure[5], .6, 1.4)
  ]);

  plant3 = new Plant(3 * width / 4, 550, [
    constrain(random(parentPlant.structure[0] * .5, parentPlant.structure[0] * 1.5), 0, 5), 
    random(parentPlant.structure[1] * .75, parentPlant.structure[1] * 1.25), 
    Math.floor(random(1, 6)), 
    constrain(random(parentPlant.structure[3] * .5, parentPlant.structure[3] * 1.2), 30, 90), 
    color(random(255), random(255), random(255)), 
    modulateColor(parentPlant.structure[5], .5, 1.5)
  ]);
}

function drawGreenhouse() {
  //Reset drawing scale
  scale(1, 1);

  let greenhouseGreen = color(211, 293, 199+greenSway);
  let groundColor = color(100, 200, 0);
  let groundShade = color(85,180,0);
  let groundDarken = color(70,150,0);
  
  // update animated sway
  
  if (greenSway == 0) {
    greenAlternate = !greenAlternate;
  }

  if (greenAlternate) {
    greenhouseGreen = color(211, 293, 230-greenSway);
  }
  
  greenSway += 0.5;
  greenSway = greenSway % 31;

  grassBreeze+=0.1;
  grassBreeze = grassBreeze % 100;

  // background
  background(greenhouseGreen);
  stroke(color(0, 0, 0));

  // roof
  fill(greenhouseGreen);
  strokeWeight(3);
  beginShape();
  vertex(0, 0);
  vertex(width / 3, 200);
  vertex(width / 2, 0);
  vertex(2 * width / 3, 200);
  vertex(width, 0);
  endShape();

  // floor
  fill(groundColor);
  beginShape();
  vertex(0, height);
  vertex(width / 3, 400);
  vertex(2 * width / 3, 400);
  vertex(width, height);
  endShape(CLOSE);

  /*// grass
  let grassPatch2 = grassBreeze + 33.3;
  grassPatch2 = grassPatch2 % 100;


  fill(groundShade);
  strokeWeight(2);
  beginShape();
  let grassTopX = (width/3 + grassBreeze*width/300);
  let grassBottomX = (grassBreeze*width/100);
  let axisGrass = (height-400) / 5;
  for (let grassA = 400; grassA <= height; grassA += 5) {
    vertex(grassBreeze*(grassA-400)/height,grassA);
  }
  endShape();*/

  // walls
  strokeWeight(3);
  beginShape();
  vertex(width / 3, 200);
  vertex(width / 3, 400);
  endShape();

  beginShape();
  vertex(2 * width / 3, 200);
  vertex(2 * width / 3, 400);
  endShape();
}

class Plant {
  constructor(x, y, structure) {
    this.structure = structure; // [depth, angle, stems, length, stemColor, leafColor]
    this.x = x;
    this.y = y;
    this.initAngle = this.structure[1];
    this.initLength = this.structure[3];
    this.stemColor = this.structure[4];
    this.leafColor = this.structure[5];
    this.initLengthAnim = 0;
  }

  animateFeatures()
  { 
    if(this.initLengthAnim < this.initLength)
    {
      this.initLengthAnim += 2;
      this.structure[3] = this.initLengthAnim;
    }
    else
    {
      this.structure[3] = this.initLength+ sin(millis() / 900) * 1;
    }
    
    
    this.structure[1] = this.initAngle + sin(millis() / 10000) * 12;
  }

  drawFeatures() {
    this.drawPlanter(this.x, this.y);
    this.plantRecur(this.x, this.y, this.structure[0], this.structure[1], this.structure[2], this.structure[3]);

    scale(1, 1);
  }

  plantRecur(x, y, depth, angle, stems, length) {
    if (depth <= 0) {
      this.drawLeaf(x, y);
      return;
    }

    let tempStems = Math.min(Math.max(stems, 1), 5);

    switch (tempStems) {
      case 1:
        let x2 = x + length * Math.cos((angle * Math.PI) / 180);
        let y2 = y - length * Math.sin((angle * Math.PI) / 180);
        this.drawStem(x, y, x2, y2);
        this.plantRecur(x2, y2, depth - 1, angle, stems, (2 * length) / 3);
        break;

      case 2:
        let x2a = x + length * Math.cos((angle * Math.PI) / 180);
        let y2a = y - length * Math.sin((angle * Math.PI) / 180);
        this.drawStem(x, y, x2a, y2a);
        this.plantRecur(x2a, y2a, depth - 1, angle + angle - 30, stems, (2 * length) / 3);

        let x2b = x - length * Math.cos((angle * Math.PI) / 180);
        let y2b = y - length * Math.sin((angle * Math.PI) / 180);
        this.drawStem(x, y, x2b, y2b);
        this.plantRecur(x2b, y2b, depth - 1, angle + angle - 30, stems, (2 * length) / 3);
        break;

      case 3:
        let x1 = x + length * Math.cos((90 * Math.PI) / 180);
        let y1 = y - length * Math.sin((90 * Math.PI) / 180);
        this.drawStem(x, y, x1, y1);
        this.plantRecur(x1, y1, depth - 1, angle, stems, (2 * length) / 3);

        let x3 = x - length * Math.cos((angle * Math.PI) / 180);
        let y3 = y - length * Math.sin((angle * Math.PI) / 180);
        this.drawStem(x, y, x3, y3);
        this.plantRecur(x3, y3, depth - 1, angle + angle - 30, stems, (2 * length) / 3);

        let x3a = x + length * Math.cos(((90 - angle) / 2 + angle) * Math.PI / 180);
        let y3a = y - length * Math.sin(((90 - angle) / 2 + angle) * Math.PI / 180);
        this.drawStem(x, y, x3a, y3a);
        this.plantRecur(x3a, y3a, depth - 1, angle + angle - 30, stems, (2 * length) / 3);
        break;

      case 4:
        let x4a = x + length * Math.cos((angle * Math.PI) / 180);
        let y4a = y - length * Math.sin((angle * Math.PI) / 180);
        this.drawStem(x, y, x4a, y4a);
        this.plantRecur(x4a, y4a, depth - 1, angle + angle - 30, stems, (2 * length) / 3);

        let x4b = x - length * Math.cos((angle * Math.PI) / 180);
        let y4b = y - length * Math.sin((angle * Math.PI) / 180);
        this.drawStem(x, y, x4b, y4b);
        this.plantRecur(x4b, y4b, depth - 1, angle + angle - 30, stems, (2 * length) / 3);

        let x4c = x + length * Math.cos(((90 - angle) / 2 + angle) * Math.PI / 180);
        let y4c = y - length * Math.sin(((90 - angle) / 2 + angle) * Math.PI / 180);
        this.drawStem(x, y, x4c, y4c);
        this.plantRecur(x4c, y4c, depth - 1, angle + angle - 30, stems, (2 * length) / 3);

        let x4d = x - length * Math.cos(((90 - angle) / 2 + angle) * Math.PI / 180);
        let y4d = y - length * Math.sin(((90 - angle) / 2 + angle) * Math.PI / 180);
        this.drawStem(x, y, x4d, y4d);
        this.plantRecur(x4d, y4d, depth - 1, angle + angle - 30, stems, (2 * length) / 3);
        break;

      case 5:
        let x5a = x + length * Math.cos((angle * Math.PI) / 180);
        let y5a = y - length * Math.sin((angle * Math.PI) / 180);
        this.drawStem(x, y, x5a, y5a);
        this.plantRecur(x5a, y5a, depth - 1, angle + angle - 30, stems, (2 * length) / 3);

        let x5b = x - length * Math.cos((angle * Math.PI) / 180);
        let y5b = y - length * Math.sin((angle * Math.PI) / 180);
        this.drawStem(x, y, x5b, y5b);
        this.plantRecur(x5b, y5b, depth - 1, angle + angle - 30, stems, (2 * length) / 3);

        let x5c = x + length * Math.cos(((90 - angle) / 2 + angle) * Math.PI / 180);
        let y5c = y - length * Math.sin(((90 - angle) / 2 + angle) * Math.PI / 180);
        this.drawStem(x, y, x5c, y5c);
        this.plantRecur(x5c, y5c, depth - 1, angle + angle - 30, stems, (2 * length) / 3);

        let x5d = x - length * Math.cos(((90 - angle) / 2 + angle) * Math.PI / 180);
        let y5d = y - length * Math.sin(((90 - angle) / 2 + angle) * Math.PI / 180);
        this.drawStem(x, y, x5d, y5d);
        this.plantRecur(x5d, y5d, depth - 1, angle + angle - 30, stems, (2 * length) / 3);

        let x5e = x + length * Math.cos((90 * Math.PI) / 180);
        let y5e = y - length * Math.sin((90 * Math.PI) / 180);
        this.drawStem(x, y, x5e, y5e);
        this.plantRecur(x5e, y5e, depth - 1, angle, stems, (2 * length) / 3);
        break;
    }
  }

  drawStem(x1, y1, x2, y2) {
    stroke(this.stemColor);
    strokeWeight(5);
    beginShape();
    vertex(x1, y1);
    vertex(x2, y2);
    endShape();
  }

  drawLeaf(x, y) {
    stroke(this.stemColor);
    fill(this.leafColor);
    strokeWeight(0);
    circle(x, y, 20);
  }

  drawPlanter(x, y) {
    let dirt = color(205, 125, 50);
    let planterColor = color(155, 75, 0);
    fill(dirt);
    strokeWeight(10);
    stroke(planterColor);
    beginShape();
    vertex(x - 40, y - 20);
    vertex(x + 40, y - 20);
    vertex(x + 50, y + 20);
    vertex(x - 50, y + 20);
    endShape(CLOSE);
  }
}

class Particles
{
  constructor(x, y, radius) 
  {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.offset = random(0, 9999);
  }

  move()
  {
    this.x += (noise(this.offset + millis() / 1000) - .5);
    constrain(this.x, 0, width);
    this.y += (noise(this.offset + 1000 + (millis() / 1000)) - .5);
    constrain(this.y, 0, height);
  }

  drawParticle()
  {
    fill(255, 255, 255, 128);
    ellipse(this.x, this.y, this.radius);
  }
}

function modulateColor(input, minCol, maxCol)
{
  let r = random(red(input) * minCol, red(input) * maxCol);
  let g = random(green(input) * minCol, green(input) * maxCol);
  let b = random(blue(input) * minCol, blue(input) * maxCol);

  return color(r, g, b);
}

function drawBackground()
{
  plant1.animateFeatures();
  plant2.animateFeatures();
  plant3.animateFeatures();
  // set up greenhouse background
  drawGreenhouse();

  // draw plants with hover effect if applicable
  drawPlant(plant1);
  drawPlant(plant2);
  drawPlant(plant3);
}

function initializeParticles()
{
  partciles = [];
  particleNum = 50;

  for(let i = 0; i < particleNum; i++)
  {
    partciles[i] = new Particles(random(0, width), random(0, height * .66), random(5, 15));
  }
}

function drawParticles()
{
  for(let i = 0; i < particleNum; i++)
  {
    partciles[i].move();
    partciles[i].drawParticle();
  }
}
