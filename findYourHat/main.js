const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let game = true;

class Field {
  constructor(field) {
    this._field = field;
    this.pathLocation = this.findPath();
  }

  findPath() {
    for (let i = 0; i < this._field.length; i ++) {
        for (let j = 0; j < this._field[i].length; j ++) {
            if (this._field[i][j] === pathCharacter) {
                const locationPath = {
                  y: i,
                  x: j
                };
                return locationPath;
              };
        };
    };
  }

  print() {
    const fieldNoComma = this._field.map(el => el.join(''));
    const fieldString = fieldNoComma.join('\r\n');
    console.log(fieldString);
  }

  locations() {
    let parametersLocations = {
      hatCharacter: {},
      holeCharacter: []
    };

    for (let i = 0; i < this._field.length; i ++) {
      for (let j = 0; j < this._field[i].length; j ++) {
        if (this._field[i][j] === hat) {
          parametersLocations.hatCharacter = {
            y: i,
            x: j
          }
        } else if (this._field[i][j] === hole) {
          parametersLocations.holeCharacter.push({
            y: i,
            x: j
          })
        }
      }};
      return parametersLocations;
  }
  
  userInput() {
    let move = prompt('Which way? ');
    return move;
  }

  pathMovement() {
    const currentMove = this.userInput();
    if (currentMove === 'r') {
      this.pathLocation.x += 1;
    } else if (currentMove === 'l') {
      this.pathLocation.x -= 1;
    } else if (currentMove === 'u') {
      this.pathLocation.y -= 1;
    } else if (currentMove === 'd') {
      this.pathLocation.y += 1;
    };
    return this.pathLocation;
  }

  checkWin(newPath, currentLocations) {
    const hatLocation = currentLocations.hatCharacter;
    let winInd = 0;
    if ((newPath.y === hatLocation.y) && (newPath.x === hatLocation.x)) {
      winInd = 1;
    }

    if (winInd === 1) {
        console.log('You WON!')
    }
    game = false;
    return winInd;
  }

  checkLoss(newPath, currentLocations) {
    const holeLocation = currentLocations.holeCharacter;
    let lossInd = 0;
    for (let i = 0; i < holeLocation.length; i++) {
      if ((newPath.y === holeLocation[i].y) && (newPath.x === holeLocation[i].x)) {
        lossInd = 1;
      }
    }

    if (lossInd === 1) {
        console.log('You Lost!')
    }
    game = false;
    return lossInd;
  }

  checkBoundries(newPath) {
    const horizontalLength = this._field[0].length;
    const verticalLength = this._field.length;
    let boundriesInd = 0;
    if (newPath.y < 0 || newPath.x < 0) {
        boundriesInd = 1;
    } else if (newPath.y === verticalLength || newPath.x === horizontalLength) {
        boundriesInd = 1;
    }

    if (boundriesInd === 1) {
        console.log('You are outside of boundries!')
    }
    game = false;
    return boundriesInd;
  }

  updateField() {
    let currentLocations = this.locations();
    const newPath = this.pathMovement();
    const winIndicator = this.checkWin(newPath, currentLocations);
    const lossIndicator = this.checkLoss(newPath, currentLocations);
    const boundriesIndicator = this.checkBoundries(newPath);
    if (winIndicator === 0 && lossIndicator === 0 && boundriesIndicator === 0) {
      let currentField = this._field;
      currentField[newPath.y][newPath.x] = pathCharacter;
      this._field = currentField;
      game = true;
    }
  }

  static generateField(height, width, percentage) {
    const holeCount = Math.floor(height * width * percentage);

    let randomField = [];
    for (let i = 0; i < height; i++) {
        let row = [];
        for (let j = 0; j < width; j++) {
            row.push(fieldCharacter);
        }
        randomField.push(row);
    };

    const yAxis = () => {
          return Math.floor(Math.random() * height);
    };
    const xAxis = () => {
          return Math.floor(Math.random() * width);
    };

    randomField[yAxis()][xAxis()] = pathCharacter;

    const createLocation = () => {
        let locY;
        let locX;
        do {
            locY = yAxis();
            locX = xAxis();
        } while (randomField[locY][locX] !== fieldCharacter);
        return {locY, locX};
    }

    const {locY, locX} = createLocation();
    randomField[locY][locX] = hat;

    for (let i = 0; i < holeCount; i++) {
        const {locY, locX} = createLocation();
        randomField[locY][locX] = hole;
    }
    return randomField;
  }

}

const randomField = new Field(Field.generateField(10, 10, 0.3));

//Playing the game-
while (game) {
    console.log(randomField.print());
    console.log(randomField.updateField());
};
