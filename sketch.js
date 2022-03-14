var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bg,bgImg;
var player, shooterImg, shooter_shooting, shooter_dead;
var witchGroup, zombieGroup, ghostGroup, bullets;
var zombieImg, witchImg, ghostImg, bulletImg;
var score = 0;
//var life = 3;
var angle = 0;

function preload(){
  shooterImg = loadImage("shooter_2.png");
  shooter_shooting = loadImage("shooter_3.png");
  shooter_dead = loadImage ("shooter_1.png");
  bgImg = loadImage("bg.jpeg");
  witchImg = loadImage("witch.png");
  zombieImg = loadImage("zombie.png");
  ghostImg = loadImage("ghost2.png");
  bulletImg = loadImage("bullet.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
 
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
  bg.addImage(bgImg);
  bg.scale = 1.1;

  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage(shooterImg);
  player.scale = 0.3;
 
  //player.debug = true;
  player.setCollider("rectangle",0,0,300,400);

  witchGroup = new Group();
  zombieGroup = new Group();
  ghostGroup = new Group();
  bullets = new Group();
}

function draw() {
  background(0); 

   if (gameState === PLAY) {

    if(keyDown("UP_ARROW")||touches.length>0){
      player.y = player.y-10
    }
    if(keyDown("DOWN_ARROW")||touches.length>0){
     player.y = player.y+10
    }
    if(keyDown("RIGHT_ARROW")||touches.length>0){
      player.x = player.x+7
     }
    if(keyDown("LEFT_ARROW")||touches.length>0){
      player.x = player.x-9
     }

    if(keyWentDown("space")){ 
      player.addImage(shooter_shooting);
      var bullet = createSprite (player.x, player.y, 5,5);
      bullet.velocityX = 7;
      bullet.addImage(bulletImg);
      bullets.add(bullet);
      bullet.scale = 0.02;
    }
    else if(keyWentUp("space")){
     player.addImage(shooterImg);
    }


    if(zombieGroup.isTouching(bullets)){
      score = score+3;
    
     for(var i=0;i<zombieGroup.length;i++){      
      if(zombieGroup[i].isTouching(bullets)){
           zombieGroup[i].destroy();
           bullets.destroyEach();
           } 
     }
    }

    if(ghostGroup.isTouching(bullets)){
      score = score+1;
      
     for(var i=0;i<ghostGroup.length;i++){      
      if(ghostGroup[i].isTouching(bullets)){
           ghostGroup[i].destroy();
           bullets.destroyEach();
           } 
     }
    }

    if(witchGroup.isTouching(bullets)){
      score = score+2;
    
     for(var i=0;i<witchGroup.length;i++){      
      if(witchGroup[i].isTouching(bullets)){
           witchGroup[i].destroy();
           bullets.destroyEach();
           } 
     }
    }
    
    var select_monster = Math.round(random(1,3));
      
      if (World.frameCount % 100 == 0) {
        switch(select_monster){
          case 1: createWitch();
          break;
          case 2:createZombie();
          break;
          case 3:createGhost();
          break;
          default:break;
        }
      }  
    
      if (player.isTouching(witchGroup)) {
        gameState = END;
      }
      if (player.isTouching(zombieGroup)) {
        gameState = END;
      }
      if (player.isTouching(ghostGroup)) {
        gameState = END;
      }
   }
    
  

   if (gameState === END) {
     player.addImage(shooter_dead);
     player.rotation = -60-angle;
     ghostGroup.destroyEach();
     witchGroup.destroyEach();
     zombieGroup.destroyEach();
     textSize(45);
     fill("white");
     text("You Died!",200,200);
   }


  drawSprites();
  textSize(25);
  fill("white");
  text("Score: " + score, 40,50);
  //text("Life:" + life, 40,90);
}


function createWitch() {
  var  witch = createSprite(1000,Math.round(random(450, 670)), 30, 30);
  witch.addImage(witchImg);
  witch.velocityX = -3;
  //witch.lifetime = 150;
  witch.scale = 0.4;
  witchGroup.add(witch);
}

function createZombie() {
  var  zombie = createSprite(1000,Math.round(random(450, 670)), 30, 30);
  zombie.addImage(zombieImg);
  zombie.velocityX = -3;
  //zombie.lifetime = 150;
  zombie.scale = 0.15;
  zombieGroup.add(zombie);
}

function createGhost() {
  var  ghost = createSprite(1000,Math.round(random(450, 670)), 30, 30);
  ghost.addImage(ghostImg);
  ghost.velocityX = -3;
  //ghost.lifetime = 150;
  ghost.scale = 0.3;
  ghostGroup.add(ghost);
}