import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Grid from './components/Grid';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Grid />, document.getElementById('gallery-container'));
registerServiceWorker();
