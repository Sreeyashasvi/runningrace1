var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var humans, human1, human2, human3, human4;
function preload(){ 
  track = loadImage("./images/track.jpg"); 
  human1_img = loadImage("./images/human 1.jpg");
  human2_img = loadImage("./images/human 2.jpg");
  human3_img = loadImage("./images/human 3.jpg");
  human4_img = loadImage("./images/human 4.jpg");
  ground=loadImage("./images/ground.png");
}
function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState===2){
    game.end();
  }
}
