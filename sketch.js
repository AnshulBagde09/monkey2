var gameState=1;
var play=1;
var end=0;
var monkey , monkey_running
var banana ,bananaImg, obstacle, obstacleImg
var FoodGroup, obstacleGroup
var Survivaltime,score
var back,backImg

function preload(){
  
  backImg=loadImage("jungle.jpg")
  
  monkey_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
 
}



function setup() {
  createCanvas(600,360);
 
  back=createSprite(300,180);
  back.addImage("backImg",backImg)
  
  monkey=createSprite(80,325,20,20);
  monkey.addAnimation("move",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,1200,10);
  ground.velocityX=-4;
  ground.visible=false;
  //ground.x=ground.width/2;
  
  score=0;
  Survivaltime=0;
  
  obstacleGroup=createGroup();
  FoodGroup=createGroup();

  //monkey.setCollider("rectangle",monkey.widht/2,monkey.height);
  monkey.debug = true
  
}


function draw() {
  background("white");
  
  back.depth=back.depth-1;
  back.velocityX = -2
  if(back.x>400){
    back.x=100;
  }
  
  if(gameState===play){
    
  stroke("black");
  textSize(15);
  fill("black");
  text("SCORE:-"+score,400,50);
  
  spawnBanana();
  spawnobstacle();
    
  if(keyDown("space")){
    monkey.velocityY=-12;
  }
  if(monkey.isTouching(FoodGroup)){
    score=score+1;
    FoodGroup.destroyEach();
  }
    
  if(monkey.isTouching(obstacleGroup)){
    gameState=end;
    monkey.destroy();
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
  }
  }
  if(gameState===end){
    ground.velocityX=0;
    obstacleGroup.velocityX=0;
    FoodGroup.velocityX=0;
    
  stroke("white");
  textSize(15);
  fill("white");
  text("SCORE:-"+score,250,200);
    
  }
  
  
  
  if(ground.x=0){
  ground.x=ground.width/2;
  }
  monkey.velocityY = monkey.velocityY+0.98;
  
  monkey.collide(ground);
  
drawSprites();
  
}
function spawnobstacle(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(600,350,10,40);
   obstacle.addImage(obstaceImage);
   obstacle.velocityX = -(6 + score/100);
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.30;
    obstacle.lifetime = 500;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

function spawnBanana(){
 if (frameCount % 100 === 0){
   var banana = createSprite(600,350,10,40);
   banana.y=Math.round(random(100,230))
   banana.addImage(bananaImage);
   banana.velocityX = -(6 + score/100);
   
    //assign scale and lifetime to the obstacle           
    banana.scale = 0.05;
    banana.lifetime = 500;
   
   //add each obstacle to the group
    FoodGroup.add(banana);
 }
}



