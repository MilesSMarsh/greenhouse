// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

let seed = 1;
// setup() function is called once when the program starts


// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  // code to run when mouse is pressed
}

function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(1000, 600);
  canvas.parent("canvas-container");
  
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {


  randomSeed(seed); // Seed the random number generator

  //set up greenhouse background
  drawGreenhouse();

  //instatntiate plant
  let plant1 = new Plant(width/4, 550, [4, 70, 3, 60]);
  let plant2 = new Plant(width/2, 550, [3, 45, 2, 50]);
  let plant3 = new Plant(3*width/4, 550, [5, 40, 5, 50]);



  plant1.drawFeatures();
  plant2.drawFeatures();
  plant3.drawFeatures();




  
  
}


function drawGreenhouse(){
  let greenhouseGreen = color(211, 293, 199);
  let groundColor = color(100, 200, 0);

  //background
  background(greenhouseGreen);
  stroke(color(0,0,0))

  //roof
  fill(greenhouseGreen);
  strokeWeight(3);
  beginShape();
  vertex(0, 0);
  vertex(width/3, 200);
  vertex(width/2, 0);
  vertex(2*width/3, 200);
  vertex(width, 0);
  endShape();

  //floor
  fill(groundColor)
  beginShape();
  vertex(0, height);
  vertex(width/3, 400);
  vertex(2*width/3, 400);
  vertex(width, height);
  endShape(CLOSE);

  //walls
  beginShape();
  vertex(width/3, 200);
  vertex(width/3, 400);
  endShape();

  //walls
  beginShape();
  vertex(2*width/3, 200);
  vertex(2*width/3, 400);
  endShape();
}


class Plant{
  constructor(x, y, structure){
    this.structure = structure; //[depth, angle, stems, length]
    this.plantColor = color(200, 100, 100);
    this.x = x;
    this.y = y;
  }

  drawFeatures(){
    this.drawPlanter(this.x, this.y)
    this.plantRecur(this.x, this.y, this.structure[0], this.structure[1], this.structure[2], this.structure[3])
  }

