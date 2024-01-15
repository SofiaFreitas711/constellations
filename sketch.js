let w = window.innerWidth
let h = window.innerHeight
let video
let poseNet
let pose
let skeleton

class Star{
  constructor(){
    this.opacity = 255
    this.color = color(255,255,255,this.opacity)
    this.posX = random(0,w)
    this.posY = random(0,h)
    this.scale = random(0.5,1)
  }

  draw(){
       
    push()
    fill(this.color)
    drawingContext.shadowBlur = 30
    drawingContext.shadowColor = color("white")
    beginShape()
    vertex(this.posX + 10 ,this.posY + 2)
    vertex(this.posX + 14,this.posY + 8)
    vertex(this.posX + 20,this.posY + 8)
    vertex(this.posX + 16,this.posY + 14)
    vertex(this.posX + 20,this.posY + 20)
    vertex(this.posX + 10,this.posY + 16)
    vertex(this.posX + 0,this.posY + 20)
    vertex(this.posX + 4,this.posY + 14)
    vertex(this.posX + 0,this.posY + 8)
    vertex(this.posX + 6,this.posY + 8)
    vertex(this.posX + 10,this.posY + 2)
    
    endShape()
    pop()
  }
}

let stars = []

function setup() {
  createCanvas(w,h);
  video = createCapture(VIDEO)
  video.size(w,h)
  video.hide()
  poseNet = ml5.poseNet(video);
  poseNet.on('pose', gotPoses)

  for(let i=0;i<50;i++){
    stars[i] = new Star()
  }
  
}

function gotPoses(poses){

  if(poses.length > 0){
    pose = poses[0].pose
    skeleton = poses[0].skeleton
  }
}

function draw() {
  
  //flip camera
  // translate(w,0)
  // scale(-1,1)
  image(video,0,0)
  background(2,1,10,220)

  for(let i=0; i<stars.length; i++){
    let star = stars[i]
    
    star.draw()
  }
  

  if(pose){
    for(let i = 0; i < pose.keypoints.length; i++){
      let x=pose.keypoints[i].position.x
      let y=pose.keypoints[i].position.y
      noStroke()
      fill(255,255,0)
      ellipse(x,y,16) //trocar isto pela class star
    }

    for(let i = 0; i < skeleton.length; i++){
      let a = skeleton[i][0]
      let b = skeleton[i][1]
      stroke(255,255,255)
      line(a.position.x, a.position.y, b.position.x,b.position.y)
    }

  }


}
