var pixel = 20;
var canvas, context;

var figure;

var figuresCount = 7;

window.onload = init();


function init() {
	canvas = document.getElementById("canvas");
	width = canvas.clientWidth;
	height = canvas.clientHeight;
	canvas.width = width;
	canvas.height = height;

	document.addEventListener("keydown", onKeyPressed);

	context = canvas.getContext('2d');
	figure = new Figure(Math.ceil(Math.random() * figuresCount), canvas.width / 2, -2 * pixel, pixel);
	run();
}

function run() {
	context.fillStyle = "white";
	context.fillRect(0, 0, canvas.width, canvas.height);

	figure.draw(context);
	figure.step();

	setTimeout(run, 200);
}

function onKeyPressed(event) {
	switch (event.keyCode) {
		case 37: // left
			figure.moveLeft();
			break;
		case 39: // right
			figure.moveRight();
			break;
		case 38: // up
			figure.rotate();
			break;
		case 40: //down
			figure.fall();
			break;
	}
}

function Figure(id, x, y, pixel) {
	var id = id;
	var body = createBody(id);
	var x = x,
		y = y;
	var pixel = pixel;

	function createBody(id) {
		switch (id) {
			case 0:
				return [
					[0, -1], // O
					[0, 0], //  O
					[0, 1], //  X
					[0, 2] //   O
				];
			case 1:
				return [
					[-1, 1], // OO  
					[0, 1], //  X
					[0, 0], //  O
					[0, -1]
				];
			case 2:
				return [
					[1, 1], // OO
					[0, 1], //  X
					[0, 0], //  O
					[0, -1]
				];
			case 3:
				return [
					[1, 1], // OO
					[1, 0], // XO
					[0, 1],
					[0, 0]
				];
			case 4:
				return [
					[1, 1], //  OO
					[0, 1], // Ox
					[0, 0],
					[-1, 0]
				];
			case 5:
				return [
					[-1, 1], // OO    
					[0, 1], //   XO
					[0, 0],
					[1, 0]
				];
			case 6:
				return [
					[0, 1], //  O    
					[1, 0], // OXO
					[0, 0],
					[-1, 0]
				];
		}
	}

	this.draw = function(context) {
		context.fillStyle = "black";
		for (var i = 0; i < body.length; ++i) {
			context.fillRect(x + body[i][0] * pixel, y + body[i][1] * pixel, pixel, pixel);
		}
	}

	this.step = function(context) {
		y += pixel;
	}

	this.moveLeft = function() {
		x = x > pixel ? x - pixel : 0;
	}

	this.moveRight = function() {
		x = x + pixel < width ? x + pixel : width - pixel;
	}

	this.rotate = function() {
		for (var i = 0; i < body.length; ++i) {
			body[i] = [-body[i][1], body[i][0] + 1];
		}
	}

	this.fall = function() {
		y += pixel;
	}
}