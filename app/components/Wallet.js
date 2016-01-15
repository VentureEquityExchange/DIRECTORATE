import React from 'react';
import DirectorateApp from './DirectorateApp';
import Dialog from 'material-ui/lib/dialog';

export default class Wallet extends React.Component {
  constructor(props){
    super(props);
    this.props.format;
    this.open = true;
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
          <WalletDetails />
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
  }

  render = () => {
    return (<div>Wallet Details Template</div>)
  }
}
