import * as React from 'react';

interface ITodo {
  title: string
}

interface TodosProps {
  todos?: Array<ITodo>
}

export const TodoList: React.SFC<TodosProps> = ({todos}) => 
  <div>
    <ul>
      {todos && todos.map((todo, index)=>
        <li key={index}>{todo.title}</li>
      )}
    </ul>
  </div>