class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    human1 = createSprite(100,200);
    human1.addImage("human1",human1_img);
    human2 = createSprite(300,200);
    human2.addImage("human2",human2_img);
    human3 = createSprite(500,200);
    human3.addImage("human3",human3_img);
    human4 = createSprite(700,200);
    human4.addImage("human4",human4_img);
    humans = [human1, human2, human3, human4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
       image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        humans[index-1].x = x;
        humans[index-1].y = y;

        if (index === player.index){
          humans[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = humans[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
  if(player.distance>3900){
    gameState=2;
  }
    drawSprites();
  }
  end(){
    console.log("gameEnded");
  }
}
