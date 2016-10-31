var GRAVITY = 1;
var JUMP_SPEED = 15;
var SPEED = 3
var SPACING = 250
var franko = new frank( GRAVITY )
var obstacles = [];
var alive = true

game_state = {}
game_state.id = "game"
game_state.start = function()
{
    console.log( "start" )
    drawRect( ctx, 0, 0, canvas.width, canvas.height, 0, 0, null, "rgba(230,230,230,1)" )
    obstacles.push( new obstacle( randRange( 200, 250 ), randRange( 200, 400 ), 100 ) )
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

    //draw ground
    ctx.fillStyle = "#ffdfba"
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50)
}



start_state = {}
start_state.id = "start"
////////
start_state.start = function()
{

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

  //draw ground
  ctx.fillStyle = "#ffdfba"
  ctx.fillRect(0, canvas.height - 50, canvas.width, 50)
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

  //draw ground
  ctx.fillStyle = "#ffdfba"
  ctx.fillRect(0, canvas.height - 50, canvas.width, 50)

  ctx.fillStyle = ("rgba(250,250,250," + deathEffectOpacity.toString() + ")")
  ctx.fillRect( 0, 0, canvas.width, canvas.height );


  franko.draw()
}
