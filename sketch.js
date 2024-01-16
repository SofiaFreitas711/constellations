let w = window.innerWidth
let h = window.innerHeight
let video
let poseNet
let pose
let skeleton

class Star {
  constructor() {
    this.opacity = 255
    this.color = color(255, 255, 255, this.opacity)
    this.posX = random(0, w)
    this.posY = random(0, h)
    this.scale = random(0.5, 1)
  }

  draw() {

    push()
    fill(this.color)
    drawingContext.shadowBlur = 30
    drawingContext.shadowColor = color("white")
    beginShape()
    vertex(this.posX + 10, this.posY + 2)
    vertex(this.posX + 14, this.posY + 8)
    vertex(this.posX + 20, this.posY + 8)
    vertex(this.posX + 16, this.posY + 14)
    vertex(this.posX + 20, this.posY + 20)
    vertex(this.posX + 10, this.posY + 16)
    vertex(this.posX + 0, this.posY + 20)
    vertex(this.posX + 4, this.posY + 14)
    vertex(this.posX + 0, this.posY + 8)
    vertex(this.posX + 6, this.posY + 8)
    vertex(this.posX + 10, this.posY + 2)

    endShape()
    pop()
  }
}

let stars = []


let planetR;
class PlanetRadial {
  constructor(colorStop1, colorStop2) {
    this.x = random(0, w);
    this.y = random(0, h);
    this.radius = 100;
    this.scale = random(0.1, 3)
    this.colorStop1 = colorStop1;
    this.colorStop2 = colorStop2;
  }
  draw() {
    noStroke()

    let grad2 = drawingContext.createRadialGradient(
      this.x - 60, this.y - 40, 0,
      this.x - 60, this.y - 40, this.radius + 60
    );

    grad2.addColorStop(0, this.colorStop1);
    grad2.addColorStop(1, this.colorStop2);

    drawingContext.fillStyle = grad2;

    circle(this.x, this.y, this.radius * this.scale);
  }
}

let planetL;
class PlanetLinear {
  constructor(colorStop1, colorStop2, colorStop3) {
    this.x = random(0, w);
    this.y = random(0, h);
    this.radius = 100;
    this.scale = random(0.1, 3)
    this.colorStop1 = colorStop1;
    this.colorStop2 = colorStop2;
    this.colorStop3 = colorStop3;
  }

  draw() {
    noStroke();

    let grad = drawingContext.createLinearGradient(
      this.x, this.y - this.radius,
      this.x, this.y + this.radius
    );

    grad.addColorStop(0, this.colorStop1);
    grad.addColorStop(0.5, this.colorStop2);
    grad.addColorStop(1, this.colorStop3);

    drawingContext.fillStyle = grad;

    circle(this.x, this.y, this.radius * 2);
  }
}

let galaxy
class Galaxy {
  constructor(colorStop1, colorStop2) {
    this.x = random(0, w);
    this.y = random(0, h);
    this.radius = 200;
    this.scale = random(0.1, 3)
    this.colorStop1 = colorStop1;
    this.colorStop2 = colorStop2;
  }
  draw() {
    noStroke()

    let grad2 = drawingContext.createRadialGradient(
      this.x, this.y, this.radius * 0.1,
      this.x, this.y, this.radius * 0.7
    );

    grad2.addColorStop(0, this.colorStop1);
    grad2.addColorStop(0.5, this.colorStop2);

    drawingContext.fillStyle = grad2;

    ellipse(this.x, this.y, this.radius * 0.7, this.radius * 1.4);
  }
}

let galaxy02
class Galaxy02 {
  constructor(colorStop1, colorStop2) {
    this.x = random(0, w);
    this.y = random(0, h);
    this.radiusX = 250;
    this.radiusY = 100;
    this.scale = random(0.5, 3)
    this.colorStop1 = colorStop1;
    this.colorStop2 = colorStop2;
  }
  draw() {
    noStroke()
    scale(this.scale, 0.5);

    push()

    let grad2 = drawingContext.createRadialGradient(
      this.x, this.y, this.radiusX / 150,
      this.x, this.y, this.radiusY
    );

    grad2.addColorStop(0, color(
      red(this.colorStop1),
      green(this.colorStop1),
      blue(this.colorStop1),
      255
    ));

    grad2.addColorStop(0.5, color(
      red(this.colorStop2),
      green(this.colorStop2),
      blue(this.colorStop2),
      0
    ));

    drawingContext.fillStyle = grad2;

    ellipse(this.x, this.y, this.radiusX, this.radiusY);
    pop()
  }
}

function setup() {
  createCanvas(w, h);
  video = createCapture(VIDEO)
  video.size(w, h)
  video.hide()
  poseNet = ml5.poseNet(video);
  poseNet.on('pose', gotPoses)

  for (let i = 0; i < 50; i++) {
    stars[i] = new Star()
  }

  planetL = new PlanetLinear(color(10, 150, 100), color(252, 232, 100), color(310, 80, 100));
  planetR = new PlanetRadial(color(252, 232, 100), color(310, 80, 100));
  galaxy = new Galaxy(color(252, 232, 100, 200), color(310, 80, 100, 0));
  galaxy02 = new Galaxy02(color(252, 232, 100, 255), color(310, 80, 100, 0));
}

function gotPoses(poses) {

  if (poses.length > 0) {
    pose = poses[0].pose
    skeleton = poses[0].skeleton
  }
}

function draw() {

  //flip camera
  // translate(w,0)
  // scale(-1,1)
  image(video, 0, 0)
  background(2, 1, 10, 220)

  for (let i = 0; i < stars.length; i++) {
    let star = stars[i]

    star.draw()
  }


  if (pose) {
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x
      let y = pose.keypoints[i].position.y
      noStroke()
      fill(255, 255, 0)
      ellipse(x, y, 16) //trocar isto pela class star
    }

    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0]
      let b = skeleton[i][1]
      stroke(255, 255, 255)
      line(a.position.x, a.position.y, b.position.x, b.position.y)
    }

  }

  planetL.draw();
  planetR.draw();
  galaxy.draw()
  galaxy02.draw()

}
