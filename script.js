function load_images() {
	ball_image = new Image();
	ball_image.src = 'images/ball.png';

	gem_image = new Image();
	gem_image.src = 'images/gem.png';

	player_image = new Image();
	player_image.src = 'images/superhero.png';
}

function init() {
	canvas = document.getElementById('myCanvas');
	W = 700;
	H = 399;

	canvas.width = W;
	canvas.height = H;

	pen = canvas.getContext('2d');

	score = 0;
	game_over = false;

	e1 = {
		x: 150,
		y: 50,
		w: 60,
		h: 60,
		speed: 20,
	};
	e2 = {
		x: 300,
		y: 150,
		w: 60,
		h: 60,
		speed: 30,
	};
	e3 = {
		x: 450,
		y: 20,
		w: 70,
		h: 70,
		speed: 40,
	};
	enemy = [e1, e2, e3];

	player = {
		x: 20,
		y: H / 2,
		w: 60,
		h: 60,
		speed: 10,
		moving: 'false',
	};

	gem = {
		x: W - 100,
		y: H / 2,
		w: 80,
		h: 80,
	};

	// create mouse event listener

	document.addEventListener('mousedown', function () {
		player.moving = 'true';
	});

	document.addEventListener('mouseup', function () {
		player.moving = 'false';
	});

	// create keyboard event listener

	document.addEventListener('keydown', function (e) {
		if (e.key == 'ArrowRight') {
			player.moving = 'true';
		}
	});

	document.addEventListener('keyup', function (e) {
		if (e.key == 'ArrowRight') {
			player.moving = 'false';
		}
	});
}

function draw() {
	pen.clearRect(0, 0, W, H);
	pen.drawImage(player_image, player.x, player.y, player.w, player.h);
	pen.drawImage(gem_image, gem.x, gem.y, gem.w, gem.h);

	for (i = 0; i < enemy.length; i++) {
		pen.drawImage(ball_image, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
	}

	pen.fillStyle = 'white';
	pen.fillText('Score' + ' : ' + score, 20, 20);
}

function update() {
	if (player.moving == 'true') {
		player.x += player.speed;
		score += 20;
	}

	// collision b/w balls and player
	for (let i = 1; i <= enemy.length; i++) {
		if (collision(enemy[i - 1], player)) {
			score -= i * 50;
			if (score < 0) {
				game_over = true;
				alert('Game over');
			}
		}
	}

	// collision b/w gem and player
	if (collision(gem, player)) {
		game_over = true;
		draw();
		alert('You score : ' + score);
		// break gameloop
	}

	for (let i = 0; i < enemy.length; i++) {
		enemy[i].y += enemy[i].speed;
		if (enemy[i].y > H - enemy[i].h || enemy[i].y < 0) {
			enemy[i].speed *= -1;
		}
	}
}

// check collision
function collision(b1, b2) {
	if (Math.abs(b1.x - b2.x) <= 20 && Math.abs(b1.y - b2.y) <= 20) {
		return true;
	}
	return false;
}

function gameloop() {
	if (game_over == true) {
		clearInterval(f);
		load_images();
		init();
	}
	draw();
	update();
}

// start game
load_images();
init();

var f = setInterval(gameloop, 100);
