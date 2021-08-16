import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CreateProperty from './pages/CreateProperty';
import PropertyListComponent from './pages/PropertyList';

const App: React.FC = () => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql',
  });

  return (
    <BrowserRouter forceRefresh>
      <ApolloProvider client={client}>
        <div className="App bg-light d-flex flex-column">
          <nav className="navbar bg-white">
            <div className="container-fluid justify-content-center">
              <span className="navbar-text">
                Create a rental property
              </span>
            </div>
          </nav>
          <div className="container flex-grow-1 d-flex flex-columnn">
            <Switch>
              <Route path="/" exact component={PropertyListComponent} />
              <Route path="/new" exact component={CreateProperty} />
            </Switch>
          </div>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
