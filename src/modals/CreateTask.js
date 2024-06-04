import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';

const CreateTaskPopup = ({ modal, toggle, save }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "taskName") {
            setTaskName(value);
        } else {
            setDescription(value);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        let taskObj = {
            Name: taskName,
            Description: description
        };
        save(taskObj);
        setTaskName('');
        setDescription('');
        toggle();
    };

    return (
        <Dialog open={modal} onClose={toggle} PaperProps={{ style: { borderRadius: 12 } }}>
            <DialogTitle>
                <Typography variant="h6">Create Task</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <TextField
                        label="Task Name"
                        variant="outlined"
                        fullWidth
                        value={taskName}
                        onChange={handleChange}
                        name="taskName"
                        margin="dense"
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={handleChange}
                        name="description"
                        margin="dense"
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleSave}>Create</Button>
                <Button variant="outlined" color="secondary" onClick={toggle}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateTaskPopup;
