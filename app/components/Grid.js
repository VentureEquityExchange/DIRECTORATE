import React from 'react';
import {Responsive} from 'react-grid-layout';

console.log(Responsive);


export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layout : [{x : 0, y: 0, w: 2, h: 2}, {x : 4, y: 0, w: 2, h: 3}]
    }
  }

  render() {
    return(
      <Responsive className="layout" layout={this.state.layout} breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
        <div key={1} _grid={{x: 0, y: 0, w: 1, h: 2}}>1</div>
        <div key={2} _grid={{x: 1, y: 0, w: 1, h: 2}}>2</div>
      </Responsive>
    );
  }

}
