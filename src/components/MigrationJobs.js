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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

function MigrationJobs() {
  const [jobs, setJobs] = useState([]);
  const [connections, setConnections] = useState([]);
  const [open, setOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    source: '',
    destination: '',
  });

  useEffect(() => {
    fetchJobs();
    fetchConnections();
  }, []);

  const fetchJobs = async () => {
    const response = await axios.get('/api/migrations/');
    setJobs(response.data);
  };

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
    setNewJob({
      ...newJob,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/migrations/', newJob);
      fetchJobs();
      handleClose();
    } catch (error) {
      console.error('Error creating migration job:', error);
    }
  };

  const startMigration = async (jobId) => {
    try {
      await axios.post(`/api/migrations/${jobId}/start_migration/`);
      fetchJobs();
    } catch (error) {
      console.error('Error starting migration:', error);
    }
  };

  return (
    <div>
      <h2>Migration Jobs</h2>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create New Migration Job
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Source</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.source.name}</TableCell>
                <TableCell>{job.destination.name}</TableCell>
                <TableCell>{job.status}</TableCell>
                <TableCell>
                  {job.status === 'pending' && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => startMigration(job.id)}
                    >
                      Start Migration
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Migration Job</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Source Connection</InputLabel>
            <Select
              name="source"
              value={newJob.source}
              onChange={handleChange}
            >
              {connections.map((conn) => (
                <MenuItem key={conn.id} value={conn.id}>
                  {conn.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Destination Connection</InputLabel>
            <Select
              name="destination"
              value={newJob.destination}
              onChange={handleChange}
            >
              {connections.map((conn) => (
                <MenuItem key={conn.id} value={conn.id}>
                  {conn.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MigrationJobs;

