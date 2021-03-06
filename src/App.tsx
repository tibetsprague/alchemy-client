import * as React from "react";
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { default as store, history } from './configureStore';

import * as arcActions from './actions/arcActions';

import AppContainer from "layouts/AppContainer";

export class App extends React.Component<undefined, undefined> {

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route path="/" component={AppContainer}/>
        </ConnectedRouter>
      </Provider>
    );
  }
}