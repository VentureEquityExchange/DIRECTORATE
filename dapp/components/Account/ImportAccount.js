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
import Divider from 'material-ui/lib/divider';
import ImportIcon from 'material-ui/lib/svg-icons/social/share';


const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const customContentStyle = {
  marginTop:'1%',
  width:'100%'
}

@ThemeDecorator(ThemeManager.getMuiTheme(DefaultTheme))

class ImportAccountComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open : false,
      account : {
        alias : undefined,
        password : undefined,
        address : undefined,
        set : false
      }
    }
  }

  componentDidMount(){
    let { dispatch } = this.props;
    setTimeout(() => {
        dispatch(Actions.LIST_ACCOUNTS());
    }, 3000);

  }


  setAccountAlias = (event) => {
    let alias = event.target.value;
    this.state.account.alias = alias;
  }

  setAccountPassword = (event) => {
    let password = event.target.value;
    this.state.account.password = password;
  }

  importAccount = () => {
    let { dispatch } = this.props;
    let { account } = this.state;

    dispatch(Actions.IMPORT_ACCOUNT(account));
    this.setState({open : !this.state.open});
  }

  onClick = (data) => {
    let { dispatch } = this.props;
    let { account } = data;

    if(typeof account == 'string'){
        this.state.account.address = account;
        this.state.account.set = false;

        dispatch(Actions.SET_ACCOUNT(this.state.account));
    } else {
      this.state.account.set = true;
      this.setState({open : !this.state.open});
    }

  }




  render() {
    // let { dispatch } = this.props;
    let { open } = this.state;
    let { Accounts } = this.props.Accounts;
    let { Account } = this.props.Account;
    let { set } = Account;


    switch(set){
      case false:
        return (
          <Dialog
            title="Set Account Details"
            modal={false}
            open={!set}
            autoScrollBodyContent={true}
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
                key={"Import Account"}
                label="Import Account"
                secondary={true}
                style={customContentStyle}
                onClick={this.importAccount} />
            <RaisedButton
                key={"Cancel"}
                label="Cancel"
                style={customContentStyle}
                onClick={this.onClick} />
            { this.props.Account.error != undefined ? alert('Invalid Password') : null }
          </Dialog>
        );
      default:
        var accounts = Accounts.map((account) => {
          return(
            <RaisedButton
                key={account}
                label={account}
                onClick={this.onClick.bind(this, {account})}
                style={customContentStyle} />
          );
        });

        return (
          <div>
          <RaisedButton
              key={"Import Account"}
              label="Import Account"
              secondary={true}
              style={customContentStyle}
              onClick={this.onClick} />
          <Dialog
            title="Import Account"
            modal={false}
            open={open}
            autoScrollBodyContent={true}
          >
              {accounts}
              <RaisedButton
                  key={"Cancel"}
                  label="Cancel"
                  style={customContentStyle}
                  onClick={this.onClick} />
          </Dialog>
          </div>
        );
    }

  }
}

const mapStateToProps = (state) => {
  return {
    Accounts : state.ListAccounts,
    Account : state.ImportAccount
  }
}


const ImportAccount = connect(mapStateToProps)(ImportAccountComponent);

export default ImportAccount;
