const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = GAME_WIDTH/2;

const SPEED = 250;


class Bar {
  constructor(width, height, posx, posy) {
    this.width = width;
    this.height = height;
    this.posx = posx;
    this.posy = posy;
  }
  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.posx, this.posy, this.width, this.height);
  }
}


class Diagram {
  constructor(width, height, bar_number, speed) {
    this.width = width;
    this.height = height;
    this.bar_number = bar_number;
    this.speed = speed;

    this.bars = [];
    this.bar_width = this.width/this.bar_number;
    this.bar_height;
  }
  create_bars(ctx) {
    for (var i = 0; i < this.bar_number; i++) {
      this.bar_height = Math.random()*this.height;
      this.bars[i] = new Bar(this.bar_width, this.bar_height, this.bar_width*i, this.height-this.bar_height);
      this.bars[i].draw(ctx);
    }
  }
  draw_bars(ctx) {
    for (var i = 0; i < this.bar_number; i++) {
      this.bars[i].posx = this.bar_width*i;
      this.bars[i].draw(ctx);
    }
  }
  draw(ctx) {
    ctx.fillStyle = "#DBDBDB";
    ctx.fillRect(0, 0, this.width, this.height);
  }
  update(ctx) {
    setInterval(()=>{
      this.draw(ctx);
      this.sort();
      this.draw_bars(ctx);
    }, this.speed);
  }
  sort() {
    var bigger_element;
    for (var i = 0; i < this.bars.length-1; i++) {
      if (this.bars[i].height > this.bars[i+1].height) {
        bigger_element = this.bars[i+1];
        this.bars[i+1] = this.bars[i];
        this.bars[i] = bigger_element;
      }
    }
  }
}

var diagram = new Diagram(GAME_WIDTH, GAME_HEIGHT, 200, SPEED);
diagram.update(ctx);
diagram.create_bars(ctx);
