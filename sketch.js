var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running, trex_collided;
var trex2, trex_running2, trex_collided2;

var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score = 0;
var gameover, gameoverimg, restart, restartimg;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  trex_running2 = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided2 = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collided", trex_collided)
  trex.scale = 0.5;
  trex.debug = false;

  trex2 = createSprite(50,180,20,50);
  trex2.addAnimation("running2", trex_running2);
  trex2.addAnimation("trex_collided2", trex_collided2)
  trex2.scale = 0.5;
  trex2.debug = true;
  

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameover = createSprite(300,50);
  gameover.addImage("Gameover", gameoverimg);
  gameover.visible = false;
  gameover.scale = 0.5;
  restart = createSprite(300,100);
  restart.addImage("Restart", restartimg);
  restart.visible = false;
  restart.scale = 0.5;
}

function draw() {
  background(180);
  
  
  text("Score: "+ score, 500,50);
  if(gameState === PLAY){
     if(keyDown("space") && trex.collide(invisibleGround)) {
    trex.velocityY = -12;
  }


  score = score + Math.round(getFrameRate()/60);

  trex.velocityY = trex.velocityY + 0.7;
  trex2.velocityY = trex2.velocityY + 0.7;

  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  
  spawnClouds();
  spawnObstacles();
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
    }

    if(obstaclesGroup.isTouching(trex2)){
      trex2.velocityY = trex2.velocityY - 2;
    }


  }
  else if(gameState === END){
    score = 0;
    gameover.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    trex2.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trex_collided", trex_collided);
    trex2.changeAnimation("trex_collided2", trex_collided2);

    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);    
  }
    if(mousePressedOver(restart)) {
    reset();
  }
  trex.collide(invisibleGround);
  trex2.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    cloud.depth = trex2.depth;
    trex2.depth = trex2.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  trex2.changeAnimation("running2", trex_running2);

  
  score = 0;  
  ground.velocityX = -4;
  }

