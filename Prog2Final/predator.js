let Creature = require('./livingcreature');
let random = require("./random");
module.exports = class Predator extends Creature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {
        if (this.energy > 0) {
            this.energy--;
            let emptyCells = this.chooseCell(0);
            let oneEmptyCell = random(emptyCells);
            if (oneEmptyCell) {
                matrix[this.y][this.x] = 0;
                let newX = oneEmptyCell[0];
                let newY = oneEmptyCell[1];
                matrix[newY][newX] = 3;
                this.x = newX;
                this.y = newY;
            }
        }
        else {
            this.die();
        }
    }
    mul() {
        if (this.energy >= 10) {
            var newCell = random(this.chooseCell(0));
            if (newCell) {
                var newPredator = new Predator(newCell[0], newCell[1]);
                predatorArr.push(newPredator);
                matrix[newCell[1]][newCell[0]] = 3;
                this.energy = 5
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
    eat() {
        let grasses = this.chooseCell(1);
        let grasseaters = this.chooseCell(2);
        let predators = grasses.concat(grasseaters);

        let onePredator = random(predators);
        if (onePredator) {

            this.energy++;
            matrix[this.y][this.x] = 0;
            let onePredatorX = onePredator[0];
            let onePredatorY = onePredator[1];
            matrix[onePredatorY][onePredatorX] = 3;
            this.x = onePredatorX;
            this.y = onePredatorY;

            for (var i in grassArr) {
                if (onePredatorX == grassArr[i].x && onePredatorY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }

            }
            for (var i in grassEaterArr) {
                if (onePredatorX == grassEaterArr[i].x && onePredatorY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }

            }
        }
        else {
            this.move();
        }
    }
}

