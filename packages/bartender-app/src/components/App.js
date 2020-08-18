import React from 'react';
import { Route, Switch } from 'react-router' // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router'

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import { history } from '../store'

import CreateRoom from './Room/CreateRoom'
import Room from './Room/Room';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
  content: {
    margin: theme.spacing(2)
  }
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Bartender
            </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */}
          <> { /* your usual react-router v4/v5 routing */}
            <Switch>
              <Route exact path="/" render={() => (<CreateRoom />)} />
              <Route render={() => (<Room />)} />
            </Switch>
          </>
        </ConnectedRouter>
      </div>
    </div>
  );
}

export default App;
