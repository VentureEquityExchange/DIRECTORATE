import React from 'react';
import {listAccounts} from '../../ethereum/index';
import Promise from 'bluebird';
import RaisedButton from 'material-ui/lib/raised-button';
import DirectorateApp from '../DirectorateApp';

const customContentStyle = {
  marginTop:'1%'
}

export default class SelectAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts : [],
      accountSelected : false,
      selectedAccount : ""
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

  onClick = () => {
    console.log("Button Clicked");
    // return(<div><DirectorateApp view='wallet' /></div>)
  }

  render = () => {
    this.getAccounts()
    var accounts = this.state.accounts.map((account) => {
      return(
        <RaisedButton
        key={account}
        label={account}
        style={customContentStyle}
        onClick={this.onClick} />
      );
    })
    return (<div>{accounts}</div>)
  }
}
