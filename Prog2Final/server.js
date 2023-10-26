var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get("/", function (req, res) {
   res.redirect("index.html");
});
server.listen(3002, function () {
   console.log("App is running on port 3000");
});



let random = require('./random')
let Grass = require('./class')
let GrassEater = require('./grasseater')
let Killer = require('./killer')
let Predator = require('./predator')
let Stone = require('./stone')
let Water = require('./water')
let events = [];

grassArr = []
grassEaterArr = []
predatorArr = []
killerArr = []
stoneArr = []
matrix = []

function matrixGenerator(size, countGrass, countGrassEater, predatorCount, killerCount, StoneCount) {
   for (let i = 0; i < size; i++) {
      matrix.push([])
      for (let j = 0; j < size; j++) {
         matrix[i].push(0)
      }

   }
   for (let k = 0; k < countGrass; k++) {
      let x = Math.floor(random(size))
      let y = Math.floor(random(size))
      if (matrix[y][x] == 0) {
         matrix[y][x] = 1
      }
      else {
         k--
      }


   }
   for (let k = 0; k < countGrassEater; k++) {
      let x = Math.floor(random(size))
      let y = Math.floor(random(size))
      if (matrix[y][x] == 0) {
         matrix[y][x] = 2
      }
      else {
         k--
      }
   }
   for (let k = 0; k < predatorCount; k++) {
      let x = Math.floor(random(size))
      let y = Math.floor(random(size))
      if (matrix[y][x] == 0) {
         matrix[y][x] = 3
      }
      else {
         k--
      }
   }
   for (let k = 0; k < killerCount; k++) {
      let x = Math.floor(random(size))
      let y = Math.floor(random(size))
      if (matrix[y][x] == 0) {
         matrix[y][x] = 4
      }
      else {
         k--
      }
   }
   for (let k = 0; k < StoneCount; k++) {
      let x = Math.floor(random(size))
      let y = Math.floor(random(size))
      if (matrix[y][x] == 0) {
         matrix[y][x] = 5
      }
      else {
         k--
      }
   }
}

function setupGame() {
   matrixGenerator(100, 250, 20, 20, 20, 20, 20)
   for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix.length; x++) {
         if (matrix[y][x] == 1) {
            var grass = new Grass(x, y);
            grassArr.push(grass)
         }
         else if (matrix[y][x] == 2) {
            var grassEat = new GrassEater(x, y);
            grassEaterArr.push(grassEat)
         }
         else if (matrix[y][x] == 3) {
            var predator = new Predator(x, y);
            predatorArr.push(predator)
         }
         else if (matrix[y][x] == 4) {
            var killer = new Killer(x, y);
            killerArr.push(killer)
         }
         else if (matrix[y][x] == 5) {
            var stone = new Stone(x, y);
            stoneArr.push(stone)
         }
      }
   }
}

function playGame() {
   for (var i in grassArr) {
      grassArr[i].mul()
   }
   for (var i in grassEaterArr) {
      grassEaterArr[i].eat()
      grassEaterArr[i].mul()
   }

   for (var i in predatorArr) {
      predatorArr[i].eat()
      predatorArr[i].mul()
   }
   for (var i in killerArr) {
      killerArr[i].eat()
      killerArr[i].mul()
   }
   for (var i in stoneArr) {
      stoneArr[i].mul()
   }

   for(let event of events) {
      event.do();
   }

   io.emit('update matrix', matrix)
}

io.on('connection',function(socket){
   socket.emit('update matrix', matrix)
   setupGame()
   startPlaying()
   socket.on("waterfall", function() {
      events.push(new Water())
      
   })
})

let intervalID;
function startPlaying(){
   clearInterval(intervalID);
   intervalID = setInterval(() => {
      playGame()
   }, 1000);
}