import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import React, { useState } from "react";
import { nanoid } from "nanoid";

const FILTERS = {
  'All': () => true,
  'Active': task => !task.completed,
  'Completed': task => task.completed
};

const FILTER_NAMES = Object.keys(FILTERS);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  function editTaskName(id, newName) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {...task, name: newName};
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {...task, completed: !task.completed};
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function addTask(name) {
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    setTasks([newTask, ...tasks]);
  }
  
  let taskList = tasks
  .filter(FILTERS[filter])
  .map(task => (
    <Todo id={task.id} name={task.name} completed={task.completed} key={task.id} 
          toggleTaskCompleted={toggleTaskCompleted}
          deleteTask={deleteTask}
          editTaskName={editTaskName}
    />
  ));
  const taskNoun = taskList.length === 1 ? 'task' : 'tasks';
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton name={name} key={name} active={filter === name} setFilter={setFilter}/>
  ));

  return (
    <div className="todo-app">
      <Form addTask={addTask}/>
      <div className="filters btn-group">
        {filterList}
      </div>
      <h3 className='list-heading'>{taskList.length} {taskNoun} remaining</h3>
      <ul className='todo-list' aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
