var c = document.getElementById("game");
//Properties of the canvas.

var ctx = c.getContext("2d");
ctx.mozImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
//Context for drawing.

var n = 0;
//For use in For loops

var nx = 0;
//For use in For loops

var ny = 0;
//For use in For loops

var nz = 0;
//For use in For loops

CanvasRenderingContext2D.prototype.Diamond = function (x, y, width, height) {
	this.beginPath();
	this.moveTo(x, y);
	this.lineTo(x + width / 2, y + height / 2);
	this.lineTo(x, y + height);
	this.lineTo(x - width / 2, y + height / 2);
	this.lineTo(x, y);
	this.closePath();
	return this;
};
//This function draws a diamond shape, x and y is the x and y of the top middle point, width and height is its width and height in pixels.

CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, r) {
	this.beginPath();
	this.moveTo(x + r, y);
    this.arcTo(x + width, y, x + width, y + height, r);
    this.arcTo(x + width, y + height, x, y + height, r);
    this.arcTo(x, y + height, x, y, r);
    this.arcTo(x, y, x + width, y, r);
	this.closePath();
	return this;
};
//This function draws a rectangle with rounded edges, x and y is the location of the top left point, width and height is the width and height for drawing and r is the radius of each edge.

function diamondboundstest(x, y, width, height, cx, cy) {
    if (lineboundstest(x - (width / 2), y, x, y - (height / 2), cx, cy) > 0) {
		if (lineboundstest(x, y - (height / 2), x + (width / 2), y, cx, cy) > 0) {
			if (lineboundstest(x + (width / 2), y, x, y + (height / 2), cx, cy) > 0) {
				if (lineboundstest(x, y + (height / 2), x - (width / 2), y, cx, cy) > 0) {
        			return (true);
				}
			}
		}
    } else {
        return (false);
    }
}

//This function takes the x and y of the center point of the diamond shape, its width and height at the widest parts, and the x and y of the colliding point and tests to see if a collision has occoured.

function squareboundstest(x, y, width, height, cx, cy) {
    if (lineboundstest(x, y, x + width, y, cx, cy) > 0) {
		if (lineboundstest(x + width, y, x + width, y + height, cx, cy) > 0) {
			if (lineboundstest(x + width, y + height, x, y + height, cx, cy) > 0) {
				if (lineboundstest(x, y + height, x, y, cx, cy) > 0) {
        			return (true);
				}
			}
		}
    } else {
        return (false);
    }
}

//This function takes the x and y of the top left point of the square shape, its width and height, and the x and y of the colliding point and tests to see if a collision has occoured.

function lineboundstest (ax, ay, bx, by, cx, cy) {
    return ((bx - ax) * (cy - ay) - (by - ay) * (cx - ax));
}

//Takes 3 points, points a and b are the start and end points of the line, point c is the point that is tested if it is on a certain side of the line, returns > 0 if it's to the left, 0 if it's on the line and return < 0 if it's to the right.

function Globalsshield () {
	this.maxhp = 10000;
	this.hp = this.maxhp;
}

var shield = new Globalsshield();

//Global variables for the shield.

function Globalsmouse() {
    this.x = 0;
    this.y = 0;
    this.x = 0;
    this.y = 0;
    this.sx = 0;
    this.sy = 0;
	this.left = false;
	this.state = "draw";
}

var mouse = new Globalsmouse();

//Global mouse data, x and y for mouse x and y, cordx and cordy for the currently selected tile.

var tilewidth = 64;
var tileheight = 32;
var mapsize = 12;

//Tile properties, width and height of each tile in pixels and the mapsize is the length and width of the map.

var money = 0;

var ticks = 0;

//Ticks passed since pressing "start", there are 60 ticks in one second.

var readystate = 0;
//Required data objects loaded, when all of them are loaded this will be 5;

function onimgload () {
	console.log("Loaded!");
	readystate += 1;
}

//When an image is loaded, increment readystate

var tilesetimg = new Image();
tilesetimg.src = "images/tileset.png";
tilesetimg.onload = onimgload();

var cloudsimg = new Image();
cloudsimg.src = "images/clouds.png";
cloudsimg.onload = onimgload();

var iconsimg = new Image();
iconsimg.src = "images/icons.png";
iconsimg.onload = onimgload();

var hudiconsimg = new Image();
hudiconsimg.src = "images/hudicons.png";
hudiconsimg.onload = onimgload();

function Tile (img, dx, dy, dwidth, dheight, width, height, cx, cy) {
	this.image = img;
	this.dx = dx;
	this.dy = dy;
	this.dwidth = dwidth;
	this.dheight = dheight;
	this.width = width;
	this.height = height;
	this.cx = cx;
	this.cy = cy;
}

var tiles = [];

nx = 0;
ny = 0;

for (n = 0; n < mapsize * mapsize; n += 1) {
	if ((nx === 0) && (ny === 0)) {
		tiles[n] = new Tile(tilesetimg, 128, 96, 64, 32, 64, 32, nx, ny);
	} else if ((nx === 0) && (ny === mapsize - 1)) {
		tiles[n] = new Tile(tilesetimg, 0, 96, 64, 32, 64, 32, nx, ny);
	} else if ((nx === mapsize - 1) && (ny === mapsize - 1)) {
		tiles[n] = new Tile(tilesetimg, 192, 96, 64, 32, 64, 32, nx, ny);
	} else if ((nx === mapsize - 1) && (ny === 0)) {
		tiles[n] = new Tile(tilesetimg, 64, 96, 64, 32, 64, 32, nx, ny);
	} else if ((nx === 0)) {
		tiles[n] = new Tile(tilesetimg, 128, 128, 64, 32, 64, 32, nx, ny);
	} else if ((ny === 0)) {
		tiles[n] = new Tile(tilesetimg, 192, 128, 64, 32, 64, 32, nx, ny);
	} else if ((nx === mapsize - 1)) {
		tiles[n] = new Tile(tilesetimg, 64, 128, 64, 32, 64, 32, nx, ny);
	} else if ((ny === mapsize - 1)) {
		tiles[n] = new Tile(tilesetimg, 0, 128, 64, 32, 64, 32, nx, ny);
	} else {
		tiles[n] = new Tile(tilesetimg, 0, 0, 64, 32, 64, 32, nx, ny);
	}
	
	console.log(nx + " " + ny);
	nx += 1;
	if (nx >= mapsize) {
		nx = 0;
		ny += 1;
	}
}

var building = [];

nx = 0;
ny = 0;

for (n = 0; n < mapsize * mapsize; n += 1) {
	building[n] = new Tile(iconsimg, 0, 0, 64, 64, 64, 64, nx, ny);
	building[n].placed = false;
	console.log(building[n].placed);
	nx += 1;
	if (nx >= mapsize) {
		nx = 0;
		ny += 1;
	}
}

function testperframe() {
	if (tiles.length >= mapsize * mapsize) {
		if (building.length >= mapsize * mapsize) {
			readystate += 1;
			clearInterval(testeveryframe);
		}
	}
}

var testeveryframe = setInterval(testperframe, 10);

//When the map data is finished loading, increment readystate.

