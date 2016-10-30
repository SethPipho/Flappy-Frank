
var GRAVITY = 1;
var JUMP_SPEED = 15;
var SPEED = 3
var SPACING = 250

var franko = new frank(GRAVITY)
var  obstacles = [];

var alive = true

_state = {}
_state.id = "Game"
_state.start = function()
{
    console.log( "start" )
    drawRect( ctx, 0, 0, canvas.width, canvas.height, 0, 0, null, "rgba(230,230,230,1)" )

    obstacles.push(new obstacle(randRange(200,250), randRange(200,400), 100))

   
}
_state.logic = function()
{

  
  

  if (alive) {

    if (Mouse.state[0] == "pressed" || Key.state[Key.space] == "pressed")
  {
    franko.vy = -1 * JUMP_SPEED;
    franko.fall = true
  
  }

    franko.update()

   

    
      for (var i = 0; i <obstacles.length; i++)
    {
      obstacles[i].x -= SPEED
      if (frankObstacleCollision(franko, obstacles[i]))
      {
        alive = false;
      }
    }
    


  }
  

  if(obstacles[obstacles.length - 1].x < canvas.width - SPACING)
  {
     obstacles.push(new obstacle(randRange(200,250), randRange(200,400), 100))
  }

  if (obstacles[0].x < -1 * obstacles[0].width)
  {
    obstacles.shift()
  }
}
_state.render = function()
{
    ctx.globalCompositeOperation = "source-over"
    ctx.clearRect( 0, 0, canvas.width, canvas.height );
   

    ctx.fillStyle = "#bae1ff";
    ctx.fillRect(0,0, canvas.width, canvas.height);
   //draws background

  

    for (var i = 0; i <obstacles.length; i++)
  {
    obstacles[i].draw();
  }

 franko.draw()
   
}
