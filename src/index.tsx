import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './containers/root';
import configureStore from './store/configure';

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById('root'));