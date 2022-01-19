const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

let canH;
let canW;

var ground;
var rope, rope2, rope3;
var fruit;
var fruit_con, fruit_con2, fruit_con3;
let bunny, blink, eat, sad;

let bk_sound, cut_sound, sad_sound, eating_sound, air_sound;
let blower, mute_bttn;

var bg_img, food_img, rabbit_img, button, bttn2, bttn3;

function preload()
{

  bg_img = loadImage("./assets/background.png");
  food_img = loadImage("./assets/melon.png");
  rabbit_img = loadImage("./assets/Rabbit-01.png");
  blink = loadAnimation("./assets/blink_1.png","./assets/blink_2.png", "./assets/blink_3.png");
  eat = loadAnimation("./assets/eat_0.png","./assets/eat_1.png", "./assets/eat_2.png", "./assets/eat_3.png", "./assets/eat_4.png");
  sad = loadAnimation("./assets/sad_1.png","./assets/sad_2.png", "./assets/sad_3.png");

  bk_sound =loadSound("./assets/Sounds/ants_background.wav");
  sad_sound =loadSound("./assets/Sounds/sad.wav");
  cut_sound =loadSound("./assets/Sounds/rope_cut.mp3");
  eating_sound =loadSound("./assets/Sounds/eating_sound.mp3");
  air_sound = loadSound("./assets/Sounds/air.wav");


  blink.playing = true;
  eat.playing = true;
  sad.playing = true;


  sad.looping = false;
  eat.looping = false;


}

function setup() 
{

  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); 
  if(isMobile)
  { canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth+80, displayHeight); 
  } 
  else 
  { 
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight); 
  }

  createCanvas(500,700); 
  frameRate(80); 

  bk_sound.play();
  bk_sound.setVolume(0.25);

  engine = Engine.create(); 
  world = engine.world; 

  

  button = createImg('./assets/cut_button.png');
  button.position(200,30); 
  button.size(50,50); 
  button.mouseClicked(drop); 

  bttn2 = createImg('./assets/cut_button.png');
  bttn2.position(80,150); 
  bttn2.size(60,60); 
  bttn2.mouseClicked(drop2); 

  bttn3 = createImg('./assets/cut_button.png');
  bttn3.position(360,200); 
  bttn3.size(60,60); 
  bttn3.mouseClicked(drop3); 

  mute_bttn = createImg('./assets/unmute.png');
  mute_bttn.position(450,20); 
  mute_bttn.size(50,50); 
  mute_bttn.mouseClicked(muteSound); 


  brower = createImg('./assets/balloon.png');
  brower.position(10,250); 
  brower.size(150,100); 
  brower.mouseClicked(airBlow); 


  rope = new Rope(7,{x:220,y:30}); 
  rope2 = new Rope(8,{x:75,y:145}); 
  rope3 = new Rope(4,{x:400,y:225}); 

  ground = new Ground(200,690,600,20);


  bunny = createSprite(420,520,100,100); 
  bunny.addImage(rabbit_img); 

  bunny.scale = 0.2;

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny.addAnimation("blinking", blink);
  bunny.addAnimation("eating", eat);
  bunny.addAnimation("sad", sad);

  bunny.changeAnimation("blinking");

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);


  rectMode(CENTER); 
  ellipseMode(RADIUS); 
  textSize(50); 
  imageMode(CENTER);
}

function draw() 
{


  background(51); 
  image(bg_img,0,0,displayWidth + 80,displayHeight);







  if(fruit!=null)
  { 
    image(food_img,fruit.position.x,fruit.position.y,70,70); 
  }

  rope2.show();
  rope.show(); 
  rope3.show();
  Engine.update(engine); 
  ground.show();
  
  
  if(collide(fruit, bunny) == true)
  {
    eating_sound.play();
    bunny.changeAnimation("eating");
  }

  
  if(fruit != null && fruit.position.y >= 600)
  {
    bunny.changeAnimation("sad");
    brower.remove();
    sad_sound.play();
    bk_sound.stop();
    fruit = null;
  }

  drawSprites();
  
}

function drop()
{

  cut_sound.play();
  rope.break();


  fruit_con.detach();
  fruit_con = null;

}

function drop2()
{

  cut_sound.play();
  rope2.break();


  fruit_con2.detach();
  fruit_con2 = null;

}

function drop3()
{

  cut_sound.play();
  rope3.break();


  fruit_con3.detach();
  fruit_con3 = null;

}

function collide(body,sprite) 
{ if(body!=null) 
  { var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
     
    if(d<=40) 
    { World.remove(engine.world,fruit); 
      fruit = null; 
      return true; }
       else
       { 
         return false; 
        } 
      } 
}


function airBlow()
{
  Matter.Body.applyForce(fruit,{x: 0, y: 0},{x:0.01, y:0});
  air_sound.play();
}

function muteSound()
{
  if(bk_sound.isPlaying())
  {
    bk_sound.stop();
    mute_bttn = createImg('./assets/mute.png');
  }
  else
  {
    bk_sound.play();
    mute_bttn = createImg('./assets/unmute.png');
    mute_bttn.position(450,20); 
    mute_bttn.size(50,50);
  }
}
