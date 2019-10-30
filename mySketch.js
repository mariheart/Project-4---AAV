let mic;
let isOn = 0;
function setup() {
  createCanvas(400, 400);
  mic = new p5.AudioIn();
	frameRate(10);
}

function draw() {
	//Defining colors for the Grid
	let c1 = color(255, 100, 0);
	let c2 = color(0, 255, 100);
	
	//Defining colors for the BG
	let co1 = color(100, 0, 255);
	let co2 = color(255, 100, 255);
	
	let inter = map(mouseY, height, 0, 0, 1); // Inter value for BG
	let colBG = lerpColor(co1, co2, inter);
  background(colBG);
	mouseClicked();
  let vol = mic.getLevel();
  let inp = map(vol, 0, 1, 20, 5000);
	let inpter = map(vol, 0, 1, 0, 1);
  
  let osc = new p5.Oscillator();
  osc.setType('triangle');
  osc.freq(inp);
  osc.amp(0.05);
  osc.start();
  console.log(vol);
  let yVal = map(vol, 0, 1, 50, 350); // Grid yVal
  let leftX = map (vol, 0, 1, 50, 100); // Grid left xVal
  let rightX = map(vol, 0, 1, 325, 375); // Grid right xVal
	let colGrid = lerpColor(c1, c2, inpter); // Grid colors
	fill(colGrid);
	noStroke();
  quad(100, 350, 300, 350, rightX, yVal, leftX, yVal);
  
	ellipseMode(CENTER);
	ellipse(50, 20, 19, 19);
	ellipse(350, 20, 19, 19);
}

function mouseClicked() {
	if (isOn == 0) {
		mic.start();
		isOn = 1;
	} else if (isOn == 1) {
		mic.stop();
		isOn = 0;
	}
}