song1 = "";
song2 = "";
var play = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is initiated");
}

function play(){
    song1.play();
    song1.rate(1);
    song1.setVolume(1);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + ", leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + ", rightWristY  = " + rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 500, 500);
    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2){

        circle(leftWristX, leftWristY, 20);
        song2.stop();

         if(song1.isPlaying() = false){
            song1.play();
            document.getElementById("song").innerHTML = "Song 1 is being played!";
         }
    }

    if(scoreRightWrist > 0.2){

        circle(rightWristX, rightWristY, 20);
        song1.stop();

         if(song2.isPlaying() = false){
            song2.play();
            document.getElementById("song").innerHTML = "Song 2 is being played!";
         }
    }

    if(scoreLeftWrist > 0.2){

        circle(leftWristX, leftWristY, 20);
        song2.stop();

         if(song1.isPlaying() = false){
            song1.play();
            document.getElementById("song").innerHTML = "Song 1 is being played!";
         }
    }
}