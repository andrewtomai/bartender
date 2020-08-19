import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store'
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const store = configureStore()


const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
            <App/>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}


if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App', renderApp)
}

renderApp()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


