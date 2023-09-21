import React from "react";
import "./App.scss";

function isAdjacent(a: number, b: number): boolean {
  if (a === b || b < 0) return false;
  if (a - 2 == b) return true;
  if (a + 2 == b) return true;
  if (a - 34 == b) return true;
  if (a + 34 == b) return true;
  return false;
}
const playerSquares = 9;

function toGridCellCount(squares: number) {
  return squares * 2 - 1;
}

const cells = toGridCellCount(playerSquares);

function toGridCell(square: number) {
  const row = Math.floor(square / playerSquares);
  return square * 2 - row + row * toGridCellCount(playerSquares);
}
const cellRows = toGridCellCount(playerSquares);
const cellColumns = toGridCellCount(playerSquares);

function getColor(playerPositions: number[], cell: number) {
  const player = playerPositions.findIndex((playerSquare) => {
    return cell === toGridCell(playerSquare);
  });
  if (player === -1) return "";
  return `player-${player}`;
}
// row odd - short height
// column odd - short width
// both = short both

// row = floor(c / 17) % 2 === 1
// column = (c % 17) % 2 === 1

function isOddRow(cell: number) {
  return Math.floor(cell / cells) % 2 === 1;
}

function isOddColumn(cell: number) {
  return Math.floor(cell % cells) % 2 === 1;
}

function App() {
  const [playerPositions, setPlayerPositions] = React.useState([4, 9 * 8 + 4]);

  const [activePlayer, setActivePlayer] = React.useState(0);
  const [selectedSquare, setSelectedSquare] = React.useState(-1);

  const board = Array.from(Array(cellRows * cellColumns).keys());

  const updateValue = React.useCallback(
    (cell: number) => {
      if (selectedSquare === cell) {
        setSelectedSquare(-1);
      } else {
        setSelectedSquare(cell);
      }
    },
    [selectedSquare, playerPositions]
  );

  return (
    <>
      <div
        className='squares-container'
        style={{
          gridTemplateRows: `50px ${"10px 50px ".repeat(8)}`,
          gridTemplateColumns: `50px ${"10px 50px ".repeat(8)}`,
        }}
      >
        {board.map((cell) => (
          <div
            key={cell}
            className={`cell ${getColor(playerPositions, cell)} ${
              isOddRow(cell) ? "short-row" : ""
            } ${isOddColumn(cell) ? "short-column" : ""} ${
              selectedSquare === cell ? "selectedSquare" : ""
            }`}
            onClick={
              !isOddColumn(cell) && !isOddRow(cell)
                ? () => updateValue(cell)
                : undefined
            }
          >
            {isAdjacent(cell, selectedSquare) && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    background: "blue",
                    borderRadius: "50%",
                    width: 20,
                    height: 20,
                  }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
