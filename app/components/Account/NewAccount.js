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
        address : undefined
      }
    }
  }

  createAccount = () => {

  }

  onClick = () => {
    this.setState({open : !this.state.open});
  }

  render() {
    if(this.state.account.alias == undefined || this.state.account.address){
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
                type="text" />
              <TextField
                hintText="Enter Password"
                defaultValue=""
                type="password" />
              <RaisedButton
                  key={"Create Account"}
                  label="Create Account"
                  primary={true}
                  style={{width:'100%', marginTop:'1%'}}
                  onClick={this.createAccount} />
              <RaisedButton
                  key={"Cancel"}
                  label="Cancel"
                  style={{width:'100%', marginTop:'1%'}}
                  onClick={this.onClick} />
          </Dialog>
          </div>
        );
    } else {
      return (<DirectorateApp view="grid" account={this.state.account.address} />);
    }
  }

}
