var GRAVITY = 1;
var JUMP_SPEED = 15;
var SPEED = 3
var SPACING = 250
var franko = new frank( GRAVITY )
var obstacles = [];
var alive = true

var score = 0
var highScore = 0

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
        if (franko.y > canvas.height)
        {
          franko.y =  canvas.height 
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
  if ( Key.state[ Key.space ] == "pressed" )
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


 
  drawScore()

  //title text
  ctx.fillStyle = " rgba(20,20,20, 1)"
  
   ctx.font = "50px 'Gloria Hallelujah' "
   ctx.fillText("Flappy Frank",100,200)
  
   ctx.font = "20px 'Gloria Hallelujah' "
   ctx.fillText("-Press Space to Play-",145,240)
   


}


gameover_state = {}
gameover_state.id = "game over"
//////
gameover_state.start = function()
{
    deathEffectOpacity = 1;
    franko.vy = 5

    if (score > highScore)
    {
      highScore = score
    }
}
///
gameover_state.logic = function()
{
   deathEffectOpacity -= .05
    franko.update()

    

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

 
  drawScore()

  ctx.fillStyle = ("rgba(250,250,250," + deathEffectOpacity.toString() + ")")
  ctx.fillRect( 0, 0, canvas.width, canvas.height );


   franko.draw()

   ctx.font = "50px 'Gloria Hallelujah' "

   ctx.fillStyle = " rgba(20,20,20, 1)"
   ctx.fillText("Game Over",140,290)
  
   ctx.font = "15px 'Gloria Hallelujah' "
   ctx.fillText("-Press Enter to Play Again-",170,320)
  
}


function drawScore()
{
    ctx.font = "20px 'Gloria Hallelujah' "
    ctx.fillStyle = " rgba(20,20,20, 1)"
  

    ctx.fillText("Score: " + score, 20, 40 )

     ctx.fillText("High Score: " + highScore, 300, 40 )
  
}