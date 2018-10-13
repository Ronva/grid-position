import React from 'react';
import { withWorld } from 'context/World';

const keyMap = {
  37: 'LEFT',
  38: 'UP',
  39: 'RIGHT',
  40: 'DOWN'
};

class Player extends React.Component {
  state = {
    keys: [],
    position: {
      x: 1,
      y: 1
    }
  };

  player = React.createRef();

  componentDidMount() {
    const { x, y } = this.props.world.playerStartingPosition;
    this.setPlayerPosition(x, y);

    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    const key = e.which || e.keyCode;
    this.setState({ keys: [...this.state.keys, keyMap[key]] });

    clearTimeout(this.keyTimeout);
    this.keyTimeout = setTimeout(() => {
      this.setPlayerPosition();
    }, 50);
  };

  setPlayerPosition = (customX = null, customY = null) => {
    const { width, height, tileSize } = this.props.world;
    const { keys, position: { x, y } } = this.state;

    const shouldMoveLeft = (x > 1) && keys.includes('LEFT');
    const shouldMoveRight = (x <= width - tileSize) && keys.includes('RIGHT');
    const shouldMoveUp = (y > 1) && keys.includes('UP');
    const shouldMoveDown = (y <= height - tileSize) && keys.includes('DOWN');

    const newX = customX || (
      x
      + (shouldMoveLeft ? -tileSize : 0)
      + (shouldMoveRight ? tileSize : 0)
    );
    const newY = customY || (
      y
      + (shouldMoveUp ? -tileSize : 0)
      + (shouldMoveDown ? tileSize : 0)
    );

    const newPos = {
      x: newX !== x ? newX : x,
      y: newY !== y ? newY : y
    };

    this.setState({
      keys: [],
      position: newPos
    });
  };

  getPlayerPosition = () => {
    const { tileSize } = this.props.world;
    const { x, y } = this.state.position;

    return `${y} / ${x} / ${y + tileSize} / ${x + tileSize}`;
  };

  render() {
    const playerProps = {
      className: 'player',
      ref: this.player,
      style: {
        gridArea: this.getPlayerPosition()
      },
    };

    return (
      <div {...playerProps} />
    );
  }
}

export default withWorld(Player);
