//Create variables here
var dog, dogImg, happyDogImg, database, foodS, foodStock
function preload()
{
   dogImg = loadImage("images/Dog.png");
   happyDogImg = loadImage("images/happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250,250,20,20);
  dog.addImage(dogImg)
  dog.scale = 0.5
  foodStock=database.ref('Food');
  foodStock.on("value", readStock)
}


function draw() {  
  background(46,139,87);  

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  textSize(15);
  fill(255,0,0)
  text("Food: " + foodS, 210, 450)
  text("Press the up arrow to feed the dog.", 120, 50)
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  
  if(x<= 0){
    x=0;
  }else{
    x-=1
  }
  database.ref('/').update({
    Food:x
  })
}
