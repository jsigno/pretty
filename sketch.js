const density = "你很美丽";
let video;
let canvasWidth = 720;
let canvasHeight = 450;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  video = createCapture(VIDEO);
  video.size(canvasWidth / 10, canvasHeight / 10);
  video.hide();
  button = createButton("save");
  button.mousePressed(keyPressed);
}

function draw() {
  background(255);
  let w = width / video.width;
  let h = height / video.height;
  video.loadPixels();

  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (video.width - i + 1 + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;

      noStroke();
      fill(avg);

      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));

      textAlign(CENTER, CENTER);
      text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);
    }
  }
}

function keyPressed() {
  // this will download the frame
  saveCanvas("你很美丽", "jpg");
}

function windowResized() {
  // this function will be called whenever the window is resized
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  resizeCanvas(canvasWidth, canvasHeight);
}
