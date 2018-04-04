import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Create from './Create';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Create />, document.getElementById('root'));
registerServiceWorker();
