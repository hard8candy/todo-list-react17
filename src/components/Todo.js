import React, { useState, useEffect, useRef } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo (props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const editFieldRef = useRef(null);
  const wasEditing = usePrevious(isEditing);

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    } 
  }, [wasEditing, isEditing]);

  function handleEditSubmit(e) {
    e.preventDefault();
    if (newName) {
      props.editTaskName(props.id, newName);
    }
    setNewName('');
    setEditing(false);
  }

  const viewTemplate = (
    <div>
      <div className="checkbox">
        <input type="checkbox" name={props.id} id={props.id} defaultChecked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)}/>
        <label htmlFor={props.id}>{props.name}</label>
      </div>
      <div className="btn-group">
        <button type='button' className="btn" onClick={() => setEditing(!isEditing)}>Edit <span className="visually-hidden">{props.name}</span></button>
        <button type='button' className="btn btn-danger" onClick={() => props.deleteTask(props.id)}>Delete <span className="visually-hidden">{props.name}</span></button>
      </div>
    </div>
  );

  const editingTemplate = (
    <form onSubmit={handleEditSubmit}>
      <div className="form-group">
        <input type="text" name={props.id} id={props.id} className="input" placeholder={props.name} value={newName} onChange={e => setNewName(e.target.value)}
               ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button type='button' className="btn" onClick={() => setEditing(!isEditing)}>Cancel <span className="visually-hidden">renaming {props.name}</span></button>
        <button type='submit' className="btn btn-primary">Save <span className="visually-hidden">new name for {props.name}</span></button>
      </div>
    </form>
  );

  return (
    <li className="todo-item">
      {!isEditing && viewTemplate}
      {isEditing && editingTemplate}
    </li>
  );
}