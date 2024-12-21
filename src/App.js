import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Header';
import DatabaseConnections from './components/DatabaseConnections';
import MigrationJobs from './components/MigrationJobs';
import StoredProcedures from './components/StoredProcedures';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={DatabaseConnections} />
          <Route path="/migrations" component={MigrationJobs} />
          <Route path="/stored-procedures" component={StoredProcedures} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;

