import React from 'react';
import ReactDOM from 'react-dom';
import {listAccounts} from '../../ethereum/index';
import Promise from 'bluebird';
import RaisedButton from 'material-ui/lib/raised-button';
import DirectorateApp from '../DirectorateApp';
import Wallet from './Wallet';
import ReactGridLayout from 'react-grid-layout';
import Dialog from 'material-ui/lib/dialog';
import NewAccount from './NewAccount';

const customContentStyle = {
  marginTop:'1%',
  width:'100%'
}

export default class SelectAccount extends React.Component {
  constructor(props) {
    super(props);
    this.props.format;
    this.state = {
      accounts : [],
      selectedAccount : undefined,
      open : true
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
    console.log(account);
    this.setState({selectedAccount : account});
  }

  render(){
    if(this.state.selectedAccount == undefined){
        this.getAccounts()
        if(this.state.accounts.length != 0){
          var accounts = this.state.accounts.map((account) => {
            return(
              <RaisedButton
                key={account}
                label={account}
                style={customContentStyle}
                onClick={this.onClick.bind(this, account)} />
            );
          })
          return (
            <Dialog
              title="Select Account"
              modal={true}
              open={this.state.open}
            >
            <div>{accounts}</div>
            <NewAccount />
            </Dialog>
          );
        } else {
          return(<NewAccount />);
        }

    } else {
      return (<DirectorateApp view="grid" account={this.state.selectedAccount} />);
    }

  }
}
