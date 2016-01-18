import React from 'react';
import {newAccount} from '../../ethereum/index';
import Promise from 'bluebird';
import DirectorateApp from '../DirectorateApp';
import TextField from 'material-ui/lib/text-field';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import DefaultTheme from '../Themes/default';
import * as Account from '../../utilities/Account/index';
import SelectAccount from './SelectAccount';

@ThemeDecorator(ThemeManager.getMuiTheme(DefaultTheme))

// const NewAccountButtonStyle = {
//   marginTop:'1%',
//   width:'100%'
// }

export default class NewAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open : false,
      account : {
        alias : undefined,
        address : undefined,
        set : false
      }
    }
  }

  setAccountAlias = (event) => {
    let alias = event.target.value;
    this.state.account.alias = alias;
  }

  setAccountPassword = (event) => {
    let password = event.target.value;
    this.state.account.password = password;
  }

  createAccount = () => {
    let account = {};
    newAccount(this.state.account.password).then((address) => {
       account = {
        alias : this.state.account.alias,
        address : address,
        password : this.state.account.password,
        set : true
      }
      return Account.setAliasStore(JSON.stringify(account));
    }).then(() => {
      console.log('Account Created');
      this.setState({open : false, account : account});
    }).catch((error) => {
      console.log(error);
    });
  }

  onClick = () => {
    this.setState({open : !this.state.open});
  }

  render() {
    if(this.state.account.set == false){
        return (
          <div>
          <RaisedButton
            key={"New Account"}
            label="New Account"
            primary={true}
            style={{width:'100%', marginTop:'1%'}}
            onClick={this.onClick} />

          <Dialog
            title="New Account"
            modal={false}
            open={this.state.open}
          >
              <TextField
                hintText="Enter Account Alias"
                defaultValue=""
                type="text"
                onChange={this.setAccountAlias.bind(this)} />
              <TextField
                hintText="Enter Password"
                defaultValue=""
                type="password"
                onChange={this.setAccountPassword.bind(this)} />
              <RaisedButton
                  key={"Create Account"}
                  label="Create Account"
                  primary={true}
                  style={{width:'100%', marginTop:'1%'}}
                  onClick={this.createAccount.bind(this)} />
              <RaisedButton
                  key={"Cancel"}
                  label="Cancel"
                  style={{width:'100%', marginTop:'1%'}}
                  onClick={this.onClick} />
          </Dialog>
          </div>
        );
    } else {
      return (<SelectAccount account={this.state.account}/>);
    }
  }

}
