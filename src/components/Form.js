import React, { useState } from "react";

export default function Form (props) {
  const [name, setName] = useState('');

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name) {
      props.addTask(name);
      setName('');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label-lg">What needs to be done?</label>
      </h2>
      <input type="text" id="new-todo-input" name="new-todo-input" className="input input-lg" 
             autoComplete="off" value={name} onChange={handleChange} />
      <button type='submit' className="btn btn-primary btn-lg">Add</button>
    </form>
  );
}