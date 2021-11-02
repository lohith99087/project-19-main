var gamestate = "play";
var road, roadImg, invisibleGround;
var background4Img;
var player,playerImg;
var fire, fire_Img ,fireGroup;
var bomb, bombImg, bombGroup;
var ghost, ghost_Img;
var coin, coin_img,coinGroup,cash,cashImg,cashGroup,diamonds,diamondsImg,diamondsGroup;
var gameover ,gameoverImg;
var b2, bg2;
var music
var treasure=0;






function preload(){
roadImg = loadImage("road.png");
playerImg = loadAnimation("mainPlayer1.png","mainPlayer2.png");
bombImg =loadImage("bomb.png");
fire_Img =loadImage("fire2.png");
coin_img =loadImage("coin.png");
cashImg =loadImage("cash.png");
diamondsImg =loadImage("diamonds.png");
ghost_img =loadImage("ghost.png");
gameoverImg =loadImage("images.png");
b2 = loadImage("road.png");


background4Img =loadImage("background4.jpg")

music = loadSound("music.mp3");





}

function setup() {
    createCanvas(windowWidth,windowHeight);
    music.loop();

    road = createSprite(500,500,500,500);
    road.addImage(background4Img);
    road.velocityX =-10

    
   

    player = createSprite(400,850);
    player.addAnimation("player",playerImg);
    player.scale =0.2

    ghost = createSprite(100,800);
    ghost.addImage(ghost_img);
    ghost.scale =0.4

    invisibleGround = createSprite(400,1000);
    invisibleGround.visible=false;

    gameover = createSprite(300,300);
    gameover.addImage(gameoverImg);
    
    player.setCollider("rectangle",0,0,player.width-350,player.height-300);


    fireGroup =new Group();
    coinGroup =new Group();
    bombGroup =new Group();
    cashGroup =new Group();
    diamondsGroup =new Group();
 

    

 
}

function draw() {
   background("white");
   
   

    if (gamestate == "play"){
   gameover.visible =false
   
   if (road.x <150){
         road.x =road.width/2
       }

      if (keyDown("space")&& player.y>=500){
          player.velocityY = -20;
      }
    
          player.velocityY = player.velocityY+0.8

       if (coinGroup.isTouching(player)){
           coinGroup.destroyEach();
           treasure=treasure+100
       }

       if (cashGroup.isTouching(player)){
           cashGroup.destroyEach();
           treasure=treasure+50
       }
       
       if (diamondsGroup.isTouching(player)){
           diamondsGroup.destroyEach();
           treasure=treasure+500

       }
       

            player.collide(invisibleGround);
            
    spawnObstacleFire();
    spawnRewards();
    spawnObstacleBomb();

    
    
        
    
    
    drawSprites();      


    

    if (fireGroup.isTouching(player)||bombGroup.isTouching(player)){
        gamestate = "end"
        player.destroy();
        
        }
      
     }  
    else if (gamestate== "end"){
        gameover.visible = true
        background("black")
        textSize(300)
        fill("red")
        stroke("gold");
        strokeWeight(10);
        text("GAME OVER",100,height/2+100)
    }
    

 
 textSize(80);
fill("black");
text("Treasure: "+ treasure ,1500,150);
}

function spawnObstacleFire() {
   if(frameCount%500 ===0){
    fire = createSprite(Math.round(random(600,800)),850);
   fire.velocityX =-10
   fire.addImage(fire_Img);
   fire.scale =0.3
   fire.lifetime = 600

   fire.depth=ghost.depth
   ghost.depth=ghost.depth+1
   fireGroup.add(fire)
   }
   
}

function spawnObstacleBomb(){

   if (frameCount%300===0){
    
   bomb = createSprite(Math.round(random(600,800)),850);
   bomb.velocityX =-10
   bomb.addImage(bombImg);
   bomb.scale =0.2
   bomb.lifetime = 600
   bomb.depth=ghost.depth
   ghost.depth=ghost.depth+1
   
   bombGroup.add(bomb);
   } 
}

function spawnRewards(){
  if (frameCount%100 ===0){
    coin = createSprite(width,Math.round(random(300,800)));
    coin.velocityX =-15
    coin.addImage(coin_img);
    coin.scale =0.9
    coin.lifetime = 600
    coinGroup.add(coin);
  }
  if (frameCount%50===0){
     cash = createSprite(width,Math.round(random(300,800)));
     cash.velocityX =-15
     cash.addImage(cashImg);
     cash.scale =0.3
     cash.lifetime = 600
     cashGroup.add(cash); 
    }

    if (frameCount%80===0){
      diamonds = createSprite(width,Math.round(random(300,800)));
      diamonds.velocityX =-15
      diamonds.addImage(diamondsImg);
      diamonds.scale =0.1
      diamonds.lifetime = 600
      diamondsGroup.add(diamonds);

    }
}