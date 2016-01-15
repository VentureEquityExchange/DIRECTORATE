import React from 'react';
import ReactDOM from 'react-dom';
import {listAccounts} from '../../ethereum/index';
import Promise from 'bluebird';
import RaisedButton from 'material-ui/lib/raised-button';
import DirectorateApp from '../DirectorateApp';
import Wallet from './Wallet';
import ReactGridLayout from 'react-grid-layout';

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

  getAccounts(){
    if(this.state.accounts.length == 0){
      listAccounts().then((accounts) => {
        console.log(accounts);
        this.setState({accounts : accounts});
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  onClick(account){
    this.setState({selectedAccount : account});
  }

  render(){
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
      return (<DirectorateApp account={this.state.selectedAccount} view="wallet"/>);
    }

  }
}
