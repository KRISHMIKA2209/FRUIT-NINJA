var alien1,alien2,fruit1,fruit2,fruit3,fruit4,knife;
var alien
var background2;

var enemy 
 
var start,startimage;
var fruit;
var gameoverimage,gameover;

var restartimage,restart
var chance;

var score;

var PLAY= 1;
var END = 0;
var gameState 

var fruit1Group,fruit2Group,fruit3Group,fruit4Group;

var changemonster

function preload(){
  background1 = loadImage("bg.jpg");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  gameoverimage = loadImage("gameover.png");
  gameover1 = loadSound("gameover.mp3")
  
  restartimage = loadImage("restart.jpg")
  knife1 = loadImage("sword.png"); knifesound=loadSound("Drawing-A-Sword-www.fesliyanstudios.com.mp3");
   
  alien= loadAnimation("alien1.png","alien2.png")
  alien1 = loadImage("alien1.png");
  alien2 = loadImage("alien2.png");
  
  startimage = loadImage("start.webp")
}




/////////////////end of preload
function setup(){
  
   createCanvas(550, 400);
  
  
  background2 = createSprite(320,200,100,200);
  background2.addImage(background1);
  background2.scale = 0.1
  
   fruitGroup = new Group();
   enemyGroup = new Group();
  
  knife = createSprite(300,100,20,20);
  knife.addImage(knife1);
  knife.scale = 0.8;
  knife.setCollider("circle",0,0,20);

  
  gameover = createSprite(300,200,40,40);
  gameover.addImage(gameoverimage)
  gameover.visible = false;
  
  restart = createSprite(300,300,40,40);
  restart.addImage(restartimage)
  restart.scale = 0.05;
  restart.visible = false;
   
  start = createSprite(300,300,40,40);
  start.addImage(startimage)
  score =0;
  chance =5
  start.scale = 0.2

  
}

///////////////////// end of setup

function draw(){

  background("white")
  
  background2.addImage(background1);
  background2.scale = 0.5
  
  if(gameState === PLAY)
  {
    
    knife.y=World.mouseY;
    knife.x=World.mouseX;  
    
    restart.visible = false;
    gameover.visible = false;
    start.visible = false;
    
    fruits();
    enemy ();
    
     if(fruitGroup.isTouching(knife))
     {
    
   fruitGroup.destroyEach();
    score = score +1  
    knifesound.play();
    
    
    
    }
  
    if(enemyGroup.isTouching(knife)) 
  {
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    chance = chance - 1
 
  }
  
     if(chance === 0)
  {
    
    
    gameover1.play();
    gameState = END;
    
  }
 
    
  }
    
  if (gameState === END)
 {
   
    
    knife.x = 300;
    knife.y = 100;
    
     
   
    gameover.visible = true;
    restart.visible = true;
   start.visible = false;
 }
   
   if(mousePressedOver(restart))
   {
     
     gameState = PLAY
     score = 0
     chance = 5
     
     
     
   }
  
  
  drawSprites();
  
  fill("yellow");
  textSize(20);
  text("score:"+ score,100,20);
  
  fill ("yellow");
  textSize(20);
  text("chance:"+  chance,250,20)
  
  
  
}





function fruits()
{
  if(frameCount%100 === 0){
    
  fruit = createSprite(500,200,20,20);
 
    sf = Math.round(random(1,4))
    
    if(sf ===1)
    {
      fruit.addImage(fruit1)
      
    }
    else if(sf ===2 )
    {
      fruit.addImage(fruit2)
      
    }
    else if(sf ===3)
    {
      
      fruit.addImage(fruit3)
    
    }
    else
    {
      fruit.addImage(fruit4)
      
    }
    
    
    fruit.scale = 0.2;
    
    fruit.y=Math.round(random(50,350));
    
    fruit.velocityX =-8;
     
    fruit.lifetime = 110;
  
    fruitGroup.add(fruit)
    
    
    //To make fruit appear from both sides
  changefruit=Math.round(random(1,2))
  if(changefruit===1)
    {
      fruit.velocityX=-(8+score/4);
      fruit.x=500;
    }
    else if(changefruit===2)
    {
      fruit.velocityX=(8+score/4);
      fruit.x=0;
    }
  }
  
    
}

function enemy(){
  
  if (frameCount % 100 === 0){
    var enemy = createSprite(600,random(1,350),100,40);
    var side = Math.round(random(1,2));
    if (side===1){
    enemy.x=0;
    enemy.velocityX=(12+score/10);
    }
    else {
    enemy.x=600;
    enemy.velocityX=-(7+score/10);
    }
    
    var rand = Math.round(random(1,2));
    
    switch(rand) {
      case 1: enemy.addImage(alien1);
      break;
      case 2: enemy.addImage(alien2);
      break;       
      default: break;
    }
    
    enemyGroup.add(enemy);
  }
}

