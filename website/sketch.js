let pic;
let density = "@$B&W#M*/\\)(}{][?_-+~^!1i|:;,.    ";

function setup() {
  // Create a canvas
  createCanvas(400, 400);

  // Initialize the pic variable
  pic = createImg('', 'image');
  pic.hide(); // Hide the image element initially
}

function uploadFile() {
  const fileInput = document.getElementById('file');
  const file = fileInput.files[0];

  if (file) {
    // Create a data URL from the selected file and set it as the source of the image
    const reader = new FileReader();
    reader.onload = function(event) {
      pic.elt.src = event.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    console.log("No file selected.");
  }
}

function draw() {
  // Display the image on the canvas
  image(pic, 0, 0, width, height);

  // Generate ASCII art
  let asciiArt = getArt();
  document.getElementById("asciiArtContainer").textContent = asciiArt;
}

function getArt() {
  loadPixels();
  let art = "";
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      const index = (i + j * width) * 4;
      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];
      const greyScale = (r + g + b) / 3;
      art += density[Math.floor(greyScale / (255 / density.length))];
    }
    art += "\n";
  }
  return art;
}
