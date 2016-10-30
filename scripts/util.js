interp = function( x, x2 )
{
    return ( x + ( ( x2 - x ) * Loop.interpolation ) )
}

function RAD( r )
{
    return r * ( Math.PI / 180 )
}
randRange = function( min, max )
{
    return Math.floor( ( Math.random() * ( max - min ) + min ) )
}
