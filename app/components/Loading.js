import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

export default class Loading extends React.Component {
  constructor(props){
    super(props);
    this.title = "VΞX|DIRΞCTORATΞ";
    this.message = "Connecting to the Ξthereum Network... one moment."
    this.loading = true;
    this.state = {
      open : true
    }
  }

  handleClose = () => {
    setTimeout(() => {
        this.setState({open : false});
    }, 5000)
  }

  render() {
    this.handleClose();
    return (
      <Dialog
        title={this.title}
        modal={true}
        open={this.state.open}
        contentStyle={customContentStyle}
      >
      {this.message}
      </Dialog>
    )
  }
}
