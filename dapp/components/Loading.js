import React, { Component } from 'react';
import Dialog from 'material-ui/lib/dialog';
import Snackbar from 'material-ui/lib/snackbar';
import LinearProgress from 'material-ui/lib/linear-progress';
import * as Network from '../utilities/Network/index';
import Promise from 'bluebird';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import DefaultTheme from './Themes/default';
import { DirectorateApp, SelectAccount } from './index';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';

@ThemeDecorator(ThemeManager.getMuiTheme(DefaultTheme))

class LoadingDialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      snackbar : true
    }
  }

  componentDidMount(){
    let { dispatch, Network } = this.props;
    setInterval(() => {
      dispatch(Actions._NETWORK());
    });

  }

  closeSnackBar = () => {
      this.setState({snackbar : false});
  }

  syncStatus(){
    let { Network } = this.props;

    if(Network.status.syncing == false){

      return (
        <Snackbar
          open={this.state.snackbar}
          message={ Network.status.blockNumber == 0 ? `Currently synced up to block: ${Network.status.blockNumber}, waiting to sync.` : `Currently Synced up to block: ${Network.status.blockNumber}` }
          autoHideDuration={0}
          onRequestClose={this.closeSnackBar}
        />
      );
    } else {
      let { currentBlock, highestBlock} = Network.status.syncing;
      currentBlock = parseInt(currentBlock, 16);
      highestBlock = parseInt(highestBlock, 16);
      let completed = Number(currentBlock/highestBlock)*100;

      return (
        <Dialog
          title={`Syncing Block ${currentBlock} of ${highestBlock}`}
          modal={false}
          open={true}
        >
          <div>
            <LinearProgress mode="determinate" value={completed} />
          </div>
        </Dialog>
      );
    }

  }

  loadingEthereum(){
    return (
      <Snackbar
        open={this.state.snackbar}
        message={`Connecting to the Ethereum Testnet Blockchain... one moment.`}
        autoHideDuration={0}
        onRequestClose={this.closeSnackBar}
      />
    );
  }


  // componentWillUnmount() {
  //
  // }

  render(){
    let { Network } = this.props;
    let { status, error } = Network;
    // console.log(status);
    // console.log(error);
    return (<div>{ status == undefined  ? this.loadingEthereum() : this.syncStatus() }</div>);
  }

}

const mapStateToProps = (state) => {
  return {
    Network : state.Network
  }
}

const Loading = connect(mapStateToProps)(LoadingDialog);

export default Loading;
