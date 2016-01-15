import React from 'react';
import {listAccounts} from '../../ethereum/index';
import Promise from 'bluebird';
import RaisedButton from 'material-ui/lib/raised-button';
import DirectorateApp from '../DirectorateApp';
import Wallet from './Wallet';

const customContentStyle = {
  marginTop:'1%'
}

export default class SelectAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts : [],
      selectedAccount : null
    }
  }

  getAccounts = () => {
    if(this.state.accounts.length == 0){
      listAccounts().then((accounts) => {
        console.log(accounts);
        this.setState({accounts : accounts});
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  onClick = (account) => {
    console.log(account);
    this.setState({selectedAccount : account});
  }

  render = () => {
    if(this.state.selectedAccount == null){
        this.getAccounts()
        var accounts = this.state.accounts.map((account) => {
          return(
            <RaisedButton
            key={account}
            label={account}
            style={customContentStyle}
            onClick={this.onClick.bind(this, account)} />
          );
        })
        return (<div>{accounts}</div>);
    } else {
      return (<Wallet account={this.state.selectedAccount} />);
    }

  }
}
