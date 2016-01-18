import { createStore } from 'redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// counter == reducer; manages state updates... must be pure functions.

const counter = (state = 0, action) => {
  switch(action.type){
    case 'INCREMENT':
      console.log(state);
      return state + 1;
      break;
    case 'DRECEMENT':
      console.log(state);
      return state - 1;
      break;
    default:
      return state;
  }
}

let store = createStore(counter);

class Counter extends Component {
  constructor(props){
    super(props);
    this.props.value;
    this.props.onIncrement;
    this.props.onDecrement;
  }

  render = () => {
    return (
      <div>
        <h1>{this.props.value}</h1>
        <button onClick={this.props.onIncrement}>+</button>
        <button onClick={this.props.onDecrement}>-</button>
      </div>
    )
  }
}

let render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({type : 'INCREMENT'})}
      onDecrement={() => store.dispatch({type : 'DRECEMENT'})}/>,
    document.getElementById('DirectorateApp')
  )
}

const clickIncrement = () => {
  store.dispatch({type: 'INCREMENT'});
}

store.subscribe(render);
render();
