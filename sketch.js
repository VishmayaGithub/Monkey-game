var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage,obschange
var FoodGroup, obstacleGroup
var score = 0,PLAY = 1,END = 0,gameState = PLAY,bananaScore = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
obschange = loadAnimation("sprite_1.png")
}



function setup() {

  monkey = createSprite(80, 315, 20, 20)
  monkey.addAnimation("monkey", monkey_running)
  monkey.scale = 0.1 

  ground = createSprite(400, 350, 900, 10)

  obstacleGroup = new Group()
  foodGroup = new Group()
}


function draw() {
  background("lightgray")
  fill("black")
  monkey.collide(ground)
  text("Banana Energy = "+bananaScore,50,50)
  text("Survival Time = "+score,250,50)
  if(gameState === PLAY){
  if (keyDown("space")) {
    monkey.velocityY = -10
  }
    score = Math.round(frameCount/2)
  monkey.velocityY = monkey.velocityY + 0.4
  obstaclea()
  bananaa()

if(foodGroup.isTouching(monkey)){
  foodGroup.destroyEach()
bananaScore = bananaScore+30
}
    monkey.visible = true
  
  }
 if(obstacleGroup.isTouching(monkey)){
   obstacleGroup.setVelocityXEach(0)
   foodGroup.setVelocityXEach(0)
  
   obstacleGroup.destroyEach()
   foodGroup.destroyEach()
   
   gameState = END
 }  
  else if(gameState === END){
    textSize(25)
     text("You Lost.Click r to restart",80,200)
    monkey.visible = false
    if(keyDown("r")){
      gameState = PLAY
      
    }

  }
  drawSprites()
}

function obstaclea() {
  if (frameCount % 150 === 0) {
    var obstacle = createSprite(430, 330, 10, 10)
    obstacle.velocityX = -5 
    obstacle.addImage("obs", obstacleImage)
    obstacle.scale = 0.1
    obstacle.lifetime = 300
    obstacleGroup.add(obstacle)
    
  }

}

function bananaa() {
  var banana = createSprite(450, Math.round(random(250, 300)), 10, 10)
  if (frameCount % 100 === 0) {

    banana.velocityX = -5
    banana.addImage("ban", bananaImage)
    banana.scale = 0.1
    foodGroup.add(banana)
  }

}