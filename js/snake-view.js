
var View = function (board, ctx) {
  this.board = board;
  this.ctx = ctx;
};

View.prototype.play = function () {
  this.bindEvents();
  var callback = function () {

    if (this.board.checkSnake()) {
      this.board.snake.move();
      this.board.checkApple();
      this.render();
    }
    else {
      this.gameOver();
      clearInterval(this.game);
    }
  }.bind(this);
  this.game = setInterval(callback, 80);
}

View.prototype.bindEvents = function () {
  snake = this.board.snake;
  $(document).on("keydown", function (e) {
    var key = e.keyCode;
    e.preventDefault();
    switch (key) {
      case 38:
      snake.turn("N");
      case 39:
      snake.turn("E");
      case 40:
      snake.turn("S");
      case 37:
      snake.turn("W");
      default:
      return;
    }
  });
}

View.prototype.gameOver = function () {
  $('h2').addClass('game-over');
  $('button').addClass('game-over');
  $('.apple').removeClass();
}

View.prototype.render = function () {
  var board = this.board;
  $('h2').html("SNAKE! LENGTH: " + board.snake.segments.length);
  var colors = board.snake.colors();
  this.ctx.fillStyle = colors[0];
  this.ctx.fillRect(0,0,600,600);
  this.ctx.fillStyle = colors[1];
  board.snake.segments.forEach(function (el) {
    var x = el[0];
    var y = el[1];
    this.ctx.fillRect(x*20, y*20, 20, 20);
  });
  this.ctx.fillStyle = 'red';
  this.ctx.fillRect(board.apple[0]* 20,board.apple[1] * 20, 20, 20);
};
