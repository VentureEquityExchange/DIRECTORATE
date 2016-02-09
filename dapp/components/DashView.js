import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';

import { SideNav, Wallet, NavBar, MarketInsights, SelectVenture,  Directors, Voting, Shareholders, Bylaws, DashNav } from './index';


class DashViewComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    let { dispatch } = this.props;

  }

  render(){
    let { view } = this.props.Nav;

    switch(view){
      case 'Bylaws':
        return (<Bylaws />);
      case 'Shareholders':
        return (<Shareholders />);
      case 'Directors':
        return (<Directors />);
      case 'Voting':
        return (<Voting />);
      default:
        return (<div>{view} needs to be created.</div>);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    Nav : state.Navigation
  }
}

const DashView = connect(mapStateToProps)(DashViewComponent);

export default DashView;
