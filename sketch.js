let video;
let canvasWidth = 820;
let canvasHeight = 550;

// define an object of language options
const languages = {
  "Chinese": "美丽的",
  "Thai": "สวย",
  "Korean": "아름다운",
  "Arabic": "جميل",
  "Japanese": "美しい"
};

// initialize density with the first language option
let density = languages["Chinese"];

// create the dropdown menu and add options
let dropdown;
function setupDropdown() {
  dropdown = createSelect();
  dropdown.position(10, 10);
  Object.keys(languages).forEach(lang => {
    dropdown.option(lang);
  });
  dropdown.changed(onLanguageSelected);
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  setupDropdown();
  video = createCapture(VIDEO);
  video.size(canvasWidth / 10, canvasHeight / 10);
  video.hide();
  // button = createButton("save");
  // button.mousePressed(keyPressed);
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
      const shade = map(avg, 0, 255, 100, 255);
      fill(shade);

      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));

      textAlign(CENTER, CENTER);
      text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);
    }
  }
}

function keyPressed() {
  // this will download the frame
  // saveCanvas(density, "jpg");
}

function onLanguageSelected() {
  // update density with the selected language option
  const selectedLang = dropdown.value();
  density = languages[selectedLang];
}


function windowResized() {
  // this function will be called whenever the window is resized
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  resizeCanvas(canvasWidth, canvasHeight);
}