import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          DB Migration Tool
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Connections
        </Button>
        <Button color="inherit" component={Link} to="/migrations">
          Migrations
        </Button>
        <Button color="inherit" component={Link} to="/stored-procedures">
          Stored Procedures
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

