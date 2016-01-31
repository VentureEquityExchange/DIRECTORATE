import React, { Component } from 'react';
import Promise from 'bluebird';
import DirectorateApp from '../DirectorateApp';
import TextField from 'material-ui/lib/text-field';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';

import * as Account from '../../utilities/Account/index';
import SelectAccount from './SelectAccount';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import Divider from 'material-ui/lib/divider';
import ImportIcon from 'material-ui/lib/svg-icons/social/share';


const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const customContentStyle = {
  marginTop:'1%',
  width:'100%'
}

class ImportAccountComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open : false,
      account : {
        alias : undefined,
        password : undefined,
        address : undefined,
        set : false
      }
    }
  }

  componentDidMount(){
    let { dispatch } = this.props;
    setTimeout(() => {
        dispatch(Actions.LIST_ACCOUNTS());
    }, 1500);

  }


  setAccountAlias = (event) => {
    let alias = event.target.value;
    this.state.account.alias = alias;
  }

  setAccountPassword = (event) => {
    let password = event.target.value;
    this.state.account.password = password;
  }

  importAccount = () => {
    let { dispatch } = this.props;
    let { account } = this.state;

    console.log(account);

    dispatch(Actions.IMPORT_ACCOUNT(account));
    this.setState({open : !this.state.open});
  }

  onClick = (data) => {
    let { dispatch } = this.props;
    let { account } = data;


    if(!data){
      this.state.account.set = false;
      dispatch(Actions.IMPORT_ACCOUNT_SELECTED(this.state.account));
    } else {
      this.state.account.address = account;
      this.state.account.set = null;
      dispatch(Actions.IMPORT_ACCOUNT_SELECTED(this.state.account));
    }
  }

  openModal = () => {
    this.setState({open : !this.state.open});
  }




  render() {
    // let { dispatch } = this.props;
    let { open } = this.state;
    let { AllAccounts } = this.props.Accounts;
    let { Account } = this.props.Account;
    let { set } = Account;


    switch(set){

      case null:
        return (
          <Dialog
            title="Set Account Details"
            modal={false}
            open={!set}
            autoScrollBodyContent={true}
          >
            <TextField
              hintText="Enter Account Title"
              defaultValue=""
              type="text"
              onChange={this.setAccountAlias.bind(this)} />
            <TextField
              hintText="Enter Password"
              defaultValue=""
              type="password"
              onChange={this.setAccountPassword.bind(this)} />
            <RaisedButton
                key={"Import Account"}
                label="Import Account"
                secondary={true}
                style={customContentStyle}
                onClick={this.importAccount} />
            <RaisedButton
                key={"Cancel"}
                label="Cancel"
                style={customContentStyle}
                onClick={this.onClick.bind(this, false)} />
            { this.props.Account.error != undefined ? alert('Invalid Password') : null }
          </Dialog>
        );
      default:
        var accounts = AllAccounts.map((account, i) => {
          return(
            <RaisedButton
                key={i}
                label={account}
                onClick={this.onClick.bind(this, {account})}
                style={customContentStyle} />
          );
        });

        return (
          <div>
          <RaisedButton
              key={"Import Account"}
              label="Import Account"
              secondary={true}
              style={customContentStyle}
              onClick={this.openModal} />
          <Dialog
            title="Import Account"
            modal={false}
            open={open}
            autoScrollBodyContent={true}
          >
              {accounts}
              <RaisedButton
                  key={"Cancel"}
                  label="Cancel"
                  style={customContentStyle}
                  onClick={this.openModal} />
          </Dialog>
          </div>
        );
    }

  }
}

const mapStateToProps = (state) => {
  return {
    Accounts : state.Accounts,
    Account : state.Account,
  }
}


const ImportAccount = connect(mapStateToProps)(ImportAccountComponent);

export default ImportAccount;
