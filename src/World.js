import React from 'react';

import Player from 'characters/Player';

export const WorldContext = React.createContext({
  width: 1,
  height: 1,
  tileSize: 1,
  playerStartingPosition: {
    x: 1,
    y: 1
  }
});

export default class World extends React.Component {
  state = {
    width: 20,
    height: 20,
    tileSize: 2,
    playerStartingPosition: {
      x: 1,
      y: 15
    }
  };

  generateGrid = () => {
    const { width, height } = this.state;

    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${width}, ${width}px)`,
      gridTemplateRows: `repeat(${height}, ${height}px)`,
      width: width * width,
      height: height * height
    }
  };

  render() {
    return (
      <WorldContext.Provider value={this.state}>
        <div className="world" style={this.generateGrid()}>
          <Player />
        </div>
      </WorldContext.Provider>
    );
  }
}

