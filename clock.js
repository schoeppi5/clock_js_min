document.addEventListener('DOMContentLoaded', function()
{
	radius = resize();
	clock(radius);
	setInterval(function(){clock(radius)}, 1);
	
	window.addEventListener('resize', function()
	{
		radius = resize();
	});
}, false);

function clock (r)
{
	radius = r;
	lengthS = 8 * (radius / 10);
	lengthM = 7 * (radius / 10);
	lengthMI = 9 * (radius / 10);
	lengthH = 6 * (radius / 10);
	
	var currDate = new Date();
	var minutes = currDate.getMinutes();
	var hours = currDate.getHours() % 12;
	var seconds = currDate.getSeconds();
	var milli = currDate.getMilliseconds();
	
	var angleMI = milli * (360/1000);
	var milliX = Math.sin(toRadians(angleMI)) * lengthMI + radius;
	var milliY = Math.cos(toRadians(angleMI)) * lengthMI + radius;
	milliY = radius - (milliY - radius);
	var angleS = seconds * (360/60) + (milli * (6/1000));
	var secondX = Math.sin(toRadians(angleS)) * lengthS + radius;
	var secondY = Math.cos(toRadians(angleS)) * lengthS + radius;
	secondY = radius - (secondY - radius);
	var angleM = minutes * (360/60) + (seconds * (6/60)) + (milli * ((6/60)/1000));								//Winkel des Minutenzeigers
	var minuteX = Math.sin(toRadians(angleM)) * lengthM + radius;	//X-Koordinate anhand des Winkels zur gedachten Y-Achse (o(50/50))
	var minuteY = Math.cos(toRadians(angleM)) * lengthM + radius;  	//Y-Koordinate anhand des Winkels zur gedachten Y-Achse (o(50/50))
	minuteY = radius - (minuteY - radius); 							//Spiegeln, da Y-Achse von oben nach unten geht
	var angleH = (hours * (360/12)) + (minutes * (30/60)) + (seconds * ((30/60)/60)) + (milli * (((30/60)/60)/1000));
	var hourX = Math.sin(toRadians(angleH)) * lengthH + radius;		//X-Koordinate anhand des Winkels zur gedachten Y-Achse (o(50/50))
	var hourY = Math.cos(toRadians(angleH)) * lengthH + radius;  	//Y-Koordinate anhand des Winkels zur gedachten Y-Achse (o(50/50)
	hourY = radius - (hourY - radius);
	
	var c = document.getElementById("clock");
	var ctx = c.getContext("2d");
	
	ctx.canvas.width = radius * 2;//window.innerWidth;
	ctx.canvas.height = radius * 2;
	
	ctx.clearRect(0, 0, c.width, c.height);			//Clear Canvas
	
	//Zeichne Ziffernblatt
	
	/*ctx.beginPath();
	ctx.arc(radius, radius, radius, 0, 2*Math.PI);
	ctx.closePath();
	ctx.stroke();*/
	var img = document.getElementById("img");
	ctx.drawImage(img, 0, 0, radius * 2, radius * 2);
	
	//Zeichne Zeiger
	
	ctx.beginPath();
	ctx.moveTo(radius, radius);
	ctx.lineWidth = 10;
	ctx.lineTo(hourX, hourY);
	ctx.stroke();
	ctx.lineWidth = 5;
	ctx.moveTo(radius, radius);
	ctx.lineTo(minuteX, minuteY);
	ctx.stroke();
	ctx.moveTo(radius, radius);
	ctx.lineTo(milliX, milliY);
	ctx.stroke();
	ctx.closePath();
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#ff0000";
	ctx.moveTo(radius, radius);
	ctx.lineTo(secondX, secondY);
	ctx.stroke();
	ctx.closePath();
}

function resize()
{
	if(window.innerHeight < window.innerWidth)
	{	
		radius = window.innerHeight / 2;
	}
	else
	{
		radius = window.innerWidth / 2;
	}
	
	return radius;
}

function toRadians(angle)
{
	return (angle * (Math.PI/180));
}