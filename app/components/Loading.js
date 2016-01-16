import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import DirectorateApp from './DirectorateApp';
import ReactDOM from 'react-dom';
import Wallet from './Account/Wallet';

const customContentStyle = {
  width: 'auto',
  maxWidth: 'none',
};

class LoadingFormat extends React.Component {
  constructor(props){
    super(props);
    this.props.format;
    this.props.open;
    this.title = "VΞX|DIRΞCTORATΞ";
    this.message = "Connecting to the Ξthereum Network... one moment."
    this.loading = true;
  }

  render() {
    switch (this.props.format) {
      case 'modal':
        return (
          <Dialog
            title={this.title}
            modal={true}
            open={this.props.open}
            contentStyle={customContentStyle}
          >
          {this.message}
          </Dialog>
        )
        break;
      default:
        return (
          <div>
            <h1>VΞX|DIRΞCTORATΞ</h1>
            <h4>Connecting to the Ξthereum Network... one moment.</h4>
          </div>
        )
    }
  }
}

export default class Loading extends React.Component {
  constructor(props){
    super(props);
    this.props.format;
    this.state = {
      open : true,
      loaded : false
    }
  }

  handleClose() {
    setTimeout(() => {
        this.setState({open : false, loaded : true});
    }, 5000)
  }

  render() {
    this.handleClose();
    return (
      <div>
        {this.state.open ? <LoadingFormat format={this.props.format} open={this.state.open} /> : null}
        {this.state.loaded ? <DirectorateApp view="select-account" format="modal"/> : null}
      </div>
    );
  }
}
