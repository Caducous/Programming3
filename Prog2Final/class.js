let Creature = require('./livingcreature');
let random = require("./random");
module.exports = class Grass extends Creature {
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        // console.log(newCell);
        if (this.multiply >= 4 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 10;
        }
    }
    
}

