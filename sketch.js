var road1,road2,roadimage,npcimage,randspawn,npcimage2,randomspawn2,player,playerstanding,playerwalk,gun,gunimg,pointer,pointerimg,bullet,bullimg;
var angle;persongroup,person2group,bulletgroup,carimg,car,cargroup,policeimg,heli;
var pointergamestate="none"
var flag=0;
var pllives=3
var heart1,heart2,heart3,heartimg;
var hearts=[];
var gamestate="Noneed"
var firepolice=0;
var policegroup
var fullgamestate=2
function preload(){
  roadimage=loadImage("Capture.PNG")
  npcimage=loadAnimation("5-removebg-preview.png","4-removebg-preview.png","3-removebg-preview.png","2-removebg-preview.png","1-removebg-preview.png")
npcimage2=loadAnimation("1rb.png","2rb.png","3rb.png","4rb.png","5rb.png","6-removebg-preview.png","7-removebg-preview.png","8-removebg-preview.png")
playerstanding=loadImage("stand-removebg-preview.png")
playerwalk=loadAnimation("person (3).png","person (2).png","person (1).png","person (7).png","person (6).png","person (5).png","person (4).png");
gunimg=loadImage("gun-removebg-preview.png");
bullimg=loadImage("images-removebg-preview.png");
pointerimg=loadImage("18554-removebg-preview.png");
carimg=loadImage("car1.png");
heartimg=loadImage("9.jpg");
policeimg=loadImage("police.png");
heliimg=loadImage("police helicopter.png");
}




function setup() {

  createCanvas(innerWidth-50,innerHeight-50);
  road1=createSprite(innerWidth/2-10,45,width,40);
  road1.addImage(roadimage); 
  road2=createSprite(innerWidth/2-10,560,width,40);
  road2.addImage(roadimage); 
  player=createSprite(200,200,20,20)
  player.addAnimation("standinganimation",playerstanding);
  player.addAnimation("playerani",playerwalk);
  gun=createSprite(player.x+10,player.y,10,10);
  gun.addImage(gunimg);
  gun.scale=0.2
  gun.visible=false;
  gun.scale=0.2
  
  player.scale=0.5;
  pointer=createSprite(20,20,10,10);
  pointer.addImage(pointerimg);
     pointer.scale=0.1
  pointer.visible=false;
  persongroup=new Group ();
  person2group=new Group ();
  bulletgroup=new Group ();
  cargroup=new Group ();
  heart1=createSprite(innerWidth-100,innerHeight-70,20,20);
  heart1.addImage(heartimg);
  heart1.scale=0.08
  heart2=createSprite(innerWidth-150,innerHeight-70,20,20);
  heart2.addImage(heartimg);
  heart2.scale=0.08
  heart3=createSprite(innerWidth-200,innerHeight-70,20,20);
  heart3.addImage(heartimg);
  heart3.scale=0.08
  hearts=[heart1,heart2,heart3];

  policegroup=new Group();
 // player.debug=true;
 
 

 
}

