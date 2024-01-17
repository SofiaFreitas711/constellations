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

function setup() {
  let canvas = createCanvas(1000,750);
  canvas.position(250,0)
  video = createCapture(VIDEO)
  video.size(1000,750)

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, {poseResolution: 17, confidenceThreshold: 0.7,maxPoseDetections:1});
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", gotPoses);
  // Hide the video element, and just show the canvas
  video.hide();
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

function modelReady() {
  select("#status").html("Model Loaded");
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  // drawKeypoints();
  drawSkeleton();
  // drawConstellation()

  fill("red")
  ellipse(leftShoulderX,leftShoulderY,15)
  ellipse(rightShoulderX, rightShoulderY,15)
  ellipse(leftElbowX, leftElbowY,15)
  ellipse(rightElbowX, rightElbowY,15)
  ellipse(leftWristX, leftWristY,15)
  ellipse(rightWristX, rightWristY,15)
  ellipse(leftHipX, leftHipY, 15)
  ellipse(rightHipX, rightHipY,15)
  ellipse(leftKneeX, leftKneeY,15)
  ellipse(rightKneeX, rightKneeY,15)

  // if(pose){
  //   console.log(skeleton)
  //   for (let i = 0; i <8; i++) {
  //     console.log(skeleton[i]);
  //     let a = skeleton[i][0]
  //     let b = skeleton[i][1]
  //     console.log(a,b);
  //     stroke(255, 255, 255)
  //     line(a.position.x, a.position.y, b.position.x, b.position.y)
  //   }
  // }

  

}

// A function to draw ellipses over the detected keypoints
// function drawKeypoints() {
//   // Loop through all the poses detected
//   for (let i = 0; i < poses.length; i += 1) {
//     // For each pose detected, loop through all the keypoints
//     const pose = poses[i].pose;
//     for (let j = 0; j < pose.keypoints.length; j += 1) {
//       // A keypoint is an object describing a body part (like rightArm or leftShoulder)
//       const keypoint = pose.keypoints[j];
//       // Only draw an ellipse is the pose probability is bigger than 0.2
//       if (keypoint.score > 0.2) {
//         fill(255, 0, 0);
//         noStroke();
//         ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
//       }
//     }
//   }
// }

// A function to draw the skeletons
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
  line(leftHipX, leftHipY, leftKneeX, leftHipY)
  line(rightHipX, rightHipY, rightKneeX, rightKneeY)
  
}
// let constellations = [{},{},{}]

// function drawConstellation(){

// }