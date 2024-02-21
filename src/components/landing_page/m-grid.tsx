import React, { useState, useEffect } from "react";

const RandomToggleGrid: React.FC = () => {
  const [grid, setGrid] = useState<boolean[][]>(createInitialGrid());

  useEffect(() => {
    const toggleRandomCell = () => {
      const newGrid = grid.map(
        (row) => row.map(() => Math.random() > 0.6), 
      );
      setGrid(newGrid);
    };

    const intervalId = setInterval(toggleRandomCell, 2000);

    return () => clearInterval(intervalId);
  }, [grid]);

  return (
    <div className="flex flex-col">
    {grid.map((row, rowIndex) => (
      <div key={rowIndex} className="flex">
        {row.map((isVisible, columnIndex) => (
          <div
            key={columnIndex}
            className={`flex items-center justify-center  border-black px-2`}
          >
            <span className="text-xl ">{isVisible ? 'M' : ''}</span>
          </div>
        ))}
      </div>
    ))}
  </div>
  );
};

const createInitialGrid = (): boolean[][] => {
    // Initialize a 12x12 grid with all cells initially visible
    return Array.from({ length: 14 }, () => Array.from({ length: 25 }, () => true));
  };

export default RandomToggleGrid;