function draw() {
  background(255,255,255);
 
  spawnPeople();  
  
  drawSprites();
  randspawn=Math.round(random(70,200))
  randomspawn2=Math.round(random(100,250))
  pointer.x=mouseX;
  pointer.y=mouseY

  //key 1
  if (keyDown(49)){
      gun.visible=true;
      pointer.visible=true;
      flag=1;
    if(bullet){
    bullet.visible=true;
    }
    else{
     // bullet.visible=false
    }
    console.log("true");
    //pointergamestate="on"
    
  }
  //2
  if (keyDown(50)){
    gun.visible=false;
    flag=2;
    if(bullet){
    bullet.visible=false;
    }
    console.log("true");
    pointer.visible=false;
    // pointergamestate="off"
    
  }
  gun.x=player.x+13;
  gun.y=player.y
 // player.debug=true;
if(keyDown("right")){

 player.changeAnimation("playerani",playerwalk);
  player.x=player.x+10
  player.y=player.y+0
}
else if(keyDown("left")){
  player.changeAnimation("playerani",playerwalk);
   player.x=player.x-5
   player.y=player.y+0
 }
 else if(keyDown("up")){
  player.changeAnimation("playerani",playerwalk);
   player.y=player.y-5
   player.x=player.x+0
 }
 else if(keyDown("down")){
  player.changeAnimation("playerani",playerwalk);
   player.y=player.y+5
   player.x=player.x+0
 }
 else{
  player.changeAnimation("standinganimation",playerstanding);
 }

//Bullet and its rotation
 if (keyWentUp("space")&&flag===1){
  generatebullet();
  bullet.x=gun.x+5
  bullet.y=gun.y;
  angle=(180/Math.PI)*Math.atan2(mouseY-bullet.y, mouseX-bullet.x);
  bullet.setSpeedAndDirection(10, angle);
  bullet.rotation=angle;
  

}

// Destroying the bottom pedestrians
for(var x=0;x<person2group.length;x++)
{

  if (bulletgroup.isTouching(person2group[x]))
  {
    gamestate="CALL"
    for(var i=0;i<bulletgroup.length;i++)
    {
      if(bulletgroup[i].isTouching(person2group[x]))
      {
        person2group[x].destroy();
        bulletgroup[i].destroy();
        break;   
      }
      
     }
  }
}

//Destroying the top pedestrians
for(var x=0;x<persongroup.length;x++)
{

  if (bulletgroup.isTouching(persongroup[x]))
  {
    gamestate="CALL"
    for(var i=0;i<bulletgroup.length;i++)
    {
      if(bulletgroup[i].isTouching(persongroup[x]))
      {
        persongroup[x].destroy();
        bulletgroup[i].destroy();
        break;   
      }
      
     }
  }
}


if(gamestate==="CALL"){
  spawnpolice();
  gamestate="Noneed"
}








spawncar();

//Lives 
for(var x=0;x<cargroup.length;x++)
{
    if(player.isTouching(cargroup[x]))
    {
          cargroup[x].destroy();
          hearts[hearts.length-1].destroy();
          hearts.pop();
        
        gamestate="CALL"
      
          if (hearts.length===0)
        {
            fullgamestate="Over"
        }
    }  
}
if (hearts.length==0){
  console.log("go")
  fullgamestate=3
}
console.log(fullgamestate)

for(var x=0;x<cargroup.length;x++)
{
    if(bulletgroup.isTouching(cargroup[x]))
    {
        for(var i=0;i<bulletgroup.length;i++)
        {
          if(bulletgroup[i].isTouching(cargroup[x]))
          {
            cargroup[x].destroy();
            bulletgroup[i].destroy();
            gamestate="CALL"
            break;            
              
          }          
        }
         
      
        
    }  
}
for(var x=0;x<policegroup.length;x++)
{
    if(bulletgroup.isTouching(policegroup[x]))
    {
        for(var i=0;i<bulletgroup.length;i++)
        {
          if(bulletgroup[i].isTouching(policegroup[x]))
          {
   //         firepolice+=1;
           
  //          if(firepolice===2)
  //          {
            
            policegroup[x].destroy();
            bulletgroup[i].destroy();
    //        }
            break;            
              
          }          
        }
         
      
        
    }  
}
for(var x=0;x<policegroup.length;x++)
{
    if(player.isTouching(policegroup[x]))
    {
          policegroup[x].destroy();
          hearts[hearts.length-1].destroy();
          hearts.pop();
        
       // gamestate="CALL"
      
          if (hearts.length===0)
        {
            fullgamestate=3
        }
    }  
}
rand=Math.round(1,3)
if(gamestate==="CALL"&& rand===1){
spawnheli();
}

 
  
//text(mouseX+" "+mouseY,mouseX,mouseY)
}

function spawnPeople()
{
  if(World.frameCount%randspawn===0)
 {
  
   var person2=createSprite(width-50,545,10,10)
   person2.velocityX=-3
   person2.addAnimation("npcanimate",npcimage);
   person2.scale=0.5;
   person2group.add(person2);
 }
 if(World.frameCount%randomspawn2===0)
 {
 var person=createSprite(50,50,10,10);
 person.velocityX=3;
 person.addAnimation("npcbusiness",npcimage2)
 person.scale=0.35
 persongroup.add(person);
 }

}
function generatebullet(){
  
  bullet=createSprite(200,200,20,20);
  bullet.addImage(bullimg);
  bullet.scale=0.2;
  bulletgroup.add(bullet);
 // bullet.debug=true;
  bullet.setCollider("rectangle",0,0,37,20)
}
function spawncar(){
  if (frameCount%Math.round(random(100,350))===0){
  car=createSprite(0,Math.round(random(60,500),20,20));
  car.addImage(carimg);
  car.velocityX=7;
  car.scale=0.8
  cargroup.add(car);
  //car.debug=true
  car.setCollider("rectangle",0,0,130,80);
  }
}
function spawnpolice() {
  var ypol=Math.round(random(100,300));
  police1 = createSprite(0,ypol,20,20);
  police1.addImage(policeimg)
  police1.velocityX=Math.round(12);
  police1.scale=0.2
  policegroup.add(police1)
  police1.lifetime=innerWidth/12;
  
  police2 = createSprite(0,ypol+50,20,20);
  police2.addImage(policeimg)
  police2.velocityX=Math.round(10);
  police2.scale=0.2
  policegroup.add(police2)
  police2.lifetime=innerWidth/10;
  police3 = createSprite(0,ypol+100,20,20);
  police3.addImage(policeimg)
  police3.velocityX=Math.round(15);
  police3.scale=0.2
  policegroup.add(police3);
  police3.lifetime=innerWidth/15;
  

  
  
}
function spawnheli(){
  heli=createSprite(0,Math.round(100,300),20,20);
  heli.addImage(heliimg);
  heli.velocityX=10
  heli.scale=0.6
  heli.lifetime=innerWidth/8
  helibullet=createSprite(heli.x,heli.y,20,20);
  helibullet.addImage(bullimg);
  helibullet.velocityY=7;  
}

