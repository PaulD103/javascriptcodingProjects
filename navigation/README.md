# Navigation system

This project was a little side project, that I coded in two days next to my other projects. The reason for me to do so, was that I am really interested in algorithms and data structures in general. Furthermore I thought well, maybe I should try the ["Dijkstra"](https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/) algorithm in combination with a navigation system. In other words, the ["Dijkstra"](https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/) algorithm was needed in my navigation system, to get the shortest way from one village to a destination.
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

In this class I added two more functions for the beginning. These two functions are a must have to set the start and the destination/end of our path.

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
}
```

### Creating an one dimensional array, in which all the villages are saved

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

### Not finished yet. The rest will come soon.
