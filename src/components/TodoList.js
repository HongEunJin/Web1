import React, {useEffect, useState} from 'react';
import CreateTask from '../modals/CreateTask'
import Card from './Card';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])
    
    useEffect(() => {
        let arr = localStorage.getItem("taskList")
       
        if(arr){
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])

    const toggleComplete = (index) => {
        let tempList = [...taskList];
        tempList[index].isCompleted = !tempList[index].isCompleted;
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = [...taskList, {...taskObj, isCompleted: false}];
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        setModal(false);
    };

    return (
        <>
            <div className="header">
                <h3>Todo List</h3>
                <button className="create-task-btn" onClick={() => setModal(true)}>Create Task</button>
            </div>
            <div className = "task-container">
            {taskList && taskList.map((obj , index) => <Card  key = {index} taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray} toggleComplete = {toggleComplete}/> )}
            </div>
            <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
        </>
    );
};

export default TodoList;