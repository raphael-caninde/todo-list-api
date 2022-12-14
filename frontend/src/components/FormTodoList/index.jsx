import React, { useState } from 'react';
import ListItem from '../ListItem';

function FormTodoList() {
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
          onClick={ () => console.log(text)}
        >
          ADICIONAR
        </button>
      </div>
      <ListItem />
    </div>
  );
}

export default FormTodoList;
