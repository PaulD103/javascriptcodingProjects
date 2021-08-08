let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

var NAVIGATIONWIDTH;
var NAVIGATIONHEIGHT;

if ($(window).width() <= 960) {
  NAVIGATIONWIDTH = 300;
  NAVIGATIONHEIGHT = NAVIGATIONWIDTH;
} else {
  NAVIGATIONWIDTH = 600;
  NAVIGATIONHEIGHT = NAVIGATIONWIDTH;
}

  // set style of canvas
ctx.fillStyle = "#DBDBDB";
ctx.fillRect(10, 10, NAVIGATIONWIDTH, NAVIGATIONHEIGHT);

  // set all connections in a two-dimensional array
let connections = [
  [0, 3, -1, 7, 9, -1, 12, -1],
  [3, 0, 1, 5, -1, -1, -1, -1],
  [-1, 1, 0, 5, -1, -1, -1, -1],
  [7, 5, 5, 0, 4, 5, -1, 8],
  [9, -1, -1, 4, 0, 4, 3, -1],
  [-1, -1, -1, 5, 4, 0, 4, 4],
  [12, -1, -1, -1, 3, 4, 0, -1],
  [-1, -1, -1, 8, -1, 4, -1, 0]
];


class Navigation {
  constructor(villages, connections) {
    this.villages = villages,
    this.connections = connections,
    this.start = null,
    this.end = null,
    this.openSet = [],
    this.closedSet = [],
    this.finalPath = []
  }

    // next three functions (drawAllConnections, changeColorOfSingleConnection, drawFinalPath) are needed for drawing each connection in different states
  drawAllConnections() {
    for (let i = 0; i < this.villages.length; i++) {
      for (let j = 0; j < this.villages[i].neighbors.length; j++) {
        ctx.beginPath();
        ctx.moveTo(this.villages[i].posx, this.villages[i].posy);
        ctx.lineTo(this.villages[i].neighbors[j].posx, this.villages[i].neighbors[j].posy);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#222";
        ctx.stroke();
      }
    }
  }
  changeColorOfSingleConnection(startVillage, endVillage, color) {
    ctx.beginPath();
    ctx.moveTo(startVillage.posx, startVillage.posy);
    ctx.lineTo(endVillage.posx, endVillage.posy);
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;
    ctx.stroke();
  }
  drawFinalPath(color) {
    for (let i = 0; i < this.finalPath.length-1; i++) {
      ctx.beginPath();
      ctx.moveTo(this.finalPath[i].posx, this.finalPath[i].posy);
      ctx.lineTo(this.finalPath[i+1].posx, this.finalPath[i+1].posy);
      ctx.lineWidth = 4;
      ctx.strokeStyle = color;
      ctx.stroke();
    }
  }

    // next to functions are needed to set the start and the end/destination
  setStart(start) {
    this.start = this.villages[this.getNumberOfVillage(start, this.villages)];
  }
  setEnd(end) {
    this.end = this.villages[this.getNumberOfVillage(end, this.villages)];
  }

    // these functions are used in the getShortestWay function, seperate several steps and make them more easier to use
  getFinalPath(currentVil) {
    let startVillage = this.start.name;
    this.finalPath.push(currentVil);
    if (currentVil.name === startVillage) {
      console.log(`That's the shortest way:`);
      console.log(this.finalPath);
    } else {
      this.getFinalPath(currentVil.previousVillage);
    }
  }
  getNumberOfVillage(currentVil, option) {
      for (let i = 0; i < option.length; i++) {
        if (option[i].name == currentVil) {
          return i;
        }
      }
  }
  getNearestVillage(shortestWay, shortestWayVillage, i) {
    if (i < this.openSet.length) {
      if (shortestWay > this.openSet[i].totalCost) {
        shortestWay = this.openSet[i].totalCost;
        shortestWayVillage = this.openSet[i];
      }
      this.getNearestVillage(shortestWay, i++);
    }
  }

