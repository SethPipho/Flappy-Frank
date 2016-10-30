
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
			this.y += this.vy;
	        this.vy += this.gravity;
		}

		//this.rotation += .01
	


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