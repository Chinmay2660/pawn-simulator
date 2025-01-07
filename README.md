# Pawn Simulator

**Pawn Simulator** is a React based web application that simulates the movement of a pawn on an 8x8 chessboard according to a sequence of commands.

## Features

- **PLACE Command**:  
  Places the pawn on the board at a specified row, column, direction (NORTH, SOUTH, EAST, WEST), and color (WHITE or BLACK).  

- **MOVE Command**:  
  Moves the pawn one or two steps forward in the direction it is currently facing, as long as the move keeps it within the board boundaries.

- **LEFT / RIGHT Commands**:  
  Rotates the pawn 90 degrees to the left or right without changing its position.

- **REPORT Command**:  
  Outputs the current position, direction, and color of the pawn.

- **Reset**:  
  Resets the pawn’s position and clears the command log.

## Commands

1. **PLACE X,Y,DIRECTION,COLOR**  
   Places the pawn at the specified position with the given direction and color.
   - Example: `PLACE 0,0,NORTH,WHITE`
   
2. **MOVE N**  
   Moves the pawn `N` steps forward in the direction it is currently facing.  
   - Example: `MOVE 1`

3. **LEFT**  
   Rotates the pawn 90 degrees to the left.

4. **RIGHT**  
   Rotates the pawn 90 degrees to the right.

5. **REPORT**  
   Displays the current position, direction, and color of the pawn.
   - Example: `PLACE 1,0,NORTH,WHITE`

6. **RESET**  
   Clears the board and resets the pawn’s state.

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Chinmay2660/pawn-simulator.git
   cd pawn-simulator

2. Install dependencies:
   ```bash
   npm i

3. Start developement server:
   ```bash
   npm run dev

4. Open the application in your browser at http://localhost:5173.

### Usage

1. Enter the desired row, column, direction, and color in the input fields, then click the Place button.

2. Use the Move, Left, Right, and Report buttons to control and query the pawn.
3. Use the Reset button to clear the current position and commands and start over.