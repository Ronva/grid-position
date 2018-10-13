import React from 'react';
import { WorldContext } from '../World';

export const withWorld = Component => props => (
  <WorldContext.Consumer>
    {context => <Component world={context} {...props} />}
  </WorldContext.Consumer>
);
