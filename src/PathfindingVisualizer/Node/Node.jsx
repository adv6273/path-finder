// import React, {Component} from 'react';

// import './Node.css';

// export default class Node extends Component {
//   render() {
//     const {
//       col,
//       isFinish,
//       isStart,
//       isWall,
//       onMouseDown,
//       onMouseEnter,
//       onMouseUp,
//       row,
//     } = this.props;
//     const extraClassName = isFinish
//       ? 'node-finish'
//       : isStart
//       ? 'node-start'
//       : isWall
//       ? 'node-wall'
//       : '';

//     return (
//       <div
//         id={`node-${row}-${col}`}
//         className={`node ${extraClassName}`}
//         onMouseDown={() => onMouseDown(row, col)}
//         onMouseEnter={() => onMouseEnter(row, col)}
//         onMouseUp={() => onMouseUp()}></div>
//     );
//   }
// }

import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
  render() {
    const {
    col,
    isFinish,
    isStart,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    row,
    highlightStart,
    highlightEnd
    } = this.props;

    const extraClassName = isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    : isWall
    ? 'node-wall'
    : '';

    const highlightClassName = highlightStart
  ? 'highlight-start'
  : highlightEnd
  ? 'highlight-end'
  : '';

    return (
    <div
        id={`node-${row}-${col}`}
        // className={`node ${extraClassName}`}
        className={`node ${extraClassName} ${highlightClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></div>
    );
  }
}
