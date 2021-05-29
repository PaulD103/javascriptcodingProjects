const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = GAME_WIDTH/2;

const SPEED = 100;

// class of Bar
class Bar {
  constructor(width, height, posx, posy) {
    this.width = width;
    this.height = height;
    this.posx = posx;
    this.posy = posy;
  }
  // draw function of each bar
  draw(ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(this.posx, this.posy, this.width, this.height);
  }
}

// class of Diagram
class Diagram {
  constructor(width, height, bar_number, speed) {
    this.width = width;
    this.height = height;
    this.bar_number = bar_number;
    this.speed = speed;

    this.bars = [];
    this.bar_width = this.width/this.bar_number;
    this.bar_height;

    // an indicator for testing if the algorithm is finished
    this.testIndicator = 0;
  }
  // function creates random bars
  create_bars(ctx) {
    for (var i = 0; i < this.bar_number; i++) {
      this.bar_height = Math.random()*this.height;
      this.bars[i] = new Bar(this.bar_width, this.bar_height, this.bar_width*i, this.height-this.bar_height);
      this.bars[i].draw(ctx, "#003FDB");
    }
  }
  // function that creates a lightgrey background
  draw_background(ctx) {
    ctx.fillStyle = "#DBDBDB";
    ctx.fillRect(0, 0, this.width, this.height);
  }
  // function to start the whole algorithm
  update(ctx, i) {
    this.create_bars(ctx);
    this.sort(ctx, i);
  }
  // the whole sorting function
  sort(ctx, i) {
    // draws the background new each time to delete old positioned bars
    this.draw_background(ctx);
    // loop that draws new all the bars after sorting them
    for (let j = 0; j < this.bars.length; j++) {
      this.bars[j].draw(ctx, "#003FDB");
    }
    // draws new the current bar in green to where we are at the moment
    this.bars[i].draw(ctx, "#00DB11");

    // this section is the actual algorithm
    // it goes through the bubblesort scheme and calls the function recursive each time after specific conditions
    var min = i;
    for (var j = i; j < this.bars.length; j++){
      if (this.bars[j].height <= this.bars[min].height){
        min = j;
      }
    }
    this.bars[min].draw(ctx, "#EE0000");
    this.testIndicator++;

    // changing the bars
    var smallestNumber = this.bars[min];
    this.bars[min] = this.bars[i];
    this.bars[i] = smallestNumber;

    // changing the x position of the bars to their old position
    var smallestNumberPosX = this.bars[min].posx;
    this.bars[min].posx = this.bars[i].posx;
    this.bars[i].posx = smallestNumberPosX;


    setTimeout(()=> {
      if (this.testIndicator < this.bars.length) {
        if (i < this.bars.length) {
          i++;
          this.sort(ctx, i);
        } else {
          console.error("There is an error!");
        }
      } else {
        console.log(`Sorted!`);
        for (let k = 0; k < this.bars.length; k++) {
          this.bars[k].draw(ctx, "#00DB11");
        }
      }
    }, this.speed);
  }
}

var diagram = new Diagram(GAME_WIDTH, GAME_HEIGHT, 20, SPEED);
diagram.update(ctx, 0);
