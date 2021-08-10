# Navigation system

This project was a little side project, that I coded in two days next to my other projects. The reason for me to do so, was that I am really interested in algorithms and data structures in general. Furthermore I thought well, maybe I should try the ["Dijkstra"](https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/) algorithm in combination with a navigation system. In other words, the ["Dijkstra"](https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/) algorithm was needed in my navigation system, to get the shortest way from one village to a destination.
<br>
<hr>
<br>
## First steps:

In the beginning I started to create a canvas and set the constant sizes like the width and the height for the canvas.

### Writing a class for the whole navigation and for each village:

#### Navigation class
```javascript
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
    // next to functions are needed to set the start and the end/destination
  setStart(start) {
    this.start = this.villages[this.getNumberOfVillage(start, this.villages)];
  }
  setEnd(end) {
    this.end = this.villages[this.getNumberOfVillage(end, this.villages)];
  }
}
```

In this class _Navigation_, I added two more functions for the beginning. These two functions are a must have to set the start and the destination/end of our path.

#### Village class
```javascript
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
    // this function sets all the neighbors of each village at the beginning, that we can use those later
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
```

In the class _Village_ I added an extra function _setAllNeighbors()_, that adds all neighbors of each village into the _this.neighbors_ array. This function uses the two dimensional array, that you'll see in the next step, to test if there's an connection.


### Creating an one dimensional array, in which all the villages are saved:

```javascript
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
```



### Creating an two dimensional array, in which all the connections between each village are saved:

```javascript
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
```

This array sets all connections between each village. If there is a _-1_, this means, that there's no connection. _0_ means, that this is the same village and all the other numbers _greater than 0_ stand for a connection.

### Coding the function, that returns the shortest path between two villages:

```javascript
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
```

This may look like extremely much code, but the functionality behind this code isn't that hard. <br>
You start with the first village from where you want to start your journey. For this village you proof each neighbor and each connection. The nearest village, so the village with the shortest connection will the the next village, that will be visited. All next villages will be saved. In the next step all connection from the start village and all new neighbors from the current village, that was recursively called in the same function will be proofed. If the sum of one connection from the current Village to new neighbors with the connection from the start to the current village is greater than one connection from the start village to one neighbor, then we keep going with the new village as the new _currentVillage_. If not than we keep going with one village, that is the neighbor from the start village and where the connection is the shortest. This process will be done until we found our destination. <br>
For more information, on how the algorithm works, make sure to check out this [YouTube tutorial](https://www.youtube.com/watch?v=FSm1zybd0Tk) about the Dijkstra algorithm.

### Writing the graphical part

For this part, the only thing I've done, was to add _draw()_ functions, to each class. <br>

#### Graphical functions in the _Navigation_ class

```javascript
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
```

#### Graphical functions in the _Village_ class

```javascript
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
```

### Call the functions

In this case, we need to set the start with the _navigation.setStart("A")_ function and the _navigation.setEnd("M")_ function. <br>
After that we draw every single connection between each village. <br>
In the last step, we call the function _navigation.getShortestWay(navigation.start)_ to get our shortest path.

```javascript
navigation.setStart("A");
navigation.setEnd("M");
navigation.drawAllConnections(ctx);
navigation.getShortestWay(navigation.start);
```
