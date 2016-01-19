var Coord = function () {};
var c = Coord.prototype;

c.plus = function (array1, array2) {
  return [array1[0] + array2[0], array1[1] + array2[1]];
};

c.equals = function (array1, array2) {
  return (array1[0] === array2[0]) && (array1[1] === array2[1]);
};

c.isOpposite = function (dir1, dir2) {
  var direcs1 = ["N", "S", "E", "W"];
  var direcs2 = ["S", "N", "W", "E"];
  return direcs1.indexOf(dir1) === direcs2.indexOf(dir2);
};

var Snake = function () {
  this.direction = "N";
  this.segments = [[10,10]];
  this.dirs = { N: [0, -1], S: [0, 1], E: [1, 0], W: [-1, 0] };
  this.score = 0;
};

Snake.prototype.move = function () {
  this.lastPosition = this.segments[this.segments.length - 1];
  this.turning = false;
  for(i = this.segments.length - 1; i > 0; i--) {
    this.segments[i] = this.segments[i - 1];
  }
  this.segments[0] = c.plus(this.segments[0], this.dirs[this.direction]);
};

Snake.prototype.turn = function (direction) {
  if (c.isOpposite(direction, this.direction) || this.turning) {
    return;
  } else {
    this.turning = true;
    this.direction = direction;
  }
};

Snake.prototype.colors = function () {
  if (this.segments.length < 10) {
    return ['white', 'black'];
  } else if (this.segments.length < 20) {
    return ['white', 'green'];
  } else if (this.segments.length < 35) {
    return ['white', 'blue']
  } else if (this.segments.length < 50) {
    return ['white', 'orange']
  } else if (this.segments.length < 75) {
    return ['white', 'purple']
  } else if (this.segments.length < 100) {
    return ['black', 'yellow'];
  } else {
    return ['black','green'];
  }
}

var Board = function () {
  this.grid = [];
  for (var i = 0; i < 25; i++) {
    this.grid.push(new Array(25));
  }
  this.snake = new Snake();
  this.apple = this.setApple();
};

Board.prototype.setApple = function () {
  var taken = true;
  while (taken) {
    randomApple = [parseInt(Math.random() * 25),parseInt(Math.random() * 25)];
    if (this.occupied(randomApple) === false) {
      taken = false;
    }
  }
  return randomApple;
};

Board.prototype.occupied = function (pos) {
  segments = this.snake.segments;
  for (var i = 0; i < segments.length; i++) {
    if (c.equals(pos, segments[i])) {
      return true;
    }
  }
  return false;
}

Board.prototype.checkApple = function () {
  if (c.equals(this.snake.segments[0], this.apple)) {
    this.snake.segments.push(this.snake.lastPosition);
    this.snake.score += 10;
    this.apple = this.setApple();
  }
};

Board.prototype.checkSnake = function () {
  var segments = this.snake.segments;
  var head = segments[0];
  var collide = true;
  for (var i = 0; i < segments.length; i++) {
    for (var j = i + 1; j < segments.length; j++) {
      if (segments[i][0] === segments[j][0] && segments[i][1] === segments[j][1]) {
        collide = false;
      }
    }
  }
  var bounds = (head[0] >= 0 && head[0] < 30 && head[1] >= 0 && head[1] < 30)
  return collide && bounds;
};
