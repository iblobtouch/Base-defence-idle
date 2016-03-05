function Globalsrenderer() {
	this.framerate = setInterval(draw, 100 / 60);
}

var renderer = new Globalsrenderer();

function draw() {
	if (readystate >= 5) {
		ctx.clearRect(0, 0, c.width, c.height);
		drawbackground();
		drawhud();
        //draweffects();
		if(shield.hp > 0) {
			shield.hp -= 10;
		}
        ticks += 1;
	}
}

function drawhud() {
    ctx.save();
	ctx.font = "10px Lato";
	ctx.fillText("Shield Health:", 10, 10);
    ctx.fillText("Money: " + money, 10, 50);
    ctx.fillText("Cords: " + mouse.cx + ", " + mouse.cy, 700, 50);
	ctx.strokeStyle = "black";
	ctx.fillStyle = "blue";
	ctx.roundRect(10, 20, 200, 20, 5).stroke();
	ctx.clip();
	ctx.fillRect(10, 20, 200 * (shield.hp / shield.maxhp), 20);
	ctx.restore();
	ctx.save();
	ctx.font = "18px Lato";
    ctx.lineWidth = 2;
	ctx.fillText(shield.hp + " / " + shield.maxhp, 15, 36);
    for (ny = 0; ny < iconsimg.height / 64; ny += 1) {
        for (nx = 0; nx < iconsimg.width / 64; nx += 1) {
            if((nx === mouse.sx) && (ny === mouse.sy)){
               ctx.fillStyle = "white"; 
            } else {
                ctx.fillStyle = "blue";
            }
            ctx.roundRect(10 + (nx * 100),100 + (ny * 100), 80, 80, 5).stroke();
            ctx.roundRect(10 + (nx * 100),100 + (ny * 100), 80, 80, 5).fill();
            ctx.drawImage(iconsimg, nx * 64, ny * 64, 64, 64, 18 + (nx * 100), 108 + (ny * 100), 64, 64);
        }
    }
	
	for (ny = 0; ny < hudiconsimg.height / 64; ny += 1) {
        for (nx = 0; nx < hudiconsimg.width / 64; nx += 1) {
			if (((mouse.state === "draw") && (nx === 0)) || ((mouse.state === "erase") && (nx === 1))) {
               ctx.fillStyle = "white";
            } else {
                ctx.fillStyle = "blue";
            }
			ctx.roundRect(10 + (nx * 100),100 + (100 * (iconsimg.height / 64)) + (ny * 100), 80, 80, 5).stroke();
            ctx.roundRect(10 + (nx * 100),100 + (100 * (iconsimg.height / 64)) + (ny * 100), 80, 80, 5).fill();
            ctx.drawImage(hudiconsimg, nx * 64, ny * 64, 64, 64, 18 + (nx * 100), 108 + (100 * (iconsimg.height / 64)) + (ny * 100), 64, 64);
		}
	}
	ctx.restore();
}

function drawbackground() {
    for (n = 0; n < tiles.length; n += 1) {
		ctx.drawImage(tiles[n].image, tiles[n].dx, tiles[n].dy, tiles[n].dwidth, tiles[n].dheight, (c.width - ((tilewidth * mapsize) / 2)) + ((tiles[n].cx - 1) * (tilewidth / 2)) - (tiles[n].cy * (tilewidth / 2)), (tiles[n].cx * (tileheight / 2)) + (tiles[n].cy * (tileheight / 2)) + (c.height - (tileheight * mapsize)), tiles[n].width, tiles[n].height);
	}
	
	for (n = 0; n < building.length; n += 1) {
		if(building[n].placed === true) {
			if (((building[n].cx < mouse.cx) && (building[n].cy <= mouse.cy)) || ((building[n].cx >= mouse.cx) && (building[n].cy < mouse.cy))) {
				ctx.drawImage(building[n].image, building[n].dx, building[n].dy, building[n].dwidth, building[n].dheight, (c.width - ((tilewidth * mapsize) / 2)) + ((building[n].cx - 1) * (tilewidth / 2)) - (building[n].cy * (tilewidth / 2)), (building[n].cx * (tileheight / 2)) + (building[n].cy * (tileheight / 2)) + (c.height - (tileheight * (mapsize + 1))), building[n].width, building[n].height);
			}
		}
	}
	
	if (mouse.state === "draw") {	
		ctx.drawImage(iconsimg, mouse.sx * 64, mouse.sy * 64, 64, 64, c.width - (tilewidth * ((mapsize + 1) / 2)) + (mouse.cx * (tilewidth / 2)) - (mouse.cy * (tilewidth / 2)), c.height - (tileheight * mapsize) - tileheight + (mouse.cy * (tileheight / 2)) + (mouse.cx * (tileheight / 2)), tilewidth, tilewidth);
	}
	
	for (n = 0; n < building.length; n += 1) {
		if(building[n].placed === true) {
			if (((building[n].cx > mouse.cx) && (building[n].cy >= mouse.cy)) || ((building[n].cx <= mouse.cx) && (building[n].cy > mouse.cy))){
				ctx.drawImage(building[n].image, building[n].dx, building[n].dy, building[n].dwidth, building[n].dheight, (c.width - ((tilewidth * mapsize) / 2)) + ((building[n].cx - 1) * (tilewidth / 2)) - (building[n].cy * (tilewidth / 2)), (building[n].cx * (tileheight / 2)) + (building[n].cy * (tileheight / 2)) + (c.height - (tileheight * (mapsize + 1))), building[n].width, building[n].height);
			}
		}
	}
	
	ctx.lineWidth = 0.2;
	ctx.strokeStyle = "black";
	//ctx.Diamond((nx * (tilewidth / 2)) - (ny * (tilewidth / 2)) + (c.width - ((tilewidth * mapsize) / 2)), (nx * (tileheight / 2)) + (ny * (tileheight / 2)) + (c.height - (tileheight * mapsize)), tilewidth, tileheight).stroke();
	ctx.restore();
}

function draweffects() {
    ctx.save();
    ctx.Diamond(c.width - ((mapsize / 2) * tilewidth), c.height - (mapsize * tileheight), mapsize * tilewidth, mapsize * tileheight);
    ctx.setTransform(1, 0, 0, 0.5, 0, 0);
    ctx.clip();
    for (ny = -1; ny < c.height / (cloudsimg.height / 2); ny += 1) {
		for (nx = -1; nx < c.width / cloudsimg.width; nx += 1) {
            ctx.drawImage(cloudsimg, (nx * cloudsimg.width) + ticks % cloudsimg.width, (ny * cloudsimg.height) + (ticks % cloudsimg.height), cloudsimg.width, cloudsimg.height);
        }
    }
    ctx.restore();
}