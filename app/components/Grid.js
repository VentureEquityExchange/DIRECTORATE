import React from 'react';
import {Responsive} from 'react-grid-layout';
import Wallet from './Account/Wallet'
import SideNav from './SideNav';
import SelectAccount from './Account/SelectAccount';
import Paper from 'material-ui/lib/paper';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layout : [{x : 0, y: 0, w: 2, h: 2}, {x : 4, y: 0, w: 2, h: 3}],
      account : this.props.account
    }
  }


  // generateDOM() {
  //   this.state.layout.forEach((position, index) => {
  //     console.log(position);
  //     console.log(index);
  //     return (<div key={index}><span className="text">{position.h}</span><div>)
  //   });
  // }

  render() {
    return (
      <div>
      <SideNav account={this.state.account}/>
      <Responsive className="layout" layout={this.state.layout}
      breakpoints={{lg: 1400, md: 996, sm: 768, xs: 480, xxs: 0}}
      cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
        <div key={1}><Wallet zDepth={5}  /></div>
        <div key={2}><SelectAccount /></div>
        <div key={3}>3</div>
      </Responsive>
      </div>
    );
  }

}
