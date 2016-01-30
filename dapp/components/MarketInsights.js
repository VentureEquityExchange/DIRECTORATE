import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';


class MarketInsightComponent extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log('Make Calls to Twitter and Medium');
  }

  render(){
    return (
      <div>Market Insights Component, integration with Medium and Twitter. </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    MarketInsights : state.MarketInsights
  }
}

const MarketInsight = connect(mapStateToProps)(MarketInsightComponent);

export default MarketInsight;
