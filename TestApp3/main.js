import { createStore, combineReducers } from 'redux';
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';



const todo = (state, action) => {
  // state == individual todo passed in from todos

  switch(action.type){
    case 'ADD_TODO':
      return {
        id: action.id,
        text:action.text,
        completed : false
      }
    case 'TOGGLE_TODO':
      if(state.id !== action.id){
        return state;
      }

      return {
        ...state,
        completed : !state.completed
      }
    default:
      return state;
  }
}


const todos = (state = [], action) => {
  switch(action.type){
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch(action.type){
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

let store = createStore(todoApp);

let nextTodoId = 0;

class TodoApp extends Component {
  render() {
    return (
      <div>
        <input ref={node => {
          this.todoText = node;
        }} />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.todoText.value,
            id: nextTodoId++
          });
          this.todoText = '';
        }}>
          Add Todo
        </button>
        <ul>
          {this.props.todos.map(todo =>
            <li key={todo.id} onClick={() => {
              store.dispatch({
                type: 'TOGGLE_TODO',
                id: todo.id
              })
            }} style={{
              textDecoration :
                todo.completed ? 'line-through' : 'none'
            }}>
              {todo.text}
            </li>
          )}
        </ul>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render((
    <TodoApp todos={store.getState().todos} />), document.getElementById('DirectorateApp'));
}


store.subscribe(render);
render();

// const todoApp = (state = {}, action) => {
//   return {
//     todos : todos(state.todos, action),
//     visibilityFilter : visibilityFilter(state.visibilityFilter, action)
//   }
// }

// const TodoApp =

// const testAddTodo = () => {
//   const stateBefore = [];
//
//   const action = {
//     type : 'ADD_TODO',
//     id: 0,
//     text: 'Learning Redux'
//   };
//
//   const stateAfter = [
//     {
//       id: 0,
//       text: 'Learning Redux',
//       completed: false
//     }
//   ];
//
//   deepFreeze(stateBefore);
//   deepFreeze(action);
//
//   expect(
//     todos(stateBefore, action)
//   ).toEqual(stateAfter);
// }
//
// const testToggleTodo = () => {
//   const stateBefore = [
//     {
//       id: 0,
//       text: 'Learning Redux',
//       completed : false
//     },
//     {
//       id: 1,
//       text: 'Apply to ReactApp',
//       completed: false
//     }
//   ];
//
//   const action = {
//     type: 'TOGGLE_TODO',
//     id: 1,
//   };
//
//   const stateAfter = [
//     {
//       id: 0,
//       text: 'Learning Redux',
//       completed : false
//     },
//     {
//       id: 1,
//       text: 'Apply to ReactApp',
//       completed: true
//     }
//   ];
//
//   deepFreeze(stateBefore);
//   deepFreeze(action);
//
//   expect(
//     todos(stateBefore, action)
//   ).toEqual(stateAfter);
// }
//
// testToggleTodo();


//
// console.log('Initial State');
// console.log(store.getState());
// console.log('-------------');
//
// console.log('Dispatching new State');
// store.dispatch({
//   type: 'ADD_TODO',
//   id: 0,
//   text: 'Learning Redux'
// });
// console.log('Getting New State');
// console.log(store.getState());
// console.log('-------------');
// console.log('SET_VISIBILITY_FILTER');
// store.dispatch({
//   type: 'SET_VISIBILITY_FILTER',
//   filter: 'SHOW_COMPLETED'
// });
// console.log('Getting New State');
// console.log(store.getState());
// console.log('-------------');

// const toggleTodo = (todo) => {
//   return {
//     ...todo,
//     completed: !todo.completed
//   }
// }
//
// const testToggleTodo = () => {
//   const todoBefore = {
//     id: 0,
//     text: 'Learning Redux',
//     completed : false
//   };
//
//   const todoAfter = {
//     id: 0,
//     text: 'Learning Redux',
//     completed : true
//   };
//
//   deepFreeze(todoBefore);
//
//   console.log(toggleTodo(todoBefore));
//
//   expect(
//     toggleTodo(todoBefore)
//   ).toEqual(todoAfter);
// }
//
// testToggleTodo();





// const addCounter = (list) => {
//   return [...list, 0]; // same as list.concat([0]);
// }
//
// const removeCounter = (list, index) => {
//   return [
//     ...list.slice(0, index),
//     ...list.slice(index + 1)
//   ];
// }
//
// const incrementCounter = (list, index) => {
//   return [
//     ...list.slice(0, index),
//     list[index] + 1,
//     ...list.slice(index + 1)
//   ];
// }
//
// const testRemoveCounter = () => {
//   const listBefore = [0, 10, 20];
//   const listAfter = [0, 20];
//
//   deepFreeze(listBefore);
//
//   expect(
//     removeCounter(listBefore, 1)
//   ).toEqual(listAfter);
// }
//
//
// const testAddCounter = () => {
//   const listBefore = [];
//   const listAfter = [0];
//
//   deepFreeze(listBefore);
//
//   expect(
//     addCounter(listBefore)
//   ).toEqual(listAfter);
// }
//
// const testIncrementCounter = () => {
//   const listBefore = [0, 10, 20];
//   const listAfter = [0, 11, 20];
//
//   deepFreeze(listBefore);
//
//   expect(
//     incrementCounter(listBefore, 1)
//   ).toEqual(listAfter);
// }
//
// testIncrementCounter();
