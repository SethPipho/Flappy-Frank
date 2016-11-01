var GRAVITY = 1;
var JUMP_SPEED = 15;
var SPEED = 3
var SPACING = 250
var franko = new frank( GRAVITY )
var obstacles = [];
var alive = true

var score = 0

game_state = {}
game_state.id = "game"
game_state.start = function()
{
  
   
   
}
game_state.logic = function()
{

        if ( Mouse.state[ 0 ] == "pressed" || Key.state[ Key.space ] == "pressed" )
        {
            franko.vy = -1 * JUMP_SPEED;
            franko.fall = true
        }
        franko.update()
        for ( var i = 0; i < obstacles.length; i++ )
        {
            obstacles[ i ].x -= SPEED

            if (obstacles[i].x + obstacles[i].width < canvas.width/2 && obstacles[i].scored == false)
            {
              score++
              obstacles[i].scored = true
            }
            if ( frankObstacleCollision( franko, obstacles[ i ] ) )
            {
                Loop.change_state(gameover_state)
            }
        }
        //collides with ground
        if (franko.y > canvas.height - 80)
        {
          franko.y =  canvas.height - 80
          Loop.change_state(gameover_state)
        }

    if ( obstacles[ obstacles.length - 1 ].x < canvas.width - SPACING )
    {
        obstacles.push( new obstacle( randRange( 200, 250 ), randRange( 200, 400 ), 100 ) )
    }
    if ( obstacles[ 0 ].x < -1 * obstacles[ 0 ].width )
    {
        obstacles.shift()
    }


}
game_state.render = function()
{
    ctx.globalCompositeOperation = "source-over"
    ctx.clearRect( 0, 0, canvas.width, canvas.height );
    ctx.fillStyle = "#bae1ff";
    ctx.fillRect( 0, 0, canvas.width, canvas.height );
    //draws background
    for ( var i = 0; i < obstacles.length; i++ )
    {
        obstacles[ i ].draw();
    }
    franko.draw()

  
    drawGround()
    drawScore()


    
}



start_state = {}
start_state.id = "start"
////////
start_state.start = function()
{
    franko.y = canvas.height/2
    franko.fall = false
    obstacles = []
    obstacles.push( new obstacle( randRange( 200, 250 ), randRange( 200, 400 ), 100 ) )

    score = 0
}
//////
start_state.logic = function()
{
  if ( Mouse.state[ 0 ] == "pressed" || Key.state[ Key.space ] == "pressed" )
  {
    Loop.change_state(game_state)

    franko.vy = -1 * JUMP_SPEED;
    franko.fall = true
  }
}
///////
start_state.render = function()
{
  ctx.globalCompositeOperation = "source-over"
  ctx.clearRect( 0, 0, canvas.width, canvas.height );
  ctx.fillStyle = "#bae1ff";
  ctx.fillRect( 0, 0, canvas.width, canvas.height );

  franko.draw()


  drawGround()
  drawScore()

  //title text
   ctx.font = "30px 'Press Start 2P' "
   ctx.fillStyle = " rgba(250,250,250, 1)"
   ctx.lineWidth = 2


   ctx.fillText("Flappy Frank",80,200)
   ctx.strokeText("Flappy Frank",80,200)

    ctx.lineWidth = 1

   ctx.font = "20px 'Press Start 2P' "
   ctx.fillText("-Press Space to Play-",50,240)
   ctx.strokeText("-Press Space to Play-",50,240)


}


gameover_state = {}
gameover_state.id = "game over"
//////
gameover_state.start = function()
{
    deathEffectOpacity = 1;
    franko.vy = 5
}
///
gameover_state.logic = function()
{
   deathEffectOpacity -= .05
    franko.update()

    if (franko.y > canvas.height - 80)
    {
      franko.y =  canvas.height - 80
      //reset velcity so it doesnt keep rotating
      franko.vy = 10
    }

     if (  Key.state[ 13 ] == "pressed" )
        {
            Loop.change_state(start_state)
        }
}
////
gameover_state.render = function()
{
  ctx.globalCompositeOperation = "source-over"
  ctx.clearRect( 0, 0, canvas.width, canvas.height );
  ctx.fillStyle = "#bae1ff";
  ctx.fillRect( 0, 0, canvas.width, canvas.height );

  for ( var i = 0; i < obstacles.length; i++ )
  {
      obstacles[ i ].draw();
  }

  drawGround()
  drawScore()

  ctx.fillStyle = ("rgba(250,250,250," + deathEffectOpacity.toString() + ")")
  ctx.fillRect( 0, 0, canvas.width, canvas.height );


  franko.draw()

   ctx.font = "30px 'Press Start 2P' "
   ctx.fillStyle = " rgba(250,250,250, 1)"
   ctx.lineWidth = 2


   ctx.fillText("Game Over",120,250)
   ctx.strokeText("Game Over",120,250)

   ctx.lineWidth = 1

   ctx.font = "15px 'Press Start 2P' "
   ctx.fillText("-Press Enter to Play Again-",45,280)
   ctx.strokeText("-Press Enter to Play Again-",45,280)
}


function drawGround()
{
    ctx.beginPath()
    ctx.fillStyle = "#ffdfba"
    ctx.lineWidth = 4
    ctx.strokeStyle = "rgba(60,60,60,1)"
    ctx.rect(-10, canvas.height - 50, canvas.width + 20, 60)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()

}

function drawScore()
{
    ctx.font = "30px 'Press Start 2P' "
    ctx.fillStyle = " rgba(250,250,250, 1)"
    ctx.lineWidth = 2

    var x = 20;
    var y = 50;

    ctx.fillText(score, x,y )
    ctx.strokeText(score, x,y)
}