    // this function is the main function that puts out the shortest way (made with the Dijkstra algorithm)
  getShortestWay(currentVillage) {
    if (this.openSet.length == 0) {

      let i = 0;
      let getConnection = connections[this.getNumberOfVillage(currentVillage.neighbors[i].name, this.villages)][this.getNumberOfVillage(currentVillage.name, this.villages)];
      let shortestWay = getConnection;
      currentVillage.totalCost = connections[this.getNumberOfVillage(currentVillage.name, this.villages)][this.getNumberOfVillage(currentVillage.name, this.villages)];
      let shortestWayVillage = currentVillage.neighbors[0];

      this.openSet.push(currentVillage);
      this.closedSet.push(this.openSet[0]);
      this.openSet.length = 0;

      for (i = 0; i < currentVillage.neighbors.length; i++) {
        this.changeColorOfSingleConnection(currentVillage, currentVillage.neighbors[i], "#CE0000");
        currentVillage.neighbors[i].totalCost = getConnection;
        currentVillage.neighbors[i].previousVillage = currentVillage;
        this.openSet.push(currentVillage.neighbors[i]);
      }

      this.getNearestVillage(shortestWay, shortestWayVillage, 0);

      this.changeColorOfSingleConnection(currentVillage, shortestWayVillage, "#0120CC");

      setTimeout(() => {
        this.drawAllConnections();
        this.getShortestWay(shortestWayVillage);
      }, 500);

    } else {

      let shortestWay;
      let shortestWayVillage;

      this.closedSet.push(currentVillage);

      for (let i = 0; i < currentVillage.neighbors.length; i++) {
        if (this.openSet.includes(currentVillage.neighbors[i])) {
          shortestWay = connections[this.getNumberOfVillage(currentVillage.neighbors[i].name, this.villages)][this.getNumberOfVillage(currentVillage.name, this.villages)];
          shortestWayVillage = currentVillage.neighbors[i];
        }
      }

      for (let i = 0; i < currentVillage.neighbors.length; i++) {

        this.changeColorOfSingleConnection(currentVillage, currentVillage.neighbors[i], "#CE0000");

        if (!this.openSet.includes(currentVillage.neighbors[i]) && !this.closedSet.includes(currentVillage.neighbors[i])) {
          currentVillage.neighbors[i].previousVillage = currentVillage;
          currentVillage.neighbors[i].totalCost = currentVillage.totalCost + connections[this.getNumberOfVillage(currentVillage.neighbors[i].name, this.villages)][this.getNumberOfVillage(currentVillage.name, this.villages)];
          this.openSet.push(currentVillage.neighbors[i]);
        }
      }

      this.openSet.splice(this.getNumberOfVillage(currentVillage.name, this.openSet), 1);

      this.getNearestVillage(shortestWay, shortestWayVillage, 0);

      if (currentVillage.name === this.end.name) {

        this.drawAllConnections();
        this.getFinalPath(currentVillage);
        this.drawFinalPath("#00CE48");

        console.log(`Ziel gefunden`);
        console.log(`Kürzester Weg von ${this.start.name} nach ${this.end.name} beträgt ${currentVillage.totalCost} km.`);

      } else {

        this.changeColorOfSingleConnection(currentVillage, shortestWayVillage, "#0120CC");

        setTimeout(() => {
          this.drawAllConnections();
          this.getShortestWay(shortestWayVillage);
        }, 500);

      }
    }
  }

}


class Village {
  constructor(name, people, posx, posy) {
    this.name = name,
    this.people = people,

    this.totalCost = 0,
    this.neighbors = [],
    this.alreadyVisited = false,
    this.previousVillage,

    this.radius = (people/1000)*(NAVIGATIONWIDTH/100),
    this.posx = posx - this.radius/2,
    this.posy = posy
  }

    // drawing function fot each village
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#008934";
    ctx.arc(this.posx, this.posy, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "#DE5B00";
    ctx.font = `${NAVIGATIONWIDTH/20}px Arial`;
    if (this.people > 6000) {
      ctx.fillText(this.name, this.posx-this.radius/2, this.posy-this.radius/8);
    } else if (this.people > 2000) {
      ctx.fillText(this.name, this.posx-this.radius/1.5, this.posy-this.radius/2);
    } else {
      ctx.fillText(this.name, this.posx-this.radius*3, this.posy-this.radius*2);
    }
  }

    // this fucntion sets all the neighbors of each village at the beginning, that we can use those later
  setAllNeighbors() {
    for (let i = 0; i < villages.length; i++) {
      if (villages[i].name == this.name) {
        for (let j = 0; j < connections[i].length; j++) {
          if (connections[i][j] != -1 && connections[i][j] != 0) {
            this.neighbors.push(villages[j]);
          }
        }
      }
    }
  }
}

let villageone = new Village("A", 4000, NAVIGATIONWIDTH/1.5, NAVIGATIONWIDTH/12);
let villagetwo = new Village("G", 3000, NAVIGATIONWIDTH/1.2, NAVIGATIONWIDTH/3.5);
let villagethree = new Village("E", 6000, NAVIGATIONWIDTH/1.2, NAVIGATIONWIDTH/2.4);
let villagefour = new Village("D", 5000, NAVIGATIONWIDTH/1.7, NAVIGATIONWIDTH/2.9);
let villagefive = new Village("F", 500, NAVIGATIONWIDTH/2.2, NAVIGATIONWIDTH/4);
let villagesix = new Village("K", 1000, NAVIGATIONWIDTH/4.3, NAVIGATIONWIDTH/2.4);
let villageseven = new Village("L", 3000, NAVIGATIONWIDTH/4.3, NAVIGATIONWIDTH/8.6);
let villageeight = new Village("M", 12000, NAVIGATIONWIDTH/2.6, NAVIGATIONWIDTH/1.3);

let villages = new Array();
villages.push(villageone, villagetwo, villagethree, villagefour, villagefive, villagesix, villageseven, villageeight);

for (let i = 0; i < villages.length; i++) {
  villages[i].setAllNeighbors();
  villages[i].draw(ctx);
}

let navigation = new Navigation(villages, connections);

navigation.setStart("A");
navigation.setEnd("M");
navigation.drawAllConnections(ctx);
navigation.getShortestWay(navigation.start);
