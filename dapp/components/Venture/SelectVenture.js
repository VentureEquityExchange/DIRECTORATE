import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

const customContentStyle = {
  marginTop:'1%',
  width:'100%'
}


class SelectVentureComponent extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    // make a call to DirectorIndex Contract here
  }

  render(){
    let { set, address } = this.props.Account.Account;
    let ventures = [];
    return (
      <Card initiallyExpanded={true}>
        <CardHeader
          title="Select Venture"
          subtitle={`Your address is ${address}`}
        />
        <CardActions expandable={true}>
          {ventures}
          <RaisedButton secondary={true} label="New Venture" style={customContentStyle}/>
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Account : state.SetAccount,
    Venture : state.Venture
  }
}

const SelectVenture = connect(mapStateToProps)(SelectVentureComponent);

export default SelectVenture;
