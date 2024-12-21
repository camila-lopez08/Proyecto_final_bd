import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel 
} from '@material-ui/core';

function DatabaseConnections() {
  const [connections, setConnections] = useState([]);
  const [open, setOpen] = useState(false);
  const [newConnection, setNewConnection] = useState({
    name: '',
    db_type: '',
    host: '',
    port: '',
    username: '',
    password: '',
    database_name: ''
  });

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    const response = await axios.get('/api/connections/');
    setConnections(response.data);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setNewConnection({
      ...newConnection,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/connections/', newConnection);
      fetchConnections();
      handleClose();
    } catch (error) {
      console.error('Error creating connection:', error);
    }
  };

  return (
    <div>
      <h2>Database Connections</h2>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New Connection
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Host</TableCell>
              <TableCell>Port</TableCell>
              <TableCell>Database</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {connections.map((connection) => (
              <TableRow key={connection.id}>
                <TableCell>{connection.name}</TableCell>
                <TableCell>{connection.db_type}</TableCell>
                <TableCell>{connection.host}</TableCell>
                <TableCell>{connection.port}</TableCell>
                <TableCell>{connection.database_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Connection</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Connection Name"
            type="text"
            fullWidth
            value={newConnection.name}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel>Database Type</InputLabel>
            <Select
              name="db_type"
              value={newConnection.db_type}
              onChange={handleChange}
            >
              <MenuItem value="mysql">MySQL</MenuItem>
              <MenuItem value="mongodb">MongoDB</MenuItem>
              <MenuItem value="cassandra">Cassandra</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="host"
            label="Host"
            type="text"
            fullWidth
            value={newConnection.host}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="port"
            label="Port"
            type="number"
            fullWidth
            value={newConnection.port}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="username"
            label="Username"
            type="text"
            fullWidth
            value={newConnection.username}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={newConnection.password}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="database_name"
            label="Database Name"
            type="text"
            fullWidth
            value={newConnection.database_name}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DatabaseConnections;

