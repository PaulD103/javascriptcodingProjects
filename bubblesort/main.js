const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = GAME_WIDTH/2;

const SPEED = 100;


class Bar {
  constructor(width, height, posx, posy) {
    this.width = width;
    this.height = height;
    this.posx = posx;
    this.posy = posy;
  }
  draw(ctx, color) {
    ctx.fillStyle = color;
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

    this.testIndicator = 0;
  }
  create_bars(ctx) {
    for (var i = 0; i < this.bar_number; i++) {
      this.bar_height = Math.random()*this.height;
      this.bars[i] = new Bar(this.bar_width, this.bar_height, this.bar_width*i, this.height-this.bar_height);
      this.bars[i].draw(ctx, "#003FDB");
    }
  }
  draw_background(ctx) {
    ctx.fillStyle = "#DBDBDB";
    ctx.fillRect(0, 0, this.width, this.height);
  }
  update(ctx, i) {
    this.create_bars(ctx);
    this.sort(ctx, i);
  }
  sort(ctx, i) {
    this.draw_background(ctx);
    for (let j = 0; j < this.bars.length; j++) {
      this.bars[j].draw(ctx, "#003FDB");
    }
    this.bars[i].draw(ctx, "#00DB11");

    var smallerBar;
    if (this.bars[i].height > this.bars[i+1].height) {
      this.bars[i+1].draw(ctx, "#EE0000");

      smallerBar = this.bars[i+1];
      this.bars[i+1] = this.bars[i];
      this.bars[i] = smallerBar;
      this.bars[i].posx -= this.bars[i].width;
      this.bars[i+1].posx += this.bars[i].width;

      this.testIndicator = 0;
    } else {
      this.testIndicator++;
    }
    setTimeout(()=> {
      if (this.testIndicator < this.bars.length) {
        if (i < this.bars.length-2) {
          i++;
          this.sort(ctx, i);
        } else {
          this.sort(ctx, 0);
        }
      } else {
        for (let k = 0; k < this.bars.length; k++) {
          this.bars[k].draw(ctx, "#00DB11");
        }
      }
    }, this.speed);
  }
}

var diagram = new Diagram(GAME_WIDTH, GAME_HEIGHT, 20, SPEED);
diagram.update(ctx, 0);
