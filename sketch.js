var monkey, monkey_running
var banana, bananaImage, monkeyGroup
var bananaGroup,stoneGroup
var survivalTime = 0;
var score = 0;
var stone, stoneImage
var ground

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  stoneImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(400, 400);
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  
  monkey.scale = 0.1;
  ground = createSprite(400, 350, 800, 10);
  ground.velocityX = -4;

  ground.x = ground.width / 2;
  stoneGroup=new Group();
  bananaGroup = new Group();
}


function draw() {
  background(220);
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time:" + survivalTime, 200, 50);
  

  if (keyDown("space")) {
    monkey.velocityY = -10;
  }
  monkey.velocityY = monkey.velocityY+ 0.8;
  
  if(stoneGroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityY=0;
    stoneGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
 
  monkey.collide(ground);
  food();
  obstacles();
  drawSprites();

}


function food() {

  if (World.frameCount % 80 === 0) {
    banana = createSprite(400, 215, 20, 20);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 300;
    bananaGroup.add(banana);

  }

}

function obstacles() {
  if (frameCount % 300 == 0) {
    stone = createSprite(400, 330, 10, 40);
    stone.addImage(stoneImage);
    stone.velocityX = -4
    stone.scale = 0.1;
    stoneGroup.add(stone);
  }
}
