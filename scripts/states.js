_state = {}
_state.id = "Game"
_state.start = function()
{
    console.log( "start" )
      drawRect( ctx, 0, 0, canvas.width, canvas.height, 0, 0, null, "rgba(230,230,230,1)" )
}
_state.logic = function()
{
    //console.log( "logic" )
}
_state.render = function()
{
    ctx.globalCompositeOperation = "source-over"
  //ctx.clearRect( 0, 0, canvas.width, canvas.height );
   //draws background

   var width =  randRange(10,40);
   var height = randRange(10,40);

    drawRect(ctx, Mouse.X - width/2, Mouse.Y - height/2  ,width, height, 5, 0, null, "rgba(30,20,30,1)")


    ctx.globalCompositeOperation = 'hard-light'
    drawRect( ctx, 0, 0, canvas.width, canvas.height, 0, 0, null, "rgba(200,200,200,.05)" )
}
