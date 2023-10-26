let Creature = require('./livingcreature');
let random = require("./random");
module.exports = class Water extends Creature {
    do() {
        grassArr = [];
        grassEaterArr = [];
        killerArr = [];
        predatorArr = []
        stoneArr = [];

        for(let y = 0; y < matrix.length; y++){
            for(let x=0; x<matrix[0].length;x++){
                matrix[y][x] = 6;
            }
        }
        
    }
}
