import React from 'react';
import './App.scss'

function isAdjacent(a: number, b: number): boolean {
  throw new Error();
}

function App() {
  const [onePosition, setOnePosition] = React.useState(4);
  const [twoPosition, setTwoPosition] = React.useState(9 * 8 + 4);

  const [activePlayer, setActivePlayer] = React.useState(0);

  const board = Array.from(Array(9 * 9).keys());

  return (
    <>
      <div className='squares-container'>
        {board.map((r) => <div className={`cell ${r === onePosition ? 'one' : r === twoPosition ? 'two' : ''}`}></div>)}
      </div>
    </>
  )
}

export default App
