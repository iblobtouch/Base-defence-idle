function mousemove(e) {
    mouse.x = e.pageX - c.offsetLeft;
    mouse.y = e.pageY - c.offsetTop;
    document.getElementById("mouse").innerHTML = mouse.x + " " + mouse.y;
    
    //Log the global mouses x and y co-ordinate relative to the top left of the canvas.
	
	for (ny = 0; ny < mapsize; ny += 1) {
		for (nx = 0; nx < mapsize; nx += 1) {
			if (diamondboundstest((nx * (tilewidth / 2)) - (ny * (tilewidth / 2)) + (c.width - ((tilewidth * mapsize) / 2)), (nx * (tileheight / 2)) + (ny * (tileheight / 2)) + (c.height - (tileheight * mapsize)) + (tileheight / 2), tilewidth, tileheight, mouse.x, mouse.y)) {
				mouse.cx = nx;
				mouse.cy = ny;
				//Tests for what tile the mouse is inside.
			}
		}
	}
	if (diamondboundstest(c.width - (mapsize * (tilewidth / 2)), c.height - (mapsize * (tileheight / 2)), mapsize * tilewidth, mapsize * tileheight, mouse.x, mouse.y)) {
		if (mouse.left === true) {
			for (n = 0; n < building.length; n += 1) {
				if ((building[n].cx === mouse.cx) && (building[n].cy === mouse.cy)) {
					if(mouse.state === "draw") {
						building[n].dx = mouse.sx * 64;
						building[n].dy = mouse.sy * 64;
						building[n].placed = true;
					} else {
						building[n].placed = false;
					}
				}
			}
		}
	}
}

c.addEventListener("mousemove", mousemove, false);

//When the mouse is moved, run this command.

function mouseclick(e) {
	if (readystate === 5) {
		var mouseoverdx = 0;
		var mouseoverdy = 0;
		for (n = 0; n < building.length; n += 1) {
			if ((building[n].cx === mouse.cx) && (building[n].cy === mouse.cy)) {
				mouseoverdx = building[n].dx;
				mouseoverdy = building[n].dy;
			}
		}
		if (diamondboundstest(c.width - (mapsize * (tilewidth / 2)), c.height - (mapsize * (tileheight / 2)), mapsize * tilewidth, mapsize * tileheight, mouse.x, mouse.y)) {
			for (n = 0; n < building.length; n += 1) {
				if ((building[n].cx === mouse.cx) && (building[n].cy === mouse.cy)) {
					if(mouse.state === "draw") {
						building[n].dx = mouse.sx * 64;
						building[n].dy = mouse.sy * 64;
						building[n].placed = true;
					} else {
						building[n].placed = false;
					}
				}
			}
		} else {
			for (ny = 0; ny < iconsimg.height / 64; ny += 1) {
				for (nx = 0; nx < iconsimg.width / 64; nx += 1) {
					if (squareboundstest(10 + (nx * 100), 100 + (ny * 100), 80, 80, mouse.x, mouse.y)) {
						mouse.sx = nx;
						mouse.sy = ny;
						mouse.state = "draw";
					}
				}
			}
			for (ny = 0; ny < hudiconsimg.height / 64; ny += 1) {
				for (nx = 0; nx < hudiconsimg.width / 64; nx += 1) {
					if (squareboundstest(10 + (nx * 100), 100 + (100 * (iconsimg.height / 64)) + (ny * 100), 80, 80, mouse.x, mouse.y)) {
						if ((nx === 0)) {
							mouse.state = "draw";
							console.log("set to draw");
						} else if (nx === 1) {
							mouse.state = "erase";
							console.log("set to erase");
						}
					}
				}
			}
		}
		if (e.shiftKey === true) {
			for (n = 0; n < building.length; n += 1) {
				if ((building[n].dx === mouseoverdx) && (building[n].dy === mouseoverdy)) {
					if (mouse.state === "draw") {
						building[n].dx = mouse.sx * 64;
						building[n].dy = mouse.sy * 64;
					} else {
						building[n].placed = false;
					}
				}
			}
		}
    }
}

c.addEventListener("click", mouseclick, false);

function mousedown (e) {
	mouse.left = true;
}

c.addEventListener("mousedown", mousedown, false);

function mouseup (e) {
	mouse.left = false;
}

c.addEventListener("mouseup", mouseup, false);