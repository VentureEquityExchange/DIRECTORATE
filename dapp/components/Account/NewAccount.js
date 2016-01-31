import React, { Component } from 'react';
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
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';

@ThemeDecorator(ThemeManager.getMuiTheme(DefaultTheme))

// const NewAccountButtonStyle = {
//   marginTop:'1%',
//   width:'100%'
// }

class NewAccountComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open : false,
      account : {
        alias : undefined,
        password : undefined,
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
    let { dispatch } = this.props;
    let { account } = this.state;
    console.log(account);

    dispatch(Actions.CREATE_ACCOUNT(account));
    this.setState({open : !this.state.open});
  }

  onClick = () => {
    this.setState({open : !this.state.open});
  }

  render() {
    let { dispatch } = this.props;
    let { open } = this.state;
    let { Account } = this.props.Account;

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
        open={open}
      >
          <TextField
            hintText="Enter Account Title"
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
  }
}

const mapStateToProps = (state) => {
  return {
    Account : state.Account
  }
}


const NewAccount = connect(mapStateToProps)(NewAccountComponent);

export default NewAccount;
