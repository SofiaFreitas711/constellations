class Star {
  constructor(x,y) {
    this.opacity = 255
    this.color = color(255, 255, 255, this.opacity)
    this.x = random(0, w)
    this.y = random(0, h)
    this.scale = random(0.5, 1)
  }

  draw() {

    push()
    fill(this.color)
    drawingContext.shadowBlur = 30
    drawingContext.shadowColor = color("white")
    beginShape()
    vertex(this.x + 10, this.y + 2)
    vertex(this.x + 14, this.y + 8)
    vertex(this.x + 20, this.y + 8)
    vertex(this.x + 16, this.y + 14)
    vertex(this.x + 20, this.y + 20)
    vertex(this.x + 10, this.y + 16)
    vertex(this.x + 0, this.y + 20)
    vertex(this.x + 4, this.y + 14)
    vertex(this.x + 0, this.y + 8)
    vertex(this.x + 6, this.y + 8)
    vertex(this.x + 10, this.y + 2)

    endShape()
    pop()
  }
}

class PlanetRadial {
  constructor(colorStop1, colorStop2) {
    this.x = random(0, w/2);
    this.y = random(0, h/3);
    this.radius = 70;
    this.scale = random(0.1, 1)
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

class PlanetLinear {
  constructor(colorStop1, colorStop2, colorStop3) {
    this.x = random(w/2, w);
    this.y = random(h, h/3);
    this.radius = 60;
    this.scale = random(0.1, 1)
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

class Galaxy {
  constructor(colorStop1, colorStop2) {
    this.x = random(0, w/2);
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

class Galaxy02 {
  constructor(colorStop1, colorStop2) {
    this.x = random(w/2, w);
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

let video;
let poseNet;
let pose
let poses = []
let w = window.innerWidth
let h = window.innerHeight
let leftShoulderX = 0
let leftShoulderY = 0
let rightShoulderX = 0
let rightShoulderY = 0
let leftElbowX = 0
let leftElbowY = 0
let rightElbowX = 0
let rightElbowY = 0
let leftWristX = 0
let leftWristY = 0
let rightWristX = 0
let rightWristY = 0
let leftHipX = 0
let leftHipY = 0
let rightHipX = 0
let rightHipY = 0
let leftKneeX = 0
let leftKneeY = 0
let rightKneeX = 0
let rightKneeY = 0
let skeleton
let stars = []
let planetR;
let planetL;
let galaxy
let galaxy02
let length
let sky 
let stage = 0

function setup() {
  let canvas = createCanvas(1000,750);
  canvas.position(250,0)
  video = createCapture(VIDEO)
  video.size(1000,750)

  poseNet = ml5.poseNet(video, {poseResolution: 17, confidenceThreshold: 0.7,maxPoseDetections:1});
  poseNet.on("pose", gotPoses);
  video.hide();

  // planetL = new PlanetLinear(color(10, 150, 100), color(252, 232, 100), color(310, 80, 100));
  // planetR = new PlanetRadial(color(252, 232, 100), color(310, 80, 100));
  // galaxy = new Galaxy(color(252, 232, 100, 200), color(310, 80, 100, 0));
  // galaxy02 = new Galaxy02(color(252, 232, 100, 255), color(310, 80, 100, 0));

  for (let i = 0; i < 30; i++) {
    stars[i] = new Star()
  }

  length = stars.length
  stars[length] = new Star
  stars[length].x = leftShoulderX
  stars[length].y = leftShoulderY
  stars[length].color = color("#fae588")
  stars[length+1] = new Star 
  stars[length+1].x = rightShoulderX
  stars[length+1].y = rightShoulderY
  stars[length+1].color = color("#f9dc5c")
  stars[length+2] = new Star
  stars[length+2].x = leftElbowX
  stars[length+2].y = leftElbowY
  stars[length+2].color = color("#f9dc5c")
  stars[length+3] = new Star
  stars[length+3].x = rightElbowX
  stars[length+3].y = rightElbowY
  stars[length+3].color = color("#f9dc5c")
  stars[length+4] = new Star
  stars[length+4].x = leftWristX
  stars[length+4].y = leftWristY
  stars[length+4].color = color("#f9dc5c")
  stars[length+5] = new Star
  stars[length+5].x = rightWristX
  stars[length+5].y = rightWristY
  stars[length+5].color = color("#f9dc5c")
  stars[length+6] = new Star
  stars[length+6].x = leftHipX
  stars[length+6].y = leftHipY
  stars[length+6].color = color("#f9dc5c")
  stars[length+7] = new Star
  stars[length+7].x = rightHipX
  stars[length+7].y = rightHipY
  stars[length+7].color = color("#f9dc5c")
  stars[length+8] = new Star
  stars[length+8].x = leftKneeX
  stars[length+8].y = leftKneeY
  stars[length+8].color = color("#f9dc5c")
  stars[length+9] = new Star
  stars[length+9].x = rightKneeX
  stars[length+9].y = rightKneeY
  stars[length+9].color = color("#f9dc5c")


}

function gotPoses(poses) {
  
  if (poses.length > 0) {
    pose = poses[0].pose
    skeleton = poses[0].skeleton
    let LSX = pose.keypoints[5].position.x
    let LSY = pose.keypoints[5].position.y
    let RSX = pose.keypoints[6].position.x
    let RSY = pose.keypoints[6].position.y
    let LEX = pose.keypoints[7].position.x
    let LEY = pose.keypoints[7].position.y
    let REX = pose.keypoints[8].position.x
    let REY = pose.keypoints[8].position.y
    let LWX = pose.keypoints[9].position.x
    let LWY = pose.keypoints[9].position.y
    let RWX = pose.keypoints[10].position.x
    let RWY = pose.keypoints[10].position.y
    let LHX = pose.keypoints[11].position.x
    let LHY = pose.keypoints[11].position.y
    let RHX = pose.keypoints[12].position.x
    let RHY = pose.keypoints[12].position.y
    let LKX = pose.keypoints[13].position.x
    let LKY = pose.keypoints[13].position.y
    let RKX = pose.keypoints[14].position.x
    let RKY = pose.keypoints[14].position.y
    

    leftShoulderX = lerp(leftShoulderX, LSX,0.5)
    leftShoulderY = lerp(leftShoulderY, LSY,0.5)
    rightShoulderX = lerp(rightShoulderX,RSX, 0.5)
    rightShoulderY = lerp(rightShoulderY, RSY, 0.5)
    leftElbowX = lerp(leftElbowX, LEX, 0.5)
    leftElbowY = lerp(leftElbowY, LEY, 0.5)
    rightElbowX = lerp(rightElbowX, REX, 0.5)
    rightElbowY = lerp(rightElbowY, REY, 0.5)
    leftWristX = lerp(leftWristX, LWX,0.5)
    leftWristY = lerp(leftWristY, LWY, 0.5)
    rightWristX = lerp(rightWristX, RWX, 0.5)
    rightWristY = lerp(rightWristY, RWY, 0.5)
    leftHipX = lerp(leftHipX, LHX, 0.5)
    leftHipY = lerp(leftHipY, LHY, 0.5)
    rightHipX = lerp(rightHipX, RHX, 0.5)
    rightHipY = lerp(rightHipY, RHY, 0.5)
    leftKneeX = lerp(leftKneeX, LKX, 0.5)
    leftKneeY = lerp(leftKneeY, LKY, 0.5)
    rightKneeX = lerp(rightKneeX, RKX, 0.5)
    rightKneeY = lerp(rightKneeY, RKY, 0.5)

  }
}

function draw() {
  image(video, 0, 0, width, height);
  // planetL.draw();
  // planetR.draw();
  // galaxy.draw()
  // galaxy02.draw()
  // ["0E1422","273559","324063"]
  push()
  if(stage == 0){
    sky = "#0E1422"
  }else if(stage == 1){
    sky = "#273559"
  }else{
    sky = "#324063"
  }
  // document.querySelector("html").style.backgroundColor = sky
  // document.querySelector("body").style.border = sky
  fill(sky)
  rect(0,0,w,h)
  pop()
  drawSkeleton();
  // drawConstellation()

  

  for (let i = 0; i < stars.length; i++) {
    let star = stars[i]
    star.draw()
  }

  stars[length].x = leftShoulderX -8
  stars[length].y = leftShoulderY -8
  stars[length+1].x = rightShoulderX -8
  stars[length+1].y = rightShoulderY -8
  stars[length+2].x = leftElbowX-8
  stars[length+2].y = leftElbowY-8
  stars[length+3].x = rightElbowX-8
  stars[length+3].y = rightElbowY-8
  stars[length+4].x = leftWristX-8
  stars[length+4].y = leftWristY-8
  stars[length+5].x = rightWristX-8
  stars[length+5].y = rightWristY-8
  stars[length+6].x = leftHipX-8
  stars[length+6].y = leftHipY-8
  stars[length+7].x = rightHipX-8
  stars[length+7].y = rightHipY-8
  stars[length+8].x = leftKneeX-8
  stars[length+8].y = leftKneeY-8
  stars[length+9].x = rightKneeX-8
  stars[length+9].y = rightKneeY-8
  
  

  fill("red")

}

function drawSkeleton() {
  stroke("white")
  line(leftShoulderX, leftShoulderY, rightShoulderX, rightShoulderY)
  line(rightShoulderX, rightShoulderY, rightHipX, rightHipY)
  line(rightHipX, rightHipY, leftHipX, leftHipY)
  line(leftShoulderX, leftShoulderY, leftHipX, leftHipY)
  line(leftShoulderX, leftShoulderY, leftElbowX, leftElbowY)
  line(leftElbowX, leftElbowY, leftWristX, leftWristY)
  line(rightShoulderX, rightShoulderY, rightElbowX, rightElbowY)
  line(rightElbowX, rightElbowY, rightWristX, rightWristY)
  line(leftHipX, leftHipY, leftKneeX, leftKneeY)
  line(rightHipX, rightHipY, rightKneeX, rightKneeY)
  
}

// let constellations = [{},{},{}]

// function drawConstellation(){

// }