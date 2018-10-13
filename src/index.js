import React from 'react';
import ReactDOM from 'react-dom';

import World from './World';
import registerServiceWorker from './registerServiceWorker';

import './stylesheets/main.scss';

ReactDOM.render(<World />, document.getElementById('root'));
registerServiceWorker();
