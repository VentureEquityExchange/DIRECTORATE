import React, { Component } from 'react';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import { connect } from 'react-redux';

const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

class WalletComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      expand : true
    }
  }

  expandCard = () => {
    let { expand } = this.state;
    this.setState({expand : !expand});
  }

  render() {
    let { expand } = this.state;
    let { Account } = this.props.Account;
    
    switch(expand){
      case true:
        return (
          <Card initiallyExpanded={expand}>
            <CardHeader
              title="Account Wallet"
              subtitle={Account.address}
              actAsExpander={true}
              showExpandableButton={true}
              onClick={this.expandCard}
               />
            <CardText expandable={expand}>
              {this.props.balance}
            </CardText>
            <CardActions expandable={expand}>
              <FlatButton label="Action1"/>
              <FlatButton label="Action2"/>
            </CardActions>
            <CardText expandable={expand} >
              {this.props.message}
            </CardText>
          </Card>
        );
      case false:
        console.log('close');
        return (
          <Card initiallyExpanded={expand} expand={expand}>
            <CardHeader
              title="Account Wallet"
              subtitle={Account.address}
              actAsExpander={true}
              showExpandableButton={true}
              onClick={this.expandCard.bind(this)}
               />
          </Card>
        );
    }

  }
}

const mapStateToProps = (state) => {
  return {
    message : `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.`,
    balance : 0,
    Account : state.CreateAccount
  }
}

const Wallet = connect(mapStateToProps)(WalletComponent);

export default Wallet;
