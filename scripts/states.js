
var GRAVITY = 1.5;
var JUMP_SPEED = 15;

_state = {}
_state.id = "Game"
_state.start = function()
{
    console.log( "start" )
    drawRect( ctx, 0, 0, canvas.width, canvas.height, 0, 0, null, "rgba(230,230,230,1)" )

    franko = new frank(GRAVITY)
}
_state.logic = function()
{

  if (Mouse.state[0] == "pressed" || Key.state[Key.space] == "pressed")
  {
    franko.vy = -1 * JUMP_SPEED;
    franko.fall = true
  }

   franko.update()
}
_state.render = function()
{
    ctx.globalCompositeOperation = "source-over"
    ctx.clearRect( 0, 0, canvas.width, canvas.height );

    ctx.fillStyle = "rgb(240,240,240)";
    ctx.fillRect(0,0, canvas.width, canvas.height);
   //draws background

   franko.draw()

   
}
