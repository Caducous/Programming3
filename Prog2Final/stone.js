let Creature = require('./livingcreature');
let random = require("./random");
module.exports = class Stone extends Creature {
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        // console.log(newCell);
        if (this.multiply >= 5 && newCell) {
            var newStone = new Stone(newCell[0], newCell[1], this.index);
            stoneArr.push(newStone);
            matrix[newCell[1]][newCell[0]] = 5;
            this.multiply = 10;
        }
    }
}

