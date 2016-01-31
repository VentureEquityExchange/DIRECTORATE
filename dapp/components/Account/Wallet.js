import React, { Component } from 'react';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import Snackbar from 'material-ui/lib/snackbar';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import { connect } from 'react-redux';
import * as Actions from '../../actions/index';
import TextField from 'material-ui/lib/text-field';


const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

// @ThemeDecorator(ThemeManager.getMuiTheme(DefaultTheme))

class WalletComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      txhashNotification : true,
      expand : false,
      toggleTransaction : false,
      getTransactionDialog : false,
      sendToAddress : undefined,
      sendAmount : 0
    }
  }

  componentDidMount(){
    let { dispatch } = this.props;
    let { Account } = this.props.Account;
    let { address } = Account;
    setTimeout(() => {
        dispatch(Actions.GET_BALANCE(address));
    }, 1500);

  }


  expandCard = () => {
    let { expand } = this.state;
    this.setState({expand : !expand, sendToAddress : undefined, sendAmount : 0});
  }

  // toggleTransaction = () => {
  //     let { toggleTransaction } = this.state;
  //     this.setState({toggleTransaction: !toggleTransaction});
  // }

  sendToAddress = (event) => {
    this.state.sendToAddress = event.target.value;
  }

  sendAmount = (event) => {
    this.state.sendAmount = event.target.value;
  }

  sendTransaction = (address) => {
    let { dispatch } = this.props;
    let { Account } = this.props.Account;
    let { sendToAddress, sendAmount } = this.state;

    console.log(sendToAddress);
    console.log(sendAmount);
    console.log('Making Call to Ethereum node to send transaction.');

    if(sendAmount <= 0){
      alert(`Please enter a positive number. Cannot send ${sendAmount} value.`)
    } else {
      dispatch(Actions.SEND_TRANSACTION(Account, sendToAddress, sendAmount));
      this.expandCard();
    }

  }

  closeSnackBar = () => {
      this.setState({txhashNotification : false});
  }

  render() {
    let { expand, txhashNotification } = this.state;
    let { Account } = this.props.Account;
    let { Balance } = this.props.Balance;
    let { toggleTransaction } = this.state;
    let { Transactions } = this.props;
    let { txhash, Transaction, error } = Transactions;

    // console.log(this.props);

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
            {
              !expand ? null : <div>
                <CardText >
                  <strong>Balance: {Balance == null ? 'loading...' : Balance + " Ξther" } </strong>
                </CardText>
                <CardText>
                  <TextField
                    hintText={`${Account.address}`}
                    defaultValue=""
                    type="text"
                    onChange={this.sendToAddress.bind(this)}
                    style={{width:'100%', marginTop:'1%'}} />
                    Send To Address
                  <TextField
                    hintText={"Amount (Ξther)"}
                    defaultValue={0}
                    type="number"
                    onChange={this.sendAmount.bind(this)}
                    style={{width:'100%', marginTop:'1%'}} />
                    Send Amount (Ξther)
                  <br/>

                  <RaisedButton
                      label="Send Transaction"
                      secondary={true}
                      style={{width:'100%', marginTop:'1%'}}
                      onClick={this.sendTransaction.bind(this)} />
                  <RaisedButton
                      label="Cancel"
                      primary={true}
                      style={{width:'100%', marginTop:'1%'}}
                      onClick={this.expandCard} />
                </CardText>
              </div>
            }
          </Card>

        );
      case false:
        // console.log('close');
        return (
          <Card initiallyExpanded={expand} expand={expand}>
            <CardHeader
              title="Account Wallet"
              subtitle={`${Account.address} | ${Balance} Ξther`}
              actAsExpander={true}
              showExpandableButton={false}
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
    Account : state.SetAccount,
    Balance : state.AccountBalance,
    Transactions : state.Transactions
  }
}

const Wallet = connect(mapStateToProps)(WalletComponent);

export default Wallet;
