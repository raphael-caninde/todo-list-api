import React, { useState } from 'react';
import { ListTasks } from '../ListTasks';

export function FormTodoList() {
  const [text, setText] = useState('');

  return (
    <div>
      <div>
        <input
          id="todo-input"
          type="text"
          name="todo-input"
          value={ text }
          onChange={ ({ target }) => setText(target.value) }
        />
        <button
          type="button"
          //onClick={}
        >
          ADICIONAR
        </button>
      </div>
      <ListTasks />
    </div>
  );
}
