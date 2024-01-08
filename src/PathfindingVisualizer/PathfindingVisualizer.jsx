

import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';

import './PathfindingVisualizer.css';

const START_NODE_ROW =7;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL = 40;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      startRow: START_NODE_ROW,
      startCol: START_NODE_COL,
      finishRow: FINISH_NODE_ROW,
      finishCol: FINISH_NODE_COL,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const { grid, startRow, startCol, finishRow, finishCol } = this.state;
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  handleStartRowChange = (e) => {
    this.setState({ startRow: parseInt(e.target.value, 10) });
  };

  handleStartColChange = (e) => {
    this.setState({ startCol: parseInt(e.target.value, 10) });
  };

  handleFinishRowChange = (e) => {
    this.setState({ finishRow: parseInt(e.target.value, 10) });
  };

  handleFinishColChange = (e) => {
    this.setState({ finishCol: parseInt(e.target.value, 10) });
  };

  render() {
    const { grid, mouseIsPressed, startRow, startCol, finishRow, finishCol } = this.state;

    return (
      <>
        <div>
          <p>Choose start row, start col and end row, end col </p>
          <div style={{ marginBottom: '10px' }}>
  Start Row: 
  <input 
    type="number" 
    value={startRow} 
    onChange={this.handleStartRowChange} 
    placeholder='0 to 24'
    style={{ marginLeft: '5px', marginRight: '5px', padding: '5px' }}
  />
  
  Start Col: 
  <input 
    type="number" 
    value={startCol} 
    placeholder='0 to 58'
    onChange={this.handleStartColChange} 
    style={{ marginLeft: '5px', marginRight: '5px', padding: '5px' }}
  />

  Finish Row: 
  <input 
    type="number" 
    value={finishRow} 
    placeholder='0 to 24'
    onChange={this.handleFinishRowChange} 
    style={{ marginLeft: '5px', marginRight: '5px', padding: '5px' }}
  />

  Finish Col: 
  <input 
    type="number" 
    value={finishCol} 
    placeholder='0 to 58'
    onChange={this.handleFinishColChange} 
    style={{ marginLeft: '5px', marginRight: '5px', padding: '5px' }}
  />
</div>

        </div>
        <button
          style={{ marginTop: '10px', padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          onClick={() => this.visualizeDijkstra()}
        >
          Visualize Dijkstra's Algorithm
        </button>

        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  // const { row, col, isFinish, isStart, isWall } = node;
                const { row, col, isFinish, isStart, isWall } = node;
                const highlightStart = row === startRow && col === startCol;
                const highlightEnd = row === finishRow && col === finishCol;
                  return (
                    
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                      highlightStart={row === startRow && col === startCol}
                      highlightEnd={row === finishRow && col === finishCol}
                      ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 25; row++) {
    const currentRow = [];
    for (let col = 0; col < 58; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
