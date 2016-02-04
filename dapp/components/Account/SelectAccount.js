import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import { Wallet, NewAccount, ImportAccount } from '../index';
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
    dispatch(Actions.SET_VENTURES());
  }

  render(){
    let { Accounts } = this.props.Accounts;
    let { Account } = this.props.Account;
    let showDialog = true;

    if(Account.set == true){
      showDialog = false;
    }


    var accounts = Accounts.map((account, i) => {
      return(
        <RaisedButton
          key={i}
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
    Accounts : state.Accounts,
    Account : state.Account
  }
}

const SelectAccount = connect(mapStateToProps)(SelectAccountComponent);

export default SelectAccount;
