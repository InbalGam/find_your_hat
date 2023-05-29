#Find your hat

**This is an interactive terminal game. The scenario is that the player has lost their hat in a field full of holes, and they must navigate back to it without falling down one of the holes or stepping outside of the field.**

The project is centered on a *Field class*. 
The Field constructor should take a two-dimensional array representing the “field” itself. A field consists of a grid containing “holes” (O) and one “hat” (^). And a neutral background character (░) to indicate the rest of the field itself. The player will begin in the upper-left of the field, and the player’s path is represented by *.

The Field class methods-
- findPath() to get the current location of the user.
- Print() method that prints the current state of the field.
- Methods to test whether the current location results in win (user is on the hat) or a loss (user is on a hole or out-of-bounds)- checkWin() + checkLoss() + checkBoundries().
- locations() method to get the locations of the hat and holes.
- userInput() method to get the direction the user wants to move next.
- pathMovement() how to advance the user according to he's input.
- updateField() method to get the user input, check if he can advance and act on it.
- generateField() this is a static method that creates a randomized field based on the height, width, and percantage of holes.
