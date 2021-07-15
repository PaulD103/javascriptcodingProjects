class Element {
  constructor(posx, posy, element_size) {
    this.posx = posx;
    this.posy = posy;
    this.element_size = element_size;
  }
  draw(ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(this.posx, this.posy, this.element_size, this.element_size);
  }
}

class Snake {
  constructor(posx, posy, element_size) {
    this.posx = posx;
    this.posy = posy;
    this.element_size = element_size;
  }
  draw(ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(this.posx*this.element_size, this.posy*this.element_size, this.element_size, this.element_size);
  }
  clear(ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(this.posx*this.element_size, this.posy*this.element_size, this.element_size, this.element_size);
  }
}

class Wall extends Element {
  constructor(posx, posy, element_size) {
    super(posx, posy, element_size, element_size);
  }
  draw_wall(ctx, color) {
    this.draw(ctx, color);
  }
};

class InputHandler {
  constructor(game) {
    this.game = game;
    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 37:
          if (this.game.direction != "O") {
            this.game.direction = "W";
          }
          break;
        case 38:
          if (this.game.direction != "S") {
            this.game.direction = "N";
          }
          break;
        case 39:
          if (this.game.direction != "W") {
            this.game.direction = "O";
          }
          break;
        case 40:
          if (this.game.direction != "N") {
            this.game.direction = "S";
          }
          break;
        default:
      }
    });
  }
}

class FoodElement {
  constructor(posx, posy, element_size) {
    this.posx = posx;
    this.posy = posy;
    this.element_size = element_size;
  }
  draw(ctx) {
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(this.posx, this.posy, this.element_size, this.element_size);
  }
}

