import React, {useState} from 'react';
import EditTask from '../modals/EditTask'

const Card = ({taskObj, index, deleteTask, updateListArray, toggleComplete }) => {
    const [modal, setModal] = useState(false);

    const colors = [
        {
            primaryColor : "#5D93E1",
            secondaryColor : "#ECF3FC"
        },
        {
            primaryColor : "#F9D288",
            secondaryColor : "#FEFAF1"
        },
        {
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            primaryColor : "#F48687",
            secondaryColor : "#FDF1F1"
        },
        {
            primaryColor : "#B964F7",
            secondaryColor : "#F3F0FD"
        }
    ]

    const handleToggle = () => setModal(!modal);

    const updateTask = (obj) => {
        updateListArray(obj, index)
    }

    const handleDelete = () => {
        deleteTask(index)
    }

    return (
        <div className="card-wrapper mr-5">
            <div className="card-top" style={{ backgroundColor: colors[index % 5].primaryColor }}></div>
            <div className="task-holder">
                <input
                    type="checkbox"
                    checked={taskObj.isCompleted}
                    onChange={() => toggleComplete(index)}
                    style={{ marginRight: "10px" }}
                />
                <span className="card-header" style={{ backgroundColor: colors[index % 5].secondaryColor, borderRadius: "10px", textDecoration: taskObj.isCompleted ? "line-through" : "none" }}>
                    {taskObj.Name}
                </span>
                <p className="mt-3">{taskObj.Description}</p>

                <div className="buttons-container">
                    <button className="button" onClick={handleToggle}>Edit</button>
                    <button className="button" onClick={handleDelete}>Delete</button>
                </div>
            </div>
            <EditTask modal={modal} toggle={handleToggle} updateTask={updateTask} taskObj={taskObj}/>
        </div>
    );
};

const CreateTask = ({ toggle, modal, save }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');

    const handleChangeName = (e) => {
        setTaskName(e.target.value);
    };

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleSave = () => {
        const taskObj = {
            Name: taskName,
            Description: description,
            isCompleted: false
        };
        save(taskObj);
        // 입력 폼 초기화
        setTaskName('');
        setDescription('');
    };

    return (
        <div>
            {modal && (
                <div>
                    <input 
                        type="text" 
                        placeholder="Task Name" 
                        value={taskName} 
                        onChange={handleChangeName} 
                    />
                    <textarea 
                        placeholder="Description" 
                        value={description} 
                        onChange={handleChangeDescription} 
                    />
                    <button onClick={handleSave}>Create</button>
                    <button onClick={toggle}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Card;