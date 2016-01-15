import React from 'react';
import {listAccounts} from '../../ethereum/index';
import Promise from 'bluebird';

export default class SelectAccount extends React.Component {
  constructor(props) {
    super(props);
    this.accounts;
  }

  getAccounts = () => {
    listAccounts().then((accounts) => {
      return accounts;
    }).catch((error) => {
      console.log(error);
    })
  }

  render = () => {
    this.accounts = this.getAccounts();
    console.log(this.accounts);
    return (<p>Accounts List</p>)
  }
}
