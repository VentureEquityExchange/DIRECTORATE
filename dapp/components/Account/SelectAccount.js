import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {listAccounts} from '../../ethereum/index';
import Promise from 'bluebird';
import RaisedButton from 'material-ui/lib/raised-button';
import DirectorateApp from '../DirectorateApp';
import { Wallet, NewAccount, ImportAccount } from '../index';
import ReactGridLayout from 'react-grid-layout';
import Dialog from 'material-ui/lib/dialog';
import * as Account from '../../utilities/Account/index';
import * as Actions from '../../actions/index';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import DefaultTheme from '../Themes/default';
import { connect } from 'react-redux';

const customContentStyle = {
  marginTop:'1%',
  width:'100%'
}


@ThemeDecorator(ThemeManager.getMuiTheme(DefaultTheme))

class SelectAccountComponent extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount(){
    let { dispatch, Accounts } = this.props;
    console.log(Accounts);
    dispatch(Actions._ACCOUNTS());

  }

  onClick = (account) => {
    let { dispatch } = this.props;
    dispatch(Actions.SET_ACCOUNT(account));
  }

  render(){
    let { Account } = this.props.Account;

    let showDialog = true;
    console.log(this.props);
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
