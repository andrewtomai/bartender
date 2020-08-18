import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/core/styles';
import DayJsUtils from '@date-io/dayjs';
import configureStore from './store'
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import theme from './theme'

const store = configureStore()


const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DayJsUtils}>
            <App/>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
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


