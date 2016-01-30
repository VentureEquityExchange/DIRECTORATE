import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import { Wallet, NewAccount, ImportAccount } from '../index';
import Dialog from 'material-ui/lib/dialog';
import * as Account from '../../utilities/Account/index';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';

const customContentStyle = {
  marginTop:'1%',
  width:'100%'
}


class SelectAccountComponent extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount(){
    let { dispatch, Accounts } = this.props;
    dispatch(Actions.GET_ACCOUNTS());

  }

  onClick = (account) => {
    let { dispatch } = this.props;
    dispatch(Actions.SET_ACCOUNT(account));
  }

  render(){
    let { Account } = this.props.Account;

    let showDialog = true;

    if(this.props.Account.Account.set != null || this.props.AccountCreated.Account.set != null || this.props.SetAccount.Account.set != null){
      showDialog = false;
    }


    var accounts = this.props.Accounts.map((account) => {
      return(
        <RaisedButton
          key={account.address}
          label={account.alias}
          style={customContentStyle}
          onClick={this.onClick.bind(this, account)} />
      );
    });



    return (
      <Dialog
        title="Select Account"
        modal={true}
        open={showDialog}
        autoScrollBodyContent={true}
      >
      {accounts}
      <NewAccount />
      <ImportAccount />
      </Dialog>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    Accounts : state.Accounts.Accounts,
    Account : state.ImportAccount,
    AccountCreated : state.CreateAccount,
    SetAccount : state.SetAccount
  }
}

const SelectAccount = connect(mapStateToProps)(SelectAccountComponent);

export default SelectAccount;
