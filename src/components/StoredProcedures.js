import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  Paper,
} from '@material-ui/core';

function StoredProcedures() {
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState('');
  const [procedureName, setProcedureName] = useState('');
  const [parameters, setParameters] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await axios.get('/api/connections/');
      setConnections(response.data.filter(conn => conn.db_type === 'mysql'));
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  const handleExecute = async () => {
    try {
      const response = await axios.post('/api/stored-procedures/execute/', {
        connection_id: selectedConnection,
        procedure_name: procedureName,
        parameters: parameters.split(',').map(param => param.trim()),
      });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error executing stored procedure:', error);
      setResult(`Error: ${error.response?.data?.error || 'Unknown error occurred'}`);
    }
  };

  return (
    <div>
      <h2>Execute Stored Procedure</h2>
      <FormControl fullWidth>
        <InputLabel>MySQL Connection</InputLabel>
        <Select
          value={selectedConnection}
          onChange={(e) => setSelectedConnection(e.target.value)}
        >
          {connections.map((conn) => (
            <MenuItem key={conn.id} value={conn.id}>
              {conn.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Procedure Name"
        value={procedureName}
        onChange={(e) => setProcedureName(e.target.value)}
      />
      <TextField
        fullWidth
        label="Parameters (comma-separated)"
        value={parameters}
        onChange={(e) => setParameters(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleExecute}>
        Execute
      </Button>
      {result && (
        <Paper style={{ marginTop: '20px', padding: '10px' }}>
          <Typography variant="h6">Result:</Typography>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </Paper>
      )}
    </div>
  );
}

export default StoredProcedures;