  plantRecur(x, y, depth, angle, stems, length){
    if(depth <= 0){
      this.drawLeaf(x, y)
      return;
    }

    let tempStems = 1;
    if(stems < 1){
      tempStems = 1;
    }
    else if(stems > 5){
      tempStems = 5;
    }
    else{
      tempStems = stems;
    }

    switch(tempStems){
      case 1:{
        let x2 = x + (length * Math.cos(angle*Math.PI/180));
        let y2 = y - (length * Math.sin(angle*Math.PI/180));
        this.drawStem(x, y, x2, y2);
        this.plantRecur(x2, y2, depth - 1, angle, stems, 2*length/3);
        break;
      }
      case 2:{
        let x2 = x + (length * Math.cos(angle*Math.PI/180));
        let y2 = y - (length * Math.sin(angle*Math.PI/180));
        this.drawStem(x, y, x2, y2);
        this.plantRecur(x2, y2, depth - 1, angle + angle-30, stems, 2*length/3);
    
        let x3 = x - length * Math.cos(angle*Math.PI/180);
        let y3 = y - length * Math.sin(angle*Math.PI/180);
        this.drawStem(x, y, x3, y3)
        this.plantRecur(x3, y3, depth - 1, angle + angle-30, stems, 2*length/3);
        break;
      }
      case 3:{

        let x1 = x + (length * Math.cos(90*Math.PI/180));
        let y1 = y - (length * Math.sin(90*Math.PI/180));
        this.drawStem(x, y, x1, y1);
        this.plantRecur(x1, y1, depth - 1, angle, stems, 2*length/3);

        let x2 = x + (length * Math.cos(angle*Math.PI/180));
        let y2 = y - (length * Math.sin(angle*Math.PI/180));
        this.drawStem(x, y, x2, y2);
        this.plantRecur(x2, y2, depth - 1, angle + angle-30, stems, 2*length/3);
    
        let x3 = x - length * Math.cos(angle*Math.PI/180);
        let y3 = y - length * Math.sin(angle*Math.PI/180);
        this.drawStem(x, y, x3, y3)
        this.plantRecur(x3, y3, depth - 1, angle + angle-30, stems, 2*length/3);
        break;
      }
      case 4:{
        let x1 = x + (length * Math.cos(angle*Math.PI/180));
        let y1 = y - (length * Math.sin(angle*Math.PI/180));
        this.drawStem(x, y, x1, y1);
        this.plantRecur(x1, y1, depth - 1, angle + angle-30, stems, 2*length/3);
    
        let x2 = x - length * Math.cos(angle*Math.PI/180);
        let y2 = y - length * Math.sin(angle*Math.PI/180);
        this.drawStem(x, y, x2, y2)
        this.plantRecur(x2, y2, depth - 1, angle + angle-30, stems, 2*length/3);

        let x3 = x + (length * Math.cos(((90 - angle)/2+angle)*Math.PI/180));
        let y3 = y - (length * Math.sin(((90 - angle)/2+angle)*Math.PI/180));
        this.drawStem(x, y, x3, y3);
        this.plantRecur(x3, y3, depth - 1, angle + angle-30, stems, 2*length/3);
    
        let x4 = x - length * Math.cos(((90 - angle)/2+angle)*Math.PI/180);
        let y4 = y - length * Math.sin(((90 - angle)/2+angle)*Math.PI/180);
        this.drawStem(x, y, x4, y4)
        this.plantRecur(x4, y4, depth - 1, angle + angle-30, stems, 2*length/3);

        break;

      }
      case 5:{
        let x0 = x + (length * Math.cos(90*Math.PI/180));
        let y0 = y - (length * Math.sin(90*Math.PI/180));
        this.drawStem(x, y, x0, y0);
        this.plantRecur(x0, y0, depth - 1, angle, stems, 2*length/3);

        let x1 = x + (length * Math.cos(angle*Math.PI/180));
        let y1 = y - (length * Math.sin(angle*Math.PI/180));
        this.drawStem(x, y, x1, y1);
        this.plantRecur(x1, y1, depth - 1, angle + angle-30, stems, 2*length/3);
    
        let x2 = x - length * Math.cos(angle*Math.PI/180);
        let y2 = y - length * Math.sin(angle*Math.PI/180);
        this.drawStem(x, y, x2, y2)
        this.plantRecur(x2, y2, depth - 1, angle + angle-30, stems, 2*length/3);

        let x3 = x + (length * Math.cos(((90 - angle)/2+angle)*Math.PI/180));
        let y3 = y - (length * Math.sin(((90 - angle)/2+angle)*Math.PI/180));
        this.drawStem(x, y, x3, y3);
        this.plantRecur(x3, y3, depth - 1, angle + angle-30, stems, 2*length/3);
    
        let x4 = x - length * Math.cos(((90 - angle)/2+angle)*Math.PI/180);
        let y4 = y - length * Math.sin(((90 - angle)/2+angle)*Math.PI/180);
        this.drawStem(x, y, x4, y4)
        this.plantRecur(x4, y4, depth - 1, angle + angle-30, stems, 2*length/3);

        break;
      }
    }
    
  }

  drawStem(x1, y1, x2, y2){
    stroke(this.plantColor);
    strokeWeight(5);
    beginShape();
    vertex(x1, y1);
    vertex(x2, y2);
    endShape();
  }

  drawLeaf(x, y){
    stroke(this.plantColor)
    fill(color("orange"));
    strokeWeight(0);
    circle(x, y, 20);
  }

  drawPlanter(x, y){
    let dirt = color(205, 125, 50)
    let planterColor = color(155, 75, 0)
    fill(dirt)
    strokeWeight(10)
    stroke(planterColor)
    beginShape();
    vertex(x - 40, y - 20);
    vertex(x + 40, y - 20);
    vertex(x + 50, y + 20);
    vertex(x - 50, y + 20);
    endShape(CLOSE);
  }
}

