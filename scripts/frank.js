
function frank(gravity)
{
	this.x = canvas.width / 2
	this.y = canvas.height / 2

	this.vy = 0;

	this.rotation = 0;
	this.tiltAmount =  .01

	this.gravity = gravity;

	this.img = imgs.franky;

	this.fall = false


	this.update = function()
	{
		if (this.fall)
		{

	        this.vy += this.gravity;
					this.y += this.vy;
		}

	}

	this.draw = function()
	{
		ctx.save()
		ctx.translate(this.x , this.y )

		this.rotation = (this.vy * this.tiltAmount)
		ctx.rotate(this.rotation)
		ctx.drawImage(this.img, -1 * (imgs.franky.width/2), -1 * (imgs.franky.height/2))
		ctx.restore()
	}
}

function obstacle(gap, height, width)
{
	this.x = canvas.width + 10
	this.width = width

	this.gap = gap
	this.height = height

	this.draw = function()
	{
		ctx.strokeStyle = "rgb(50,50,50)"
		ctx.fillStyle = "#baffc9"
		ctx.lineWidth = 2
		ctx.beginPath()
		ctx.rect(this.x, -10, width, height - (gap/2))
		ctx.rect(this.x, height + (gap/2), width, canvas.height + 10 - height + (gap/2))

		ctx.fill()
		ctx.stroke()
		ctx.closePath()

	}
}

function circleRectCollision(rx,ry,rw,rh, cx,cy,r)
{
	var closestX;
	var closestY;

	if (cy > ry && cy < ry + rh )
	{
		closestY = cy
	}
	else if (cy < ry)
	{
		closestY = ry
	}
	else
	{
		closestY = ry + rh
	}

	if (cx > rx && cx < rx + rw )
	{
		closestX = cx
	}
	else if (cx < rx)
	{
		closestX = rx
	}
	else
	{
		closestX = rx + rw
	}

	
	return (Math.pow(closestX - cx, 2) + Math.pow(closestY - cy, 2)) < (r * r)
}

function frankObstacleCollision(f, o)
{
	return circleRectCollision(o.x, 0, o.width, o.height - (o.gap/2), f.x, f.y, f.img.width/2 - 5 ) ||
	circleRectCollision(o.x,o.height + (o.gap/2), o.width, canvas.height - o.height + (o.gap/2), f.x, f.y, f.img.width/2 - 5 )
}
