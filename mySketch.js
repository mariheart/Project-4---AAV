let mic, recorder, soundFile; // DECLARE VARIABLES
let isOn = 0; // CHECKS IF MIC IS ON
let isRec = false; // CHECKS IF MIC IS RECORDING
let isPlay = false; // CHECKS IF LOOP IS PLAYING
function setup() {
  createCanvas(400, 400);
  mic = new p5.AudioIn(); // Set up mic!
	mic.connect(); // Connect to mic!
	frameRate(10);// SETS FRAME RATE
	recorder = new p5.SoundRecorder(); // Set up new recorder
	soundFile = new p5.SoundFile(); // Set up new soundfile
}

function keyPressed() {
	recorder.setInput(mic); // Sets recorder input
  if (keyIsPressed) { // KEY PRESSING TIME!
		if ((key == 'l' || key == 'L') && isRec == false) { // Record audio!
			recorder.record(soundFile);
			isRec = true;
			console.log("recording!")
		} else if ((key == 'l' || key == 'L') && isRec == true) { // Stop recording audio!
			recorder.stop();
			isRec = false;
			console.log("Done!")
		} else if ((key == 'p' || key == 'P') && isPlay == false) { // Play recorded audio!
			console.log("Playing loop!");
			soundFile.play();
			soundFile.loop();
			isPlay = true;
			} else if ((key == 'p' || key == 'P') && isPlay == true) { // Stop playing recorded audio!
			soundFile.stop();
			console.log("Stopped playing loop!");
			isPlay = false;
			}
	}
}

function draw() {
	//Defining colors for the Grid
	let c1 = color(255, 100, 0);
	let c2 = color(0, 255, 100);
	
	//Defining colors for the BG
	let co1 = color(100, 0, 255);
	let co2 = color(255, 100, 255);
	
	let inter = map(mouseY, height, 0, 0, 1); // Inter value for BG
	mouseClicked(); // Makes sure mic is on!
  let vol = mic.getLevel(); // Gets volume of mic!!
  let inp = map(vol, 0, 1, 20, 5000); // Maps frequency output of mic!
	let inpter = map(vol, 0, 1, 0, 1); // Maps color output of mic!
  
  let osc = new p5.Oscillator(); // Oscillator!
  osc.setType('triangle'); // Triangle wave!
  osc.freq(inp); // Input based on mic output!
  osc.amp(0.05); // Pretty quiet tho
  osc.start(); // Starts oscillating!
  let yVal = map(vol, 0, 1, 350, 50); // Grid yVal
  let leftX = map (vol, 0, 1, 100, 50); // Grid left xVal
  let rightX = map(vol, 0, 1, 300, 350); // Grid right xVal
	let colGrid = lerpColor(c1, c2, inpter); // Grid colors
	let colBG = lerpColor(co1, co2, inpter); // BG colors
	/*************************LET'S DRAW SOME SHAPES!****************************************/
  background(colBG); // Colors BG!
	fill(colGrid); // Colors grid!
	noStroke(); // Removes stroke from grid!
  quad(100, 350, 300, 350, rightX, yVal, leftX, yVal); // MAKES GRID!
  /*******LET'S DRAW SOME EYES!*******/
	let intEllipse = map(vol, 0, 1, 0, 19); // Maps whether eyes open or close depending on mic output
	ellipseMode(CENTER); // Orients ellipses to center
	ellipse(50, 20, 19, intEllipse); // Left eye
	ellipse(350, 20, 19, intEllipse); // Right eye
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