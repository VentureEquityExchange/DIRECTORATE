import React from 'react';
import DirectorateApp from '../DirectorateApp';
import Dialog from 'material-ui/lib/dialog';



export default class Wallet extends React.Component {
  constructor(props){
    super(props);
    this.props.format;
    this.state = {
      account : this.props.account,
      open : true
    }
  }

  render = () => {
    switch (this.props.format) {
      case 'modal':
        return (
          <Dialog
            title="Wallet"
            modal={true}
            open={this.state.open}
          >
          <WalletDetails account={this.state.account}/>
          </Dialog>
        )
        break;
      default:
        return (<WalletDetails account={this.state.account}/>)
    }
  }
}

class WalletDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      account : this.props.account
    }
  }

  render = () => {
    console.log(this.state.account);
    return (<div>Address: {this.state.account}</div>)
  }
}
