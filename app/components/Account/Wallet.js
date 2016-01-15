import React from 'react';
import DirectorateApp from '../DirectorateApp';
import Dialog from 'material-ui/lib/dialog';



export default class Wallet extends React.Component {
  constructor(props){
    super(props);
    this.props.format;
    this.open = true;
    this.props.account;
  }

  render = () => {
    switch (this.props.format) {
      case 'modal':
        return (
          <Dialog
            title="Wallet"
            modal={true}
            open={this.open}
          >
          <WalletDetails account={this.props.account}/>
          </Dialog>
        )
        break;
      default:
        return (<WalletDetails />)
    }
  }
}

class WalletDetails extends React.Component {
  constructor(props){
    super(props);
    this.props.account;
  }

  render = () => {
    return (<div>Wallet Details Template</div>)
  }
}
