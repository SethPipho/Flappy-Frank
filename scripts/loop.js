window.onload = function()
{
    canvas = document.getElementById( "canvas" );
    ctx = canvas.getContext( "2d" );
    Loop.start();
};
Loop = {}; //Holds all global game varibles/stats/methods
Loop.ticks = 60; //physics updats per sec
Loop.skip_ticks = 1000 / Loop.ticks; //millseconds between
Loop.next_tick = Date.now(); //time of next physics step
Loop.interpolation = 0; //valle for interpolating render location between physics steps
Loop.running = true; //State of game(running, stopped, or menu;
////////////////////////////////////////////////////////////////////////////////
Loop.state = {}
Loop.state.logic = function() {};
Loop.state.render = function() {};
Loop.run = function() //game loop, calls logic function and render function, evalutes inperpolation
    {
        if ( Loop.running )
        {
            while ( Date.now() > Loop.next_tick )
            {
                stats.logStart();

                Loop.next_tick = Loop.next_tick + Loop.skip_ticks;

                Loop.logic();
                timeManager.tick()
                CheckInput()

                stats.logEnd();
            };
            stats.rndStart();
            Loop.render();
            Loop.interpolation = ( Date.now() + Loop.skip_ticks - Loop.next_tick ) / Loop.skip_ticks;
            stats.rndEnd();
            stats.update()
            stats.calcFps()
            window.requestAnimationFrame( Loop.run );
        }
    };
Loop.logic = function()
{
    Loop.state.logic();
};
Loop.render = function()
{
    Loop.state.render();
};
Loop.change_state = function( state )
{
    Loop.cur_state = state.id;
    Loop.state.logic = state.logic;
    Loop.state.render = state.render;
    state.start();
}
Loop.start = function()
{
    Loop.next_tick = Date.now();
    Loop.interpolation = 1;
    Loop.change_state( start_state );
    window.requestAnimationFrame( Loop.run );
}
Loop.stop = function()
{
    Loop.running = false;
}