class Game {
  constructor(width, height, length, paste) {
    this.width = width;
    this.height = height;
    this.length_number = length;
    this.paste = paste;

    this.elements = [];
    this.element_size = this.width/this.length_number;
    this.moveable_elements = [];

    this.direction;

    this.current_posx;
    this.current_posy;
    this.snake = [];
    this.last_element;

    this.food_element;
    this.random_food_posx;
    this.random_food_posy;

    this.wall_elements = [];
    this.wall_probability = 0.03;
    this.wall_detection;

    this.score_number = 1;
  }
  snake_options(dir, ctx) {
    for (var i = 0; i < this.wall_elements.length; i++) {
      if (dir == "O" && (this.snake[this.snake.length-1].posx+1)*this.element_size == this.wall_elements[i].posx && this.snake[this.snake.length-1].posy*this.element_size == this.wall_elements[i].posy) {
        return false;
      } else if (dir == "S" && this.snake[this.snake.length-1].posx*this.element_size == this.wall_elements[i].posx && (this.snake[this.snake.length-1].posy+1)*this.element_size == this.wall_elements[i].posy) {
        return false;
      } else if (dir == "W" && (this.snake[this.snake.length-1].posx-1)*this.element_size == this.wall_elements[i].posx && this.snake[this.snake.length-1].posy*this.element_size == this.wall_elements[i].posy) {
        return false;
      } else if (dir == "N" && this.snake[this.snake.length-1].posx*this.element_size == this.wall_elements[i].posx && (this.snake[this.snake.length-1].posy-1)*this.element_size == this.wall_elements[i].posy) {
        return false;
      }
    }
    for (var i = 1; i < this.snake.length-1; i++) {
      if (this.snake[this.snake.length-1].posx == this.snake[i].posx && this.snake[this.snake.length-1].posy == this.snake[i-1].posy) {
        this.reset(ctx);
      }
    }
  }
  walls(ctx) {
    this.wall_elements = [];
    this.moveable_elements = [];
    for (var i = 0; i < this.length_number; i++) {
      for (var j = 0; j < this.length_number; j++) {
        this.elements[0][j] = new Wall(this.elements[0][j].posx, this.elements[0][j].posy, this.element_size);
        this.elements[0][j].draw_wall(ctx, "blue");
        this.elements[i][0] = new Wall(this.elements[i][0].posx, this.elements[i][0].posy, this.element_size);
        this.elements[i][0].draw_wall(ctx, "blue");
        this.elements[this.length_number-1][j] = new Wall(this.elements[this.length_number-1][j].posx, this.elements[this.length_number-1][j].posy, this.element_size);
        this.elements[this.length_number-1][j].draw_wall(ctx, "blue");
        this.elements[i][this.length_number-1] = new Wall(this.elements[i][this.length_number-1].posx, this.elements[i][this.length_number-1].posy, this.element_size);
        this.elements[i][this.length_number-1].draw_wall(ctx, "blue");
        if (this.elements[i][j].posx != 0 && this.elements[i][j].posy != 0 && this.elements[i][j].posx != (this.length_number-1)*this.element_size && this.elements[i][j].posy != (this.length_number-1)*this.element_size) {
          this.moveable_elements.push(this.elements[i][j]);
        }
      }
    }
    for (var i = 0; i < this.moveable_elements.length; i++) {
      if (Math.random()<this.wall_probability) {
        this.moveable_elements[i] = new Wall(this.moveable_elements[i].posx, this.moveable_elements[i].posy, this.element_size);
        this.wall_elements.push(this.moveable_elements[i]);
        this.moveable_elements[i].draw_wall(ctx, "blue");
      }
    }
  }
  random_val() {
    this.random_food_posx = Math.floor(Math.random()*(this.length_number-2));
    this.random_food_posy = Math.floor(Math.random()*(this.length_number-2));
  }
  food(ctx) {
    this.random_val();
    outerloop:
    for (var i = 0; i < this.snake.length; i++) {
      if (this.snake[i].posx == this.random_food_posx && this.snake[i].posy == this.random_food_posy) {
        this.random_val();
        continue outerloop;
      }
      for (var i = 0; i < this.wall_elements.length; i++) {
        if (this.wall_elements[i].posx == this.random_food_posx*this.element_size && this.wall_elements[i].posy == this.random_food_posy*this.element_size) {
          this.random_val();
          continue outerloop;
        }
      }
    }
    this.food_element = new FoodElement((this.random_food_posx+1) * this.element_size, (this.random_food_posy+1) * this.element_size, this.element_size);
    this.elements[this.random_food_posx][this.random_food_posy] = this.food_element;
    this.food_element.draw(ctx);
  }
  draw(ctx) {
    for (var i = 0; i < this.length_number; i++) {
      for (var j = 0; j < this.length_number; j++) {
        this.elements[i][j].draw(ctx, "#444");
      }
    }
  }
  show(ctx) {
    for (var i = 0; i < this.length_number; i++) {
      this.elements[i] = new Array();
      for (var j = 0; j < this.length_number; j++) {
        var element = new Element(this.element_size * j, this.element_size * i, this.element_size, this.element_size);
        this.elements[i].push(element);
      }
    }
    this.draw(ctx);
    this.walls(ctx);
    this.start_snake(ctx);
    this.food(ctx);
  }
  start_snake(ctx) {
    this.current_posx = 1;
  	this.current_posy = 1;
  	this.snake.push(new Snake(1, 1, this.element_size));
  	this.snake[0].draw(ctx, "red");
  }
  input_handler() {
    setInterval(()=>{
      new InputHandler(this);
    }, 50);
  }
  reset(ctx) {
    this.wall_detection = undefined;
    this.direction = undefined;
    this.snake = [];
    this.show(ctx);
    this.score_number = 1;
    setTimeout(()=>{
      alert("Du bist gestorben!");
    }, 20);
  }
  update(ctx) {
    setInterval(()=>{
      switch (this.direction) {
        case "O":
          this.wall_detection = this.snake_options(this.direction, ctx);
          if (this.snake[this.snake.length-1].posx < this.length_number-2 && this.wall_detection == undefined) {
            this.current_posx++;
          } else if (this.wall_detection == false || this.snake[this.snake.length-1].posx == this.length_number-2) {
            this.reset(ctx);
          }
          break;
        case "S":
          this.wall_detection = this.snake_options(this.direction, ctx);
          if (this.snake[this.snake.length-1].posy < this.length_number-2 && this.wall_detection == undefined) {
            this.current_posy++;
          } else if (this.wall_detection == false || this.snake[this.snake.length-1].posy == this.length_number-2) {
            this.reset(ctx);
          }
          break;
        case "W":
          this.wall_detection = this.snake_options(this.direction, ctx);
          if (this.snake[this.snake.length-1].posx > 1 && this.wall_detection == undefined) {
            this.current_posx--;
          } else if (this.wall_detection == false || this.snake[this.snake.length-1].posx == 1) {
            this.reset(ctx);
          }
          break;
        case "N":
          this.wall_detection = this.snake_options(this.direction, ctx);
          if (this.snake[this.snake.length-1].posy > 1 && this.wall_detection == undefined) {
            this.current_posy--;
          } else if (this.wall_detection == false || this.snake[this.snake.length-1].posy == 1) {
            this.reset(ctx);
          }
          break;
        default:
      }
      if (this.snake[this.snake.length-1].posx*this.element_size == this.food_element.posx && this.snake[this.snake.length-1].posy*this.element_size == this.food_element.posy) {
        this.score_number++;
        this.food(ctx);
      } else this.last_element = this.snake.shift();
      this.snake.push(new Snake(this.current_posx, this.current_posy, this.element_size));
      this.last_element.clear(ctx, "#444");
      for (var i = 0; i < this.snake.length; i++) {
        this.snake[i].draw(ctx, "red");
      }
    }, this.paste);
  }
}


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var score = document.getElementById("score");

var GRID_LENGTH;
var GAME_WIDTH;
var GAME_HEIGHT;

if ($(window).width() > 960) {
GRID_LENGTH = 25;
GAME_WIDTH = 600;
GAME_HEIGHT = 600;
} else {
GRID_LENGTH = 15;
GAME_WIDTH = 300;
GAME_HEIGHT = 300;
}


var PASTE;


function speed(score_number) {
  if (score_number <= 4) {
    PASTE = 220;
  } else if (score_number <= 8) {
    PASTE = 190;
  } else if (score_number <= 12) {
    PASTE = 160;
  } else if (score_number <= 16) {
    PASTE = 130;
  } else if (score_number <= 20) {
    PASTE = 100;
  } else if (score_number <= 24) {
    PASTE = 70;
  }
}
speed(0);

var game = new Game(GAME_WIDTH, GAME_HEIGHT, GRID_LENGTH, PASTE);

game.input_handler();
game.show(ctx);
game.update(ctx);
setInterval(()=>{
  score.innerText = `Score: ${game.score_number}`;
  speed(game.score_number);
  game.paste = PASTE;
}, PASTE);
