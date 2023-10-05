class Killer {
    constructor(x, y) {
        this.x = x,
            this.y = y,
            this.energy = 8,
            this.directions = []
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
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        }
        return found;

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
                matrix[newY][newX] = 4;
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
                var newKiller = new Killer(newCell[0], newCell[1]);
                killerArr.push(newKiller);
                matrix[newCell[1]][newCell[0]] = 4;
                this.energy = 5
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in killerArr) {
            if (this.x == killerArr[i].x && this.y == killerArr[i].y) {
                killerArr.splice(i, 1);
                break;
            }
        }
    }
    eat() {
        let grasses = this.chooseCell(1);
        let grasseaters = this.chooseCell(2);
        let predators = this.chooseCell(3);
        let killers = grasses.concat(grasseaters, predators);

        let oneKiller = random(killers);
        if (oneKiller) {

            this.energy++;
            matrix[this.y][this.x] = 0;
            let oneKillerX = oneKiller[0];
            let oneKillerY = oneKiller[1];
            matrix[oneKillerY][oneKillerX] = 4;
            this.x = oneKillerX;
            this.y = oneKillerY;

            for (var i in grassArr) {
                if (oneKillerX == grassArr[i].x && oneKillerY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }

            }  
            for (var i in grassEaterArr) {
                if (oneKillerX == grassEaterArr[i].x && oneKillerY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }

            }
            for (var i in predatorArr) {
                if (oneKillerX == predatorArr[i].x && oneKillerY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }

            }
        }
        else {
            this.move();
        }
    }
}
