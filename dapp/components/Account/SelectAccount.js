import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {listAccounts} from '../../ethereum/index';
import Promise from 'bluebird';
import RaisedButton from 'material-ui/lib/raised-button';
import DirectorateApp from '../DirectorateApp';
import Wallet from './Wallet';
import ReactGridLayout from 'react-grid-layout';
import Dialog from 'material-ui/lib/dialog';
import NewAccount from './NewAccount';
import * as Account from '../../utilities/Account/index';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import DefaultTheme from '../Themes/default';


const customContentStyle = {
  marginTop:'1%',
  width:'100%'
}


@ThemeDecorator(ThemeManager.getMuiTheme(DefaultTheme))

export default class SelectAccount extends Component {
  constructor(props) {
    super(props);
    this.state.accounts = this.props.accounts;
    this.state.account = this.props.account;
  }


  onClick(account){
    console.log(account);
    this.setState({account : account, view:'Grid'});
  }

  render(){

    var accounts = this.state.accounts.map((account) => {
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
        open={true}
      >
      {accounts}

      </Dialog>
    );
  }
}
