import React from 'react';
import DirectorateApp from '../DirectorateApp';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';



export default class Wallet extends React.Component {
  constructor(props){
    super(props);
    this.props.format;
    this.state = {
      account : this.props.account,
      open : true
    }
  }

  handleClose = () => {this.setState({open: false});}

  render() {
    switch (this.props.format) {
      case 'modal':
        return (
          <Dialog
            title="Wallet"
            modal={true}
            open={this.state.open}
          >
          <WalletDetails account={this.state.account}/>
          <RaisedButton
						label="Close"
						onClick={this.handleClose} />
          </Dialog>
        )
        break;
      default:
      return(
        <Card initiallyExpanded={true}>
          <CardHeader
            title="Without Avatar"
            subtitle="Subtitle"
            actAsExpander={true}
            showExpandableButton={true} />
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions expandable={true}>
            <FlatButton label="Action1"/>
            <FlatButton label="Action2"/>
          </CardActions>
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>
      )
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

  render() {
    return (<div style={{backgroundColor:'red', width:'100%', height:'50%'}}>Address: {this.state.account}</div>);
  }
}
