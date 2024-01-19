class Star {
  constructor(x,y) {
    this.opacity = 255
    this.color = color(255, 255, 255, this.opacity)
    this.x = random(0, w)
    this.y = random(0, h)
    this.scale = random(0.5, 1)
    this.blur = 0
  }

  draw() {

    push()
    fill(this.color)
    drawingContext.shadowBlur = this.blur
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

class Star02 {
  constructor(x,y) {
    this.opacity = 255
    this.color = color("red")
    this.x = random(0, w)
    this.y = random(0, h)
    this.scale = random(0.5, 1)
  }

  draw() {

    push()
    noStroke()
    fill(this.color)
    // drawingContext.shadowBlur = 30
    // drawingContext.shadowColor = color("white")
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

class ShootingStar{
  constructor(){
    this.color = color(255,255,255,200)
    this.x = -10
    this.y = 50

  }
  
  draw(){
    fill(this.color)
    noStroke()
    push()
    let grad = drawingContext.createLinearGradient(
      this.x -25, this.y,
      this.x+25, this.y
    );
    grad.addColorStop(0, color(255,255,255,0));
    grad.addColorStop(1, color(255,255,255,220));
    drawingContext.fillStyle = grad;
    ellipse(this.x-15, this.y, 100,20)
    pop()
    ellipse(this.x+25,this.y,10,10)
    
  }
  
  shoot(){
    this.x += 4.5
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
let stars02 = []
let planetR;
let planetL;
let galaxy
let galaxy02
let length
let sky 
let stage = 0
let constellations = [{LWX: 282, LWY: 521, LEX:334, LEY:462, LSX:439, LSY:410, RSX:569, RSY:422},
                      {LWX: 270, LWY: 310, LEX: 334, LEY:462, LSX:439,LSY:410, RSX:569,RSY:422},
                      {LWX: 350, LWY: 280, LEX: 280, LEY: 380, LSX:400, LSY:405, RSX:550, RSY:410, REX: 670, REY:450, RWX:850, RWY:440}]
let shootingStar
let drawShootingStar = false

function setup() {
  // translate(w,0)
  // scale(-1,1)
  let canvas = createCanvas(1000,820);
  canvas.position(350,0)
  video = createCapture(VIDEO)
  video.size(1000,820)

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
  shootingStar = new ShootingStar()
  length = stars.length

  stars[length] = new Star
  stars[length].x = leftShoulderX
  stars[length].y = leftShoulderY
  stars[length].color = color("#fe4a49")
  stars[length+1] = new Star 
  stars[length+1].x = rightShoulderX
  stars[length+1].y = rightShoulderY
  stars[length+1].color = color("#fe4a49")
  stars[length+2] = new Star
  stars[length+2].x = leftElbowX
  stars[length+2].y = leftElbowY
  stars[length+2].color = color("#fed766")
  stars[length+3] = new Star
  stars[length+3].x = rightElbowX
  stars[length+3].y = rightElbowY
  stars[length+3].color = color("#fed766")
  stars[length+4] = new Star
  stars[length+4].x = leftWristX
  stars[length+4].y = leftWristY
  stars[length+4].color = color("#009fb7")
  stars[length+5] = new Star
  stars[length+5].x = rightWristX
  stars[length+5].y = rightWristY
  stars[length+5].color = color("#009fb7")
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
    
let value = 0.1
    leftShoulderX = lerp(leftShoulderX, LSX, value)
    leftShoulderY = lerp(leftShoulderY, LSY, value)
    rightShoulderX = lerp(rightShoulderX,RSX, value)
    rightShoulderY = lerp(rightShoulderY, RSY, value)
    leftElbowX = lerp(leftElbowX, LEX, value)
    leftElbowY = lerp(leftElbowY, LEY, value)
    rightElbowX = lerp(rightElbowX, REX, value)
    rightElbowY = lerp(rightElbowY, REY, value)
    leftWristX = lerp(leftWristX, LWX,value)
    leftWristY = lerp(leftWristY, LWY, value)
    rightWristX = lerp(rightWristX, RWX, value)
    rightWristY = lerp(rightWristY, RWY, value)
    leftHipX = lerp(leftHipX, LHX, value)
    leftHipY = lerp(leftHipY, LHY, value)
    rightHipX = lerp(rightHipX, RHX, value)
    rightHipY = lerp(rightHipY, RHY,value)
    leftKneeX = lerp(leftKneeX, LKX, value)
    leftKneeY = lerp(leftKneeY, LKY, value)
    rightKneeX = lerp(rightKneeX, RKX, value)
    rightKneeY = lerp(rightKneeY, RKY, value)

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
  
  if(frameCount%600==0){
    drawShootingStar=true
  }
  console.log(shootingStar.x);
  if(drawShootingStar == true){
    if(shootingStar.x < 1000){
      shootingStar.draw()
      shootingStar.shoot()
    }else{
      drawShootingStar = false
      shootingStar.x=-15
    }
  }
  drawSkeleton();
  
  drawConstellation()

  

  for (let i = 0; i < stars.length; i++) {
    let star = stars[i]
    
    star.draw()
  }

  for (let i = 0; i < stars02.length; i++) {
    let star = stars02[i]
    
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

function drawConstellation(){
  
  if(stage == 0){
    stars02[0] = new Star02
    stars02[0].x = constellations[0].LWX
    stars02[0].y = constellations[0].LWY
    stars02[1] = new Star02
    stars02[1].x = constellations[0].LEX
    stars02[1].y = constellations[0].LEY
    stars02[2] = new Star02
    stars02[2].x = constellations[0].LSX
    stars02[2].y = constellations[0].LSY
    stars02[3] = new Star02
    stars02[3].x = constellations[0].RSX
    stars02[3].y = constellations[0].RSY
    
  }
  // else if(stage == 1){
    // stars02 = []
  //   stars[length] = new Star
  //   stars[length].x = constellations[1].LWX
  //   stars[length].y = constellations[1].LWY
  //   stars[length+1] = new Star
  //   stars[length+1].x = constellations[1].LEX
  //   stars[length+1].y = constellations[1].LEY
  //   stars[length+2] = new Star
  //   stars[length+2].x = constellations[1].LSX
  //   stars[length+2].y = constellations[1].LSY
  //   stars[length+3] = new Star
  //   stars[length+3].x = constellations[1].RSX
  //   stars[length+3].y = constellations[1].RSY
  // }else{
  //   stars[length] = new Star
  //   stars[length].x = constellations[2].LWX
  //   stars[length].y = constellations[2].LWY
  //   stars[length+1] = new Star
  //   stars[length+1].x = constellations[2].LEX
  //   stars[length+1].y = constellations[2].LEY
  //   stars[length+2] = new Star
  //   stars[length+2].x = constellations[2].LSX
  //   stars[length+2].y = constellations[2].LSY
  //   stars[length+3] = new Star
  //   stars[length+3].x = constellations[2].RSX
  //   stars[length+3].y = constellations[2].RSY
  //   stars[length+4] = new Star
  //   stars[length+4].x = constellations[2].REX
  //   stars[length+4].y = constellations[2].REY
  //   stars[length+5] = new Star
  //   stars[length+5].x = constellations[2].RWX
  //   stars[length+5].y = constellations[2].RWY
  // }
